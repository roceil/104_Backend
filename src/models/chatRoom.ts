import mongoose, { Schema, type Types, type Document } from "mongoose"

interface IMessage {
  senderId: Types.ObjectId
  message: string
  createdAt: Date
  isRead: boolean
}

const messageSchema = new Schema<IMessage>({
  senderId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
})

interface IChatRoom extends Document {
  members: Types.ObjectId[]
  messages: IMessage[]
  createdAt: Date
  updatedAt: Date
}

const chatRoomSchema = new Schema<IChatRoom>({
  members: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: []
  },
  messages: {
    type: [messageSchema],
    default: []
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

chatRoomSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export const ChatRoom = mongoose.model<IChatRoom>("ChatRoom", chatRoomSchema)
