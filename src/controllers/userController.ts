import { type Request, type Response, type NextFunction } from "express"
import { User, type IUserSchema } from "../models/user"
const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.find()
  if (!users || users.length === 0) {
    res.status(404).json({ status: false, message: "No user found" })
  } else {
    res.status(200).json({ status: true, data: users })
  }
}
const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user) {
    res.status(404).json({ status: false, message: "No user found" })
  } else {
    res.status(200).json({ status: true, data: user })
  }
}
const postUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userPost = await User.create(req.body)
    res.status(201).json({ status: true, data: userPost })
  } catch (error) {
    next(error)
  }
}
const putUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userPut = await User.findByIdAndUpdate(id, req.body as IUserSchema
    )
    res.status(200).json({ status: true, data: userPut })
  } catch (error) {
    next(error)
  }
}
const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userDelete = await User.findByIdAndDelete(id)
    res.status(200).json({ status: true, data: userDelete })
  } catch (error) {
    next(error)
  }
}
export { getUsers, getUserById, postUser, putUser, deleteUser }
