import { Schema, model, mongo, type Types } from "mongoose"
import { type IUserId } from "../types/userInterface"

interface ICollection {
  userId: IUserId
  collectedUserId: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const collectionSchema = new Schema<ICollection>({
  userId: {
    type: mongo.ObjectId,
    required: [true, "需要使用者id"],
    ref: "user",
    unique: true // 確保 userId 不重複
  },
  collectedUserId: {
    type: [mongo.ObjectId],
    default: []
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

collectionSchema.virtual("user", {
  ref: "user",
  foreignField: "_id",
  localField: "userId"
})

collectionSchema.virtual("collectedUsers", {
  ref: "user",
  foreignField: "_id",
  localField: "collectedUserId"
})

const Collection = model<ICollection>("collection", collectionSchema)

export { Collection, type ICollection }
