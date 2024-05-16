import { Schema, model, mongo, type Types } from "mongoose"
import { type IUserId } from "../types/userInterface"
interface ICommentUserId {
  commentedUserId: Types.ObjectId
}
interface IComment {
  userId: IUserId
  commentedUserId: ICommentUserId
  content: string
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
    required: [true, "需要被價者id"]
  },
  content: {
    type: String,
    required: [true, "需要評價內容"]
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

const Comment = model<IComment>("Comment", commentSchema)

export default Comment
