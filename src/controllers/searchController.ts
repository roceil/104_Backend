import { type NextFunction, type Request, type Response } from "express"
import { Profile } from "@/models/profile"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { Collection } from "@/models/collection" // 确保你导入的是你定义的 Collection 模型

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

// 關鍵字搜尋
const keywordSearch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const users = await Profile.find()
  if (!users || users.length === 0) {
    appErrorHandler(404, "No user found", next)
  } else {
    appSuccessHandler(200, "查詢成功", users, res)
  }
}

export { searchFeaturedUser, keywordSearch }
