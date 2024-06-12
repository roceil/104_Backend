import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { Profile } from "@/models/profile"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { isUserProfileExist } from "@/utils/checkProfileExist"
import { partialPersonalInfoSchema } from "@/schemas/profile"
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
  }).populate("userInfo").lean()

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
  const { userId } = req.user as LoginResData

  if (!userId) {
    appErrorHandler(400, "缺少使用者id", next); return
  }
  if (await isUserProfileExist(userId)) {
    appErrorHandler(400, "用戶Id已存在", next); return
  }
  req.body.userId = userId
  const userPost = await Profile.create(req.body)
  appSuccessHandler(201, "用戶新增資料成功", userPost, res)
}

const putUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData

  // 進行部分更新驗證
  const result = partialPersonalInfoSchema.safeParse(req.body)
  if (!result.success) {
    const errorMessage = result.error.errors.map(e => e.message).join(", ")
    appErrorHandler(400, errorMessage, next)
    return
  }

  const updateData = result.data

  if (!userId) {
    appErrorHandler(400, "缺少使用者Id請重新登入", next); return
  }
  const userPut = await Profile.findOneAndUpdate({ userId }, { $set: updateData }, { new: true }
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
