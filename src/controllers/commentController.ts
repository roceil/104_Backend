import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { Comment } from "@/models/comment"
import { Profile } from "@/models/profile"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"

// todo: comment的規則是完成約會後才能評價，記得以後要補上約會完成的判斷

const postComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { commentedUserId, content } = req.body

  if (!content) {
    appErrorHandler(400, "缺少評價", next)
  }
  if (!userId) {
    appErrorHandler(400, "缺少使用者Id", next)
  }
  if (!commentedUserId) {
    appErrorHandler(400, "缺少被評價者Id", next)
  }

  const comment = await Comment.create({ userId, commentedUserId, content })
  appSuccessHandler(201, "新增評價成功", comment, res)
}

const getCommentList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  // 以下是重構前的程式碼
  // const rawComments = await Comment.find({ userId })
  // const userProfile = await Profile.findOne({ userId }).select("unlockComment")
  const [rawComments, userProfile] = await Promise.all([
    Comment.find({ userId }),
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
  // 以下是重構前的程式碼
  // if (!rawComments || rawComments.length === 0) {
  //   appErrorHandler(404, "No comment found", next)
  // } else {
  //   // 檢查是否有解鎖評價並加上isUnlock的狀態
  //   if (unlockComment.length > 0) {
  //     const comments = rawComments.map(comment => {
  //       if (unlockComment.includes(comment._id.toString())) {
  //         comment.isUnlock = true
  //       } else {
  //         comment.isUnlock = false
  //       }
  //       return comment // Add return statement here
  //     })
  //     appSuccessHandler(200, "查詢成功", comments, res)
  //   } else {
  //     const comments = rawComments.map(comment => {
  //       comment.isUnlock = false
  //       return comment
  //     })
  //     appSuccessHandler(200, "查詢成功", comments, res)
  //   }
  // }
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

export { postComment, getCommentList, getCommentById, putComment, deleteComment }
