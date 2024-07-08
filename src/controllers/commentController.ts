import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { Comment } from "@/models/comment"
import { Profile } from "@/models/profile"
import { User } from "@/models/user"
import { BlackList } from "@/models/blackList"
import { Invitation } from "@/models/invitation"
import { Collection } from "@/models/collection"
import { BeInvitation } from "@/models/beInvitation"
import { MatchListSelfSetting } from "@/models/matchListSelfSetting"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { checkPageSizeAndPageNumber } from "@/utils/checkControllerParams"

const postComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { commentedUserId, content, score, id } = req.body

  if (!content) {
    appErrorHandler(400, "缺少評價", next)
  }
  if (!userId) {
    appErrorHandler(400, "缺少使用者Id", next)
  }
  if (!commentedUserId) {
    appErrorHandler(400, "缺少被評價者Id", next)
  }

  if (!score) {
    appErrorHandler(400, "缺少評分", next)
  }
  const numberScore = Number(score)
  if (isNaN(numberScore)) {
    appErrorHandler(400, "評分需要數字", next)
  }
  if (numberScore < 1 || numberScore > 5) {
    appErrorHandler(400, "評分範圍為1-5", next)
  }
  if (!id) {
    appErrorHandler(400, "缺少邀約或被邀約Id", next)
  }
  const [invitation, beInvitation] = await Promise.all([Invitation.findByIdAndUpdate(id, { isComment: true }, { new: true }), BeInvitation.findByIdAndUpdate(id, { isComment: true }, { new: true })])
  if (!invitation && !beInvitation) {
    appErrorHandler(404, "邀約或被邀約不存在", next)
    return
  }
  if (!invitation?.isFinishDating && !beInvitation?.isFinishDating) {
    appErrorHandler(400, "約會尚未完成", next)
    return
  }
  const comment = await Comment.create({ userId, commentedUserId, invitationIdOrBeInvitationId: id, content, score: numberScore })
  const commentUserProfile = await Profile.findOneAndUpdate({ userId: commentedUserId }, [
    {
      $set: {
        "userStatus.commentScore": {
          $round: [// 四捨五入
            {
              $divide: [// 計算平均分數  (評分總和+新評分)/(評分次數+1)
                {
                  $add: [// 總分數計算
                    { $multiply: ["$userStatus.commentScore", "$userStatus.commentCount"] },
                    numberScore
                  ]
                },
                { $add: ["$userStatus.commentCount", 1] }
              ]
            },
            1
          ]
        },
        "userStatus.commentCount": { $add: ["$userStatus.commentCount", 1] }
      }
    }
  ])
  if (!commentUserProfile) {
    appErrorHandler(404, "被評價者不存在", next)
    return
  }
  appSuccessHandler(201, "新增評價成功", comment, res)
}
const getCommentList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { id } = req.params
  const { pageSize, page, sort } = req.query as { pageSize?: string, page?: string, sort?: string }
  let sortConfig = ""

  switch (sort) {
    case "asc":
      sortConfig = "updatedAt"
      break
    case "desc":
      sortConfig = "-updatedAt"
      break
    case "scoreAsc":
      sortConfig = "score"
      break
    case "scoreDesc":
      sortConfig = "-score"
      break
    default:
      sortConfig = "-updatedAt"
  }

  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, page)
  const [rawComments, userProfile, totalCount] = await Promise.all([
    Comment.find({ commentedUserId: id })
      .populate({
        path: "commentedUserId",
        select: "userStatus"
      })
      .populate({
        path: "commentUserProfile",
        select: "nickNameDetails"
      }).populate({
        path: "commentUserUsername",
        select: "personalInfo.username"
      })
      .sort(sortConfig).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize),
    Profile.findOne({ userId }).select("unlockComment"),
    Comment.countDocuments()
  ])
  if (!userProfile) {
    appErrorHandler(404, "用戶不存在", next)
    return
  }
  const { unlockComment } = userProfile

  if (!rawComments || rawComments.length === 0) {
    appErrorHandler(404, "No comment found", next)
    return
  }
  // 添加解鎖狀態到評論
  const comments = rawComments.map(comment => {
    comment.isUnlock = unlockComment.includes(comment.commentedUserId as unknown as string)
    return comment
  })
  const pagination = {
    page: parsedPageNumber,
    perPage: parsedPageSize,
    totalCount
  }
  const response = {
    comments, pagination
  }
  appSuccessHandler(200, "查詢成功", response, res)
}
const getCommentByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { pageSize, page, sort } = req.query as { pageSize?: string, page?: string, sort?: string }
  const dateSort = sort === "desc" ? "-updatedAt" : "updatedAt"
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, page)
  const beCommentedUserProfile = await Profile.findOne({ userId: id }).populate({
    path: "matchListSelfSettingByUserId",
    select: "personalInfo workInfo"
  })
  const [totalCount, comments] = await Promise.all([Comment.countDocuments({ commentedUserId: id }), Comment.find({ commentedUserId: id }).sort(dateSort).populate({ path: "commentUserProfile", select: "photoDetails nickNameDetails jobDetails userStatus" }).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize)])
  if (!comments) {
    appErrorHandler(404, "No comment found", next)
  } else {
    const pagination = {
      page: parsedPageNumber,
      perPage: parsedPageSize,
      totalCount
    }
    const response = {
      beCommentedUserProfile, comments, pagination
    }
    appSuccessHandler(200, "查詢成功", response, res)
  }
}
const getCommentByIdAndUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData
  const comment = await Comment.findOne({
    $and: [
      { _id: id },
      { userId }
    ]
  }).select("-isUnlock")
  if (!comment) {
    appErrorHandler(404, "No comment found", next)
    return
  }
  appSuccessHandler(200, "查詢成功", comment, res)
}
const getCommentILiftList = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { pageSize, page, sort } = req.query as { pageSize?: string, page?: string, sort?: string }
  const dateSort = sort === "desc" ? "-updatedAt" : "updatedAt"
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, page)
  const [totalCount, comment] = await Promise.all([Comment.countDocuments({ userId }), Comment.find({ userId }).sort(dateSort).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize)])
  if (!comment || comment.length === 0) {
    appSuccessHandler(200, "沒有評價", [], res)
    return
  }
  const pagination = {
    page: parsedPageNumber,
    perPage: parsedPageSize,
    totalCount
  }

  //*  組合卡片用戶的資料
  const commentedUserIds = comment.map(comment => comment.commentedUserId)
  const resultUsersData = await Promise.all(commentedUserIds.map(async (resultId) => {
    // 取得每個用戶的資料
    const resultUserInfo = await User.findById(resultId)

    // 取得每個用戶的封鎖狀態
    const blackList = await BlackList.findOne({ userId })
    const lockedUserIds = blackList ? blackList.lockedUserId.map(id => id.toString()) : []
    /* eslint-disable */
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
  //*

  const response = {
    resultList: resultUsersData, pagination
  }
  appSuccessHandler(200, "查詢成功", response, res)
}
const putComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { content, score, commentedUserId } = req.body
  if (!score) {
    appErrorHandler(400, "缺少評分", next)
  }
  const numberScore = Number(score)
  if (isNaN(numberScore)) {
    appErrorHandler(400, "評分需要數字", next)
  }
  if (!content) {
    appErrorHandler(400, "缺少評價", next)
  }

  const comment = await Comment.findByIdAndUpdate(id, { content, score: numberScore }, { new: true })
  const commentUserProfile = await Profile.findOneAndUpdate({ userId: commentedUserId }, [
    {
      $set: {
        "userStatus.commentScore": {
          $round: [// 四捨五入
            {
              $divide: [// 重計算平均分數  (評價總和-平均評價分數+新評分)/評價次數
                {
                  $add: [// 總分數計算
                    { $subtract: [{ $multiply: ["$userStatus.commentScore", "$userStatus.commentCount"] }, "$userStatus.commentScore"] },
                    numberScore
                  ]
                },
                "$userStatus.commentCount"
              ]
            },
            1
          ]
        }
      }
    }
  ])
  if (!commentUserProfile) {
    appErrorHandler(404, "被評價者不存在", next)
    return
  }
  if (!comment) {
    appErrorHandler(400, "修改失敗,找不到評價Id", next)
  } else {
    appSuccessHandler(200, "評價修改成功", comment, res)
  }
}

const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { commentedUserId, listId } = req.body
  const commentScore = await Comment.findById(id).select("score")
  if (!commentScore) {
    appErrorHandler(404, "找不到評分", next)
    return
  }
  const { score } = commentScore as { score: number }
  if (!score) {
    appErrorHandler(404, "找不到評分", next)
    return
  }

  const commentUserProfile = await Profile.findOneAndUpdate({ userId: commentedUserId }, [
    {
      $set: {
        "userStatus.commentScore": {
          $cond: {
            if: { $eq: ["$userStatus.commentCount", 1] },
            then: 0,
            else: {
              $round: [
                {
                  $divide: [
                    {
                      $subtract: [
                        { $multiply: ["$userStatus.commentScore", "$userStatus.commentCount"] },
                        score
                      ]
                    },
                    { $subtract: ["$userStatus.commentCount", 1] }
                  ]
                },
                1
              ]
            }
          }
        },
        "userStatus.commentCount": {
          $cond: {
            if: { $eq: ["$userStatus.commentCount", 1] },
            then: 0,
            else: { $subtract: ["$userStatus.commentCount", 1] }
          }
        }
      }
    }
  ])

  if (!commentUserProfile) {
    appErrorHandler(404, "被評價者不存在", next)
  }
  const comment = await Comment.findByIdAndDelete(id)
  if (!comment) {
    appErrorHandler(400, "刪除失敗,找不到評價Id", next)
  } else {
    const { invitationIdOrBeInvitationId } = comment
    const [invitation, beInvitation] = await Promise.all([Invitation.findByIdAndUpdate(invitationIdOrBeInvitationId, { isComment: false }, { new: true }), BeInvitation.findByIdAndUpdate(invitationIdOrBeInvitationId, { isComment: false }, { new: true })])
  if (!invitation && !beInvitation) {
    appErrorHandler(404, "邀約或被邀約不存在", next)
    return
  }
    appSuccessHandler(200, "評價刪除成功", comment, res)
  }
}

export { postComment, getCommentList, getCommentByUserId, getCommentByIdAndUserId, getCommentILiftList, putComment, deleteComment }
