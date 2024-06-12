import { Schema, model, mongo, type Document } from "mongoose"
import { type IUserId } from "../types/userInterface"
import { type IPersonalInfo } from "../models/profile"
interface IInvitation extends Document {
  userId: IUserId
  invitedUserId: string
  message: {
    title: string
    message: string
    createdAt: Date
    updatedAt: Date
  }
  date: Date
  isFinishDating: boolean
  isUnlock?: boolean
  profileByInvitedUser?: IPersonalInfo
  status: "accepted" | "rejected" | "cancel" | "pending"
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
    title: {
      type: String,
      required: [true, "需要標題"]
    },
    content: {
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
  isFinishDating: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["accepted", "rejected", "cancel", "pending"],
    default: "pending"
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
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

invitationSchema.virtual("profileByInvitedUser", {
  ref: "profile",
  foreignField: "userId",
  localField: "invitedUserId"
})
invitationSchema.virtual("profileByInvitedUser", {
  ref: "profile",
  foreignField: "userId",
  localField: "userId"
})

const Invitation = model<IInvitation>("invitation", invitationSchema)
export { Invitation, type IInvitation }
