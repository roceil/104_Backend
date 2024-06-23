import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { Comment } from "@/models/comment"
import { Profile } from "@/models/profile"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { checkPageSizeAndPageNumber } from "@/utils/checkControllerParams"
// todo: comment的規則是完成約會後才能評價，記得以後要補上約會完成的判斷

const postComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { commentedUserId, content, score } = req.body

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
  const comment = await Comment.create({ userId, commentedUserId, content, score: numberScore })
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
  const { pageSize, page, sort } = req.query as { pageSize?: string, page?: string, sort?: string }
  const dateSort = sort === "desc" ? "-updatedAt" : "updatedAt"
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, page)
  const [rawComments, userProfile, totalCount] = await Promise.all([
    Comment.find({ commentedUserId: userId }).populate({
      path: "commentedUserId",
      select: "userStatus"
    }).populate({
      path: "commentUserProfile",
      select: "nickNameDetails"
    }).sort(dateSort).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize),
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
  const response = {
    comment, pagination
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
  const { commentedUserId } = req.body
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
    appSuccessHandler(200, "評價刪除成功", comment, res)
  }
}

export { postComment, getCommentList, getCommentByUserId, getCommentByIdAndUserId, getCommentILiftList, putComment, deleteComment }
