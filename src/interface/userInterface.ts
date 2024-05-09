import { type Types } from "mongoose"

interface IUserId {
  userId: Types.ObjectId
  ref: string
}

export { type IUserId }
