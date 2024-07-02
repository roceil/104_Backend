import { type NextFunction, type Request, type Response } from "express"
import jwt from "jsonwebtoken"

import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { type LoginResData } from "@/types/login"

import { Collection } from "@/models/collection" // 确保你导入的是你定义的 Collection 模型
import { BlackList } from "@/models/blackList"
import { User } from "@/models/user"
import { Invitation } from "@/models/invitation"
import { MatchListSelfSetting } from "@/models/matchListSelfSetting"
import { Profile } from "@/models/profile"
import { Comment } from "@/models/comment"
import { BeInvitation } from "@/models/beInvitation"
// import { MatchList } from "@/models/matchList"

export const keywordSearch = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { page = 1, sort } = req.query
  const { keyWord, location, gender, tags, notTags } = req.body

  let tagsArray: string[] = tags
  let notTagsArray: string[] = notTags
  // 用swagger測試時，tags和notTags是字串，所以要轉換成陣列
  if (tags && typeof tags === "string") {
    tagsArray = tags.split(",").filter((tag: string) => tag.trim() !== "")
  }
  if (notTags && typeof notTags === "string") {
    notTagsArray = notTags.split(",").filter((tag: string) => tag.trim() !== "")
  }

  const selectedSort: string = sort === "" ? "-updatedAt" : sort as string
  let resultUserIds = []
  let totalCount = 0
  const perPage = 6

  // 替除黑名單的用戶
  const blackList = await BlackList.findOne({
    userId
  })
  const lockedUserId = blackList ? blackList.lockedUserId : []

  if (!keyWord && location === 0 && gender === 0 && tagsArray.length === 0 && notTagsArray.length === 0) {
    totalCount = await User.find({ _id: { $ne: userId, $nin: lockedUserId } }).countDocuments()

    resultUserIds = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId, $nin: lockedUserId },
          isActive: true
        }
      },
      {
        $lookup: {
          from: "profiles",
          localField: "_id",
          foreignField: "userId",
          as: "scoreByProfile"
        }
      },
      {
        $unwind: "$scoreByProfile"
      },
      {
        $sort: {
          updatedAt: selectedSort === "-updatedAt" ? -1 : 1
        }
      },
      {
        $project: {
          _id: 1,
          "scoreByProfile.userStatus": 1,
          updatedAt: 1
        }
      },
      {
        $skip: ((Number(page) ?? 1) - 1) * perPage
      },
      {
        $limit: perPage
      }
    ])

    if (selectedSort === "-score") {
      resultUserIds = resultUserIds.sort((a, b) => {
        return b.scoreByProfile.userStatus.commentScore - a.scoreByProfile.userStatus.commentScore
      })
    } else if (selectedSort === "score") {
      resultUserIds = resultUserIds.sort((a, b) => {
        return a.scoreByProfile.userStatus.commentScore - b.scoreByProfile.userStatus.commentScore
      })
    }

    resultUserIds = resultUserIds.map((i) => i._id)
    resultUserIds = resultUserIds.filter((i) => i.toString() !== userId)

    // console.log(JSON.stringify(resultUserIds));
  } else {
    // 替除配對設定的排除條件
    // const matchListData = await MatchList.findOne({ userId })
    // const blacklistSetting = matchListData?.blacklist || []

    // 進行搜尋
    const pipeline = [
      {
        $match: {
          userId: { $ne: userId, $nin: lockedUserId },
          searchDataBase: { $regex: keyWord, $options: "i" },
          // searchDataBase: { $regex: keyWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), $options: "i" },
          ...(gender > 0 ? { "personalInfo.gender": gender } : {}),
          ...location > 0 ? { "personalInfo.location": location } : {}
          // "personalInfo.smoking": { $nin: blacklistSetting.banSmoking },
        }
      },
      {
        $lookup: {
          from: "profiles",
          localField: "userId",
          foreignField: "userId",
          as: "profile"
        }
      },
      {
        $unwind: "$profile"
      },
      {
        $project: {
          userId: 1,
          "profile.userStatus": 1
          // searchDataBase: 1,
          // "profile.tags": 1
        }
      }
      /* eslint-disable */
    ] as any

    // 如果有標籤就加入搜尋條件，先找出符合條件，再找出替除條件，合併會讓第二個條件失效
    if (tagsArray.length > 0) {
      pipeline.splice(3, 0, {
        $match: {
          "profile.tags": { $in: tagsArray }
        }
      })
    }
    if (notTagsArray.length > 0) {
      pipeline.splice(3, 0, {
        $match: {
          "profile.tags": { $nin: notTagsArray }
        }
      })
    }

    let resultUsers = await MatchListSelfSetting.aggregate(pipeline).sort(selectedSort).skip(((Number(page) ?? 1) - 1) * perPage).limit(perPage)

    if (selectedSort === "-score") {
      resultUsers = resultUsers.sort((a, b) => {
        return b.profile.userStatus.commentScore - a.profile.userStatus.commentScore
      })
    } else if (selectedSort === "score") {
      resultUsers = resultUsers.sort((a, b) => {
        return a.profile.userStatus.commentScore - b.profile.userStatus.commentScore
      })
    }

    resultUserIds = resultUsers.map((i) => i.userId._id)

    totalCount = resultUserIds.length

    // 直接比较字符串形式，代替排除自己失敗的方法
    resultUserIds = await resultUserIds.filter((i) => i.toString() !== userId);
    if (resultUserIds.length === 0) {
      appSuccessHandler(200, "搜尋列表成功", { resultList: [], pagination: { page: 1, perPage, totalCount: 0 } }, res)
      return
    }
  }

  // 組合卡片用戶的資料
  const resultUsersData = await Promise.all(resultUserIds.map(async (resultId) => {
    // 取得每個用戶的資料
    const resultUserInfo = await User.findById(resultId)

    // 取得每個用戶的封鎖狀態
    const blackList = await BlackList.findOne({ userId })
    const lockedUserIds = blackList ? blackList.lockedUserId.map(id => id.toString()) : []
    const isLocked = lockedUserIds.includes(resultId.toString() as unknown as string) ?? false

    // 取得卡片用戶的邀約狀態
    const invitations = await Invitation.find({
      userId, // 邀請者
      invitedUserId: resultId // 被邀請者
    })
    const invitationStatus = invitations.length > 0 ? invitations[0].status : "not invited"
    const invitationTableId = invitations[0]?._id

    // 取得登入者被邀約的狀態 (invitations / beInvitations 都是用invitedUserId存被邀請者)
    const beInvitations = await BeInvitation.find({
      userId: resultId,
      invitedUserId: userId
    })
    const beInvitationStatus = beInvitations.length > 0 ? beInvitations[0].status : "not invited"
    const beInvitationTableId = beInvitations[0]?._id

    // 取得每個用戶的個人條件和工作條件
    const matchListSelfSetting = await MatchListSelfSetting.findOne({
      userId: resultId
    })

    // 取得每個用戶的收藏狀態
    const collection = await Collection.findOne({ userId, collectedUserId: resultId }, { isCollected: 1 })
    const isCollected = Boolean(collection)
    const collectionTableId = collection?._id

    // 取得每個用戶的評價狀態 和 被評價數量
    const hasComment = await Comment.findOne({ userId, commentedUserId: resultId }).countDocuments() > 0
    const beCommentCount = await Comment.find({ commentedUserId: resultId }).countDocuments() // userStatus.commentCount
    const commentTableId = await Comment.findOne({ userId, commentedUserId: resultId }).select("id").lean().then(doc => doc?._id)

    // 計算評分
    const comments = await Comment.find({ commentedUserId: resultId })
    const averageScore = comments.length > 0 ? (comments.reduce((acc, comment) => acc + comment.score, 0) / comments.length).toFixed(1) : 0
    await Profile.findOneAndUpdate({ userId: resultId }, {
      $set: {
        "userStatus.commentScore": averageScore,
        "userStatus.commentCount": beCommentCount
      }
    })

    // 取得每個用戶的 解鎖狀態 和 評分
    const profile = await Profile.findOne({ userId })
    const isUnlock = profile?.unlockComment.includes(resultId as unknown as string) ?? false
    // const unlockCommentIds = profile?.unlockComment ?? []

    // 取得每個用戶的評分 和 標籤 和 照片 和 暱稱 和 LineId 和 自我介紹
    const resultIdProfile = await Profile.findOne({ userId: resultId }).select("userStatus photoDetails nickNameDetails lineDetails introDetails tags").lean()

    return {
      userInfo: {
        ...resultUserInfo?.toObject()
      },
      matchListSelfSetting,
      profile: resultIdProfile,
      invitationStatus,
      isCollected,
      isLocked,
      isUnlock,
      hasComment,
      beCommentCount,
      beInvitationStatus,
      collectionTableId,
      invitationTableId,
      beInvitationTableId,
      commentTableId
    }
  }))

  // 分頁資訊
  const pagination = {
    page: Number(page) ?? 1,
    perPage,
    totalCount
  }

  // 將分頁資訊和查詢結果合併在一個物件中
  const response = {
    resultList: resultUsersData,
    pagination
  }

  appSuccessHandler(200, "搜尋列表成功", response, res)
}

export const getEliteList = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const verifyToken = (token: string, next: NextFunction) => {
    const key = process.env.JWT_SECRET
    if (!key) {
      appErrorHandler(500, "缺少必要環境變數", next)
      return null
    }

    try {
      const decoded = jwt.verify(token, key)
      return decoded
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        appErrorHandler(401, "token 已過期", next)
      } else {
        appErrorHandler(401, "驗證失敗", next)
      }
      return null
    }
  }

  const token = req.cookies.token as string || req.params.token
  if (token) {
    const decoded = verifyToken(token, _next)
    if (decoded) {
      req.user = decoded
      req.token = token
    }
  }

  const { userId } = req.user as LoginResData === undefined ? { userId: "" } : req.user as LoginResData

  let resultUserIds = []
  resultUserIds = await User.aggregate([
    {
      $match: {
        isActive: true
      }
    },
    {
      $lookup: {
        from: "profiles",
        localField: "_id",
        foreignField: "userId",
        as: "scoreByProfile"
      }
    },
    {
      $unwind: "$scoreByProfile"
    },
    {
      $sort: {
        'scoreByProfile.userStatus.commentScore': -1
      }
    },
    {
      $project: {
        _id: 1,
        "scoreByProfile.userStatus": 1,
        updatedAt: 1
      }
    },
    {
      $skip: ((Number(1) ?? 1) - 1) * 6
    },
    {
      $limit: 6
    }
  ])

  if (userId !== "") {
    resultUserIds = resultUserIds.filter((i) => i._id.toString() !== userId)
  }

  const resultUsersData = await Promise.all(resultUserIds.map(async (resultId) => {
    // 取得每個用戶的資料
    const resultUserInfo = await User.findById(resultId)

    // 取得每個用戶的封鎖狀態
    const isLocked = false

    // 取得卡片用戶的邀約狀態
    const invitationStatus = "not invited"
    const invitationTableId = ''

    // 取得登入者被邀約的狀態 (invitations / beInvitations 都是用invitedUserId存被邀請者)
    const beInvitationStatus = "not invited"
    const beInvitationTableId = ''

    // 取得每個用戶的個人條件和工作條件
    const matchListSelfSetting = await MatchListSelfSetting.findOne({
      userId: resultId
    })

    // 取得每個用戶的收藏狀態
    // 若登入沒有 table id 就用雙方id查詢 要改收藏api
    let isCollected = false
    let collectionTableId = ''
    if (userId !== "") {
      const collection = await Collection.findOne({ userId, collectedUserId: resultId }, { isCollected: 1 })
      isCollected = Boolean(collection)
      collectionTableId = collection?._id as unknown as string
      // console.log(collectionTableId);
    }


    // 取得每個用戶的評價狀態 和 被評價數量
    const hasComment = 0
    const beCommentCount = await Comment.find({ commentedUserId: resultId }).countDocuments() // userStatus.commentCount
    const commentTableId = ''

    // 計算評分
    const comments = await Comment.find({ commentedUserId: resultId })
    const averageScore = comments.length > 0 ? (comments.reduce((acc, comment) => acc + comment.score, 0) / comments.length).toFixed(1) : 0
    await Profile.findOneAndUpdate({ userId: resultId }, {
      $set: {
        "userStatus.commentScore": averageScore,
        "userStatus.commentCount": beCommentCount
      }
    })

    // 取得每個用戶的 解鎖狀態 和 評分
    const isUnlock = false

    // 取得每個用戶的評分 和 標籤 和 照片 和 暱稱 和 LineId 和 自我介紹
    const resultIdProfile = await Profile.findOne({ userId: resultId }).select("userStatus photoDetails nickNameDetails lineDetails introDetails tags").lean()

    return {
      userInfo: {
        ...resultUserInfo?.toObject()
      },
      matchListSelfSetting,
      profile: resultIdProfile,
      invitationStatus,
      isCollected,
      isLocked,
      isUnlock,
      hasComment,
      beCommentCount,
      beInvitationStatus,
      collectionTableId,
      invitationTableId,
      beInvitationTableId,
      commentTableId
    }
  }))

  const response = {
    resultList: resultUsersData,
  }

  appSuccessHandler(200, "搜尋列表成功", response, res)

}

export const maybeYouLikeSearch = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { page = 1, sort } = req.query

  const selectedSort: string = sort === "" ? "-updatedAt" : sort as string
  let resultUserIds = []
  let totalCount = 0
  const perPage = 6

  // 替除黑名單的用戶
  const blackList = await BlackList.findOne({
    userId
  })
  const lockedUserId = blackList ? blackList.lockedUserId : []

  // 替除配對設定的排除條件
  // const matchListData = await MatchList.findOne({ userId })
  // const blacklistSetting = matchListData?.blacklist || []

  // 隨機在搜尋庫中搜尋條件
  const searchDataBase = await MatchListSelfSetting.findOne({
    userId: userId
  }).select("searchDataBase")
  const randomElement = (searchDataBase?.searchDataBase as unknown as string[])[Math.floor(Math.random() * (searchDataBase?.searchDataBase as unknown as string[])?.length)]

  // 進行搜尋
  const pipeline = [
    {
      $match: {
        userId: { $ne: userId, $nin: lockedUserId },
        searchDataBase: {
          $regex: randomElement, $options: "i" },
      }
    },
    {
      $lookup: {
        from: "profiles",
        localField: "userId",
        foreignField: "userId",
        as: "profile"
      }
    },
    {
      $unwind: "$profile"
    },
    {
      $project: {
        userId: 1,
        "profile.userStatus": 1
        // searchDataBase: 1,
        // "profile.tags": 1
      }
    }
    /* eslint-disable */
  ] as any


  let resultUsers = await MatchListSelfSetting.aggregate(pipeline).sort(selectedSort).skip(((Number(page) ?? 1) - 1) * perPage).limit(perPage)

  if (resultUsers.length === 0) {
    appSuccessHandler(200, "搜尋列表成功", { resultList: [], pagination: { page: 1, perPage, totalCount: 0 } }, res)
    return
  }

  if (selectedSort === "-score") {
    resultUsers = resultUsers.sort((a, b) => {
      return b.profile.userStatus.commentScore - a.profile.userStatus.commentScore
    })
  } else if (selectedSort === "score") {
    resultUsers = resultUsers.sort((a, b) => {
      return a.profile.userStatus.commentScore - b.profile.userStatus.commentScore
    })
  }

  resultUserIds = resultUsers.map((i) => i.userId._id)

  // 直接比较字符串形式，代替排除自己失敗的方法
  resultUserIds = await resultUserIds.filter((i) => i.toString() !== userId);

  totalCount = resultUserIds.length

  // 組合卡片用戶的資料
  const resultUsersData = await Promise.all(resultUserIds.map(async (resultId) => {
    // 取得每個用戶的資料
    const resultUserInfo = await User.findById(resultId)

    // 取得每個用戶的封鎖狀態
    const blackList = await BlackList.findOne({ userId })
    const lockedUserIds = blackList ? blackList.lockedUserId.map(id => id.toString()) : []
    const isLocked = lockedUserIds.includes(resultId.toString() as unknown as string) ?? false

    // 取得卡片用戶的邀約狀態
    const invitations = await Invitation.find({
      userId, // 邀請者
      invitedUserId: resultId // 被邀請者
    })
    const invitationStatus = invitations.length > 0 ? invitations[0].status : "not invited"
    const invitationTableId = invitations[0]?._id

    // 取得登入者被邀約的狀態 (invitations / beInvitations 都是用invitedUserId存被邀請者)
    const beInvitations = await BeInvitation.find({
      userId: resultId,
      invitedUserId: userId
    })
    const beInvitationStatus = beInvitations.length > 0 ? beInvitations[0].status : "not invited"
    const beInvitationTableId = beInvitations[0]?._id

    // 取得每個用戶的個人條件和工作條件
    const matchListSelfSetting = await MatchListSelfSetting.findOne({
      userId: resultId
    })

    // 取得每個用戶的收藏狀態
    const collection = await Collection.findOne({ userId, collectedUserId: resultId }, { isCollected: 1 })
    const isCollected = Boolean(collection)
    const collectionTableId = collection?._id

    // 取得每個用戶的評價狀態 和 被評價數量
    const hasComment = await Comment.findOne({ userId, commentedUserId: resultId }).countDocuments() > 0
    const beCommentCount = await Comment.find({ commentedUserId: resultId }).countDocuments() // userStatus.commentCount
    const commentTableId = await Comment.findOne({ userId, commentedUserId: resultId }).select("id").lean().then(doc => doc?._id)

    // 計算評分
    const comments = await Comment.find({ commentedUserId: resultId })
    const averageScore = comments.length > 0 ? (comments.reduce((acc, comment) => acc + comment.score, 0) / comments.length).toFixed(1) : 0
    await Profile.findOneAndUpdate({ userId: resultId }, {
      $set: {
        "userStatus.commentScore": averageScore,
        "userStatus.commentCount": beCommentCount
      }
    })

    // 取得每個用戶的 解鎖狀態 和 評分
    const profile = await Profile.findOne({ userId })
    const isUnlock = profile?.unlockComment.includes(resultId as unknown as string) ?? false
    // const unlockCommentIds = profile?.unlockComment ?? []

    // 取得每個用戶的評分 和 標籤 和 照片 和 暱稱 和 LineId 和 自我介紹
    const resultIdProfile = await Profile.findOne({ userId: resultId }).select("userStatus photoDetails nickNameDetails lineDetails introDetails tags").lean()

    return {
      userInfo: {
        ...resultUserInfo?.toObject()
      },
      matchListSelfSetting,
      profile: resultIdProfile,
      invitationStatus,
      isCollected,
      isLocked,
      isUnlock,
      hasComment,
      beCommentCount,
      beInvitationStatus,
      collectionTableId,
      invitationTableId,
      beInvitationTableId,
      commentTableId
    }
  }))

  // 分頁資訊
  const pagination = {
    page: Number(page) ?? 1,
    perPage,
    totalCount
  }

  // 將分頁資訊和查詢結果合併在一個物件中
  const response = {
    resultList: resultUsersData,
    pagination
  }

  appSuccessHandler(200, "搜尋列表成功", response, res)
}
