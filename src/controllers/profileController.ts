import { type NextFunction, type Request, type Response } from "express"
import { Profile, type IPersonalInfo } from "@/models/profile"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const users = await Profile.find()
  if (!users || users.length === 0) {
    appErrorHandler(404, "No user found", next)
  } else {
    appSuccessHandler(200, "查詢成功", users, res)
  }
}
const getUserByAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as { userId: string }
  const user = await Profile.findOne({
    userId
  })
  if (!user) {
    appErrorHandler(404, "No user found", next)
  } else {
    appSuccessHandler(200, "查詢成功", user, res)
  }
}
const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const user = await Profile.findById(id)
  if (!user) {
    appErrorHandler(404, "No user found", next)
  } else {
    appSuccessHandler(200, "查詢成功", user, res)
  }
}

const postUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.body

  if (!userId) {
    appErrorHandler(400, "缺少使用者id", next); return
  }

  const userPost = await Profile.create(req.body)
  appSuccessHandler(201, "用戶新增資料成功", userPost, res)
}

const putUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  /**
   * #swagger.tags = ['Profile-會員資料']
   */
  if (!req.body.id) {
    appErrorHandler(400, "缺少Id", next); return
  }

  const { id } = req.body
  const userPut = await Profile.findByIdAndUpdate(id, req.body as IPersonalInfo, { new: true }
  )
  if (!userPut) {
    appErrorHandler(400, "找不到使用者資料Id，請稍後在試", next)
  } else {
    appSuccessHandler(200, "用戶修改成功", userPut, res)
  }
}
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const userDelete = await Profile.findByIdAndDelete(id)
  appSuccessHandler(200, "用戶刪除成功", userDelete, res)
}

export { getUsers, getUserById, getUserByAuth, postUser, putUser, deleteUser }
