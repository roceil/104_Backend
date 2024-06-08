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
  if (numberScore <= 1 || numberScore >= 5) {
    appErrorHandler(400, "評分範圍為1-5", next)
  }
  const comment = await Comment.create({ userId, commentedUserId, content, score: numberScore })
  appSuccessHandler(201, "新增評價成功", comment, res)
}

const getCommentList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { pageSize, pageNumber } = req.query as { pageSize?: string, pageNumber?: string }
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, pageNumber)
  const [rawComments, userProfile] = await Promise.all([
    Comment.find().skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize),
    Profile.findOne({ userId }).select("unlockComment")
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
    comment.isUnlock = unlockComment.includes(comment._id.toString())
    return comment
  })
  appSuccessHandler(200, "查詢成功", comments, res)
}
const getCommentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const comment = await Comment.findById(id)
  if (!comment) {
    appErrorHandler(404, "No comment found", next)
  } else {
    appSuccessHandler(200, "查詢成功", comment, res)
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
  const { pageSize, pageNumber } = req.query as { pageSize?: string, pageNumber?: string }
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, pageNumber)

  const comment = await Comment.find({ userId }).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize)
  if (!comment || comment.length === 0) {
    appSuccessHandler(200, "沒有評價", [], res)
    return
  }
  appSuccessHandler(200, "查詢成功", comment, res)
}
const putComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { content } = req.body

  if (!content) {
    appErrorHandler(400, "缺少評價", next)
  }

  const comment = await Comment.findByIdAndUpdate(id, { content }, { new: true })
  if (!comment) {
    appErrorHandler(400, "修改失敗,找不到評價Id", next)
  } else {
    appSuccessHandler(200, "評價修改成功", comment, res)
  }
}

const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const comment = await Comment.findByIdAndDelete(id)
  if (!comment) {
    appErrorHandler(400, "刪除失敗,找不到評價Id", next)
  } else {
    appSuccessHandler(200, "評價刪除成功", comment, res)
  }
}

export { postComment, getCommentList, getCommentById, getCommentByIdAndUserId, getCommentILiftList, putComment, deleteComment }
