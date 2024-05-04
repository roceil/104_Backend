import { type NextFunction, type Request, type Response } from "express"
import { User, type IUserSchema } from "@/models/user"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"

/**
 * 取得所有使用者
 */
const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const users = await User.find()
  if (!users || users.length === 0) {
    appErrorHandler(404, "No user found", next)
  } else {
    appSuccessHandler(200, "查詢成功", users, res)
  }
}

/**
 * 取得特定使用者
 * @param req.params.userID Request
 */
const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user) {
    appErrorHandler(404, "No user found", next)
  } else {
    appSuccessHandler(200, "查詢成功", user, res)
  }
}

/**
 * 新增使用者
 * @param req.body Request
 */
const postUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // NOTE:這邊要擋的內容需要再調整
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    appErrorHandler(400, "缺少必要欄位", next); return
  }

  const userPost = await User.create(req.body)
  appSuccessHandler(201, "用戶新增成功", userPost, res)
}

/**
 * 修改使用者
 * @param req.params.userID Request
 * @param req.body Request
 */
const putUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.params.userID) {
    appErrorHandler(400, "缺少使用者 ID", next); return
  }

  const { id } = req.params
  const userPut = await User.findByIdAndUpdate(id, req.body as IUserSchema
  )
  appSuccessHandler(200, "用戶修改成功", userPut, res)
}

/**
 * 刪除使用者
 * @param req.params.userID Request
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const userDelete = await User.findByIdAndDelete(id)
  appSuccessHandler(200, "用戶刪除成功", userDelete, res)
}

export { getUsers, getUserById, postUser, putUser, deleteUser }
