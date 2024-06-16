import { Schema, model, mongo, type Types } from "mongoose"
import { type IUserId } from "../types/userInterface"
interface ICommentUserId {
  commentedUserId: Types.ObjectId
}
interface IComment {
  userId: IUserId
  commentedUserId: ICommentUserId
  content: string
  score: number
  isUnlock: boolean
  createdAt: Date
  updatedAt: Date
}

const commentSchema = new Schema<IComment>({
  userId: {
    type: mongo.ObjectId,
    required: [true, "需要使用者id"],
    ref: "user"
  },
  commentedUserId: {
    type: mongo.ObjectId,
    required: [true, "需要被評價者id"],
    ref: "user"
  },
  content: {
    type: String,
    required: [true, "需要評價內容"]
  },
  score: {
    type: Number,
    required: [true, "需要評分"]
  },
  isUnlock: {
    type: Boolean,
    default: false
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
commentSchema.virtual("commentUserProfile", {
  ref: "profile",
  localField: "userId",
  foreignField: "userId"
})
const Comment = model<IComment>("comment", commentSchema)

export { Comment, type IComment }
