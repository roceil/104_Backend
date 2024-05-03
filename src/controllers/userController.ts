import { type Request, type Response } from "express"
import User from "../models/user"
const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.find()
  if (!users || users.length === 0) {
    res.status(404).send("no user")
  } else {
    res.status(200).json({ status: true, data: users })
  }
}

export { getUsers }
