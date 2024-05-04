import { type NextFunction, type Request, type Response } from "express"
import { User, type IUserSchema } from "@/models/user"
import appErrorHandler from "@/services/appErrorHandler"

/**
 * 取得所有使用者
 */
const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.find()
  if (!users || users.length === 0) {
    res.status(404).json({ status: false, message: "No user found" })
  } else {
    res.status(200).json({ status: true, data: users })
  }
}

/**
 * 取得特定使用者
 * @param req.params.userID Request
 */
const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user) {
    res.status(404).json({ status: false, message: "No user found" })
  } else {
    res.status(200).json({ status: true, data: user })
  }
}

/**
 * 新增使用者
 * @param req.body Request
 */
const postUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.body) {
    appErrorHandler(400, "缺少必要欄位", next); return
  }

  const userPost = await User.create(req.body)
  res.status(201).json({ status: true, data: userPost })
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
  res.status(200).json({ status: true, data: userPut })
}

/**
 * 刪除使用者
 * @param req.params.userID Request
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const userDelete = await User.findByIdAndDelete(id)
  res.status(200).json({ status: true, data: userDelete })
}

export { getUsers, getUserById, postUser, putUser, deleteUser }
