import { Schema, model, mongo } from "mongoose"
import { type IUserId } from "../types/userInterface"
interface ICollection {
  userId: IUserId
  collectedUserId: IUserId
  createdAt: Date
  updatedAt: Date
}

const collectionSchema = new Schema<ICollection>({
  userId: {
    type: mongo.ObjectId,
    required: [true, "需要使用者id"],
    ref: "user"
  },
  collectedUserId: {
    type: mongo.ObjectId,
    required: [true, "需要被邀請者id"],
    ref: "user"
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
collectionSchema.virtual("collectedUsers", {
  ref: "user",
  foreignField: "_id",
  localField: "collectedUserId"
})

collectionSchema.virtual("matchListSelfSetting", {
  ref: "matchListSelfSetting",
  foreignField: "userId",
  localField: "userId"
})

const Collection = model<ICollection>("collection", collectionSchema)

export { Collection, type ICollection }
