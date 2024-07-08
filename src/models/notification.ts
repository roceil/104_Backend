import { Schema, model, mongo } from "mongoose"
import { type IUserId } from "../types/userInterface"

interface INotification {
  _id: mongo.ObjectId
  userId: IUserId
  receiveUserId: IUserId
  type: number // 1: 邀約通知 | 2: 系統通知
  message: {
    title: string
    content: string
  }
  date: Date
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

const notificationSchema = new Schema<INotification>(
  {
    userId: {
      type: mongo.ObjectId,
      required: [true, "需要使用者id"],
      ref: "user"
    },
    receiveUserId: {
      type: mongo.ObjectId,
      required: [true, "需要接收通知的使用者id"],
      ref: "user"
    },
    type: {
      type: Number,
      required: [true, "需要通知類型"],
      enum: [1, 2] // 1: 邀約通知, 2: 系統通知
    },
    message: {
      type: {
        title: {
          type: String,
          required: [true, "需要通知標題"]
        },
        content: {
          type: String,
          required: [true, "需要通知內容"]
        }
      },
      required: [true, "需要通知內容"]
    },
    isRead: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      required: [true, "需要通知日期"]
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
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

notificationSchema.virtual("user", {
  ref: "user",
  foreignField: "_id",
  localField: "userId"
})

notificationSchema.virtual("receiveUser", {
  ref: "user",
  foreignField: "_id",
  localField: "receiveUserId"
})

notificationSchema.virtual("userProfile", {
  ref: "profile",
  foreignField: "userId",
  localField: "receiveUserId"
})

const Notification = model<INotification>("notification", notificationSchema)

export { Notification, type INotification }
