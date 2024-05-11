import { Schema, model, mongo, type Document } from "mongoose"
import { type IUserId } from "../interface/userInterface"

interface IInvitation extends Document {
  userId: IUserId
  invitedUserId: string
  message: {
    userId: mongo.ObjectId
    title: string
    message: string
    createdAt: Date
    updatedAt: Date
  }
  date: Date
  status: "accepted" | "rejected"
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
    required: [true, "需要邀請使用者id"]
  },
  message: {
    userId: {
      type: mongo.ObjectId,
      required: [true, "需要使用者id"]
    },
    title: {
      type: String,
      required: [true, "需要標題"]
    },
    message: {
      type: String,
      required: [true, "需要訊息"]
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["accepted", "rejected"],
    required: [true, "需要邀請狀態"]
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
