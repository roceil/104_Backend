import { type NextFunction, type Request, type Response } from "express"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { Collection } from "@/models/collection" // 确保你导入的是你定义的 Collection 模型
import { MatchListSelfSetting, options } from "@/models/matchListSelfSetting"
import { BlackList } from "@/models/blackList"
import { User } from "@/models/user"
import { Invitation } from "@/models/invitation"

const buildFlattenedOptions = () => {
  const flattenedOptions: Record<string, { type: string, key: number }> = {}
  options.forEach(option => {
    Object.keys(option.options).forEach(key => {
      const value = option.options[key]
      flattenedOptions[value] = { type: option.type, key: parseInt(key, 10) }
    })
  })
  return flattenedOptions
}

// 搜尋精選會員
const searchFeaturedUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // 聚合查詢計算每個使用者被收藏的次數
  const topUsers = await Collection.aggregate([
    { $unwind: "$collectedUserId" },
    { $group: { _id: "$collectedUserId", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userInfo"
      }
    },
    { $unwind: "$userInfo" }
  ])

  if (!topUsers || topUsers.length === 0) {
    appErrorHandler(404, "No user found", next)
    return
  }
  // 隨機挑選6個用戶
  const selectedUsers = []
  const usedIndices = new Set<number>()
  while (selectedUsers.length < 6 && usedIndices.size < topUsers.length) {
    const randomIndex = Math.floor(Math.random() * topUsers.length)
    if (!usedIndices.has(randomIndex)) {
      selectedUsers.push(topUsers[randomIndex].userInfo)
      usedIndices.add(randomIndex)
    }
  }

  appSuccessHandler(200, "查詢成功", selectedUsers, res)
}

const keywordSearch = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { keyword, pageSize = "6", pageNumber = "1" } = req.query as { keyword?: string, pageSize?: string, pageNumber?: string }

  // 字串轉為數字
  const parsedPageSize = parseInt(pageSize, 10) || 6
  const parsedPageNumber = parseInt(pageNumber, 10) || 1

  const { userId } = req.user as { userId: string }

  // 預設沒有keyword就帶出所有資料
  let queryConditions = [{}]

  // 動態建立映射表
  const flattenedOptions = buildFlattenedOptions()
  if (keyword) {
    // 建立一個正規表示式，用於模糊搜尋
    const regex = new RegExp(keyword, "i")

    // 尋找符合的選項
    const matchedOptions = Object.keys(flattenedOptions).filter(option => regex.test(option))

    if (matchedOptions.length === 0) {
      res.status(404).json({ error: "No matching options found" })
      return
    }

    // 建構查詢條件
    queryConditions = matchedOptions.map(option => {
      const field = `personalInfo.${flattenedOptions[option].type.replace("Options", "")}`
      return { [field]: flattenedOptions[option].key }
    })
  }

  // 使用聚合函數進行查詢
  const searchUser = await MatchListSelfSetting.aggregate([
    {
      $match: { $or: queryConditions }
    },
    {
      $project: {
        userId: 1,
        _id: 0,
        personalInfo: 1,
        workInfo: 1,
        createdAt: 1,
        updatedAt: 1
      }
    }
  ]).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize)

  // 過濾使用者自己
  const resultUserIds = searchUser
    .map(user => user.userId)
    .filter(user => user.userId !== userId)

  const resultUsersData = await Promise.all(resultUserIds.map(async (id) => {
    // 取得每個用戶的資料
    const resultUserInfo = await User.findById(id)

    // 取得每個用戶的封鎖狀態
    const blackList = await BlackList.findOne({ userId })
    const lockedUserIds = blackList ? blackList.lockedUserId.map(id => id.toString()) : []

    const isLocked = lockedUserIds.includes(id.toString())

    // 取得每個用戶的邀約狀態
    const invitations = await Invitation.find({
      userId, // 邀請者
      invitedUserId: id // 被邀請者
    })
    const status = invitations.length > 0 ? invitations[0].status : "not invited" // invitationStatus

    // 取得每個用戶的個人條件和工作條件
    const matchListSelfSetting = await MatchListSelfSetting.findOne({
      userId: id
    })

    // 取得每個用戶的收藏狀態
    const collection = await Collection.findOne({ userId, collectedUserId: id }, { isCollected: 1 })
    const isCollected = Boolean(collection)

    return {
      userInfo: {
        ...resultUserInfo?.toObject()
      },
      isCollected,
      isLocked,
      status,
      matchListSelfSetting
    }
  }))

  appSuccessHandler(200, "查询成功", resultUsersData, res)
}
export { searchFeaturedUser, keywordSearch }
