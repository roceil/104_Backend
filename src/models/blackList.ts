import { Schema, model, mongo } from "mongoose"
import { type IUserId } from "../types/userInterface"
interface IBlackList {
  userId: IUserId
  lockedUserId: mongo.ObjectId[]
  createdAt: Date
  updatedAt: Date
}
const blackListSchema = new Schema<IBlackList>({
  userId: { type: mongo.ObjectId, required: [true, "需要使用者id"], ref: "user" },
  lockedUserId: {
    type: [mongo.ObjectId],
    default: []
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  versionKey: false
}
)
const BlackList = model("blackList", blackListSchema)
export { BlackList, type IBlackList }
