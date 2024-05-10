import { Schema, model, mongo } from "mongoose"
import { type IUserId } from "../interface/userInterface"
interface IInvitation {
  userId: IUserId
  invitedUserId: string
  message: string
  date: Date
  status: string
  createdAt: Date
  updatedAt: Date
}
const invitationSchema = new Schema<IInvitation>({
  userId: {
    type: mongo.ObjectId,
    required: [true, "需要使用者id"],
    ref: "user"
  },
  invitedUserId: {
    type: String,
    requiredPaths: [true, "需要邀請使用者id"]
  },
  message: {
    type: String,
    default: "",
    required: [true, "需要邀請訊息"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["accepted", "rejected"], // 可以加到defaultParams
    require: [true, "需要邀請狀態"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  versionKey: false
})

const Invitation = model<IInvitation>("invitation", invitationSchema)
export { Invitation, type IInvitation }
