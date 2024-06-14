import { Schema, model, mongo, type Document } from "mongoose"
import { type IUserId } from "../types/userInterface"

interface IBeInvitation extends Document {
  userId: IUserId
  invitedUserId: string
  invitationId: string
  message: {
    title: string
    message: string
    createdAt: Date
    updatedAt: Date
  }
  isFinishDating: boolean
  date: Date
  status: "accepted" | "rejected" | "cancel" | "pending" | "finishDating"
  createdAt: Date
  updatedAt: Date
}

const beInvitationSchema = new Schema<IBeInvitation>({
  userId: {
    type: mongo.ObjectId,
    required: [true, "需要使用者id"],
    ref: "user"
  },
  invitedUserId: {
    type: String,
    required: [true, "需要邀請使用者id"]
  },
  invitationId: {
    type: String,
    required: [true, "需要邀請列表id"],
    ref: "invitation"
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
    enum: ["accepted", "rejected", "cancel", "pending", "finishDating"],
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
beInvitationSchema.virtual("profileByUser", {
  ref: "profile",
  foreignField: "userId",
  localField: "userId"
})

const BeInvitation = model<IBeInvitation>("beInvitation", beInvitationSchema)
export { BeInvitation, type IBeInvitation }
