import { Schema, model, mongo } from "mongoose"
import { generalSchemaSettings } from "@/services/mongo"

/**
 * 聊天室訊息 Schema
 */
const messageSchema = new Schema({
  message: {
    type: String,
    required: [true, "需要訊息"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, generalSchemaSettings)

/**
 * 聊天室 Schema
 */
const chatsSchema = new Schema({
  userId: {
    type: mongo.ObjectId,
    required: [true, "需要使用者id"]
  },
  participantIds: {
    type: [mongo.ObjectId],
    required: [true, "需要參與者id"]
  },
  messages: {
    type: [messageSchema],
    required: [true, "需要訊息"]
  },
  unreadCounts: {
    type: Number,
    default: 0
  }
}, generalSchemaSettings)

const Chats = model("chats", chatsSchema)

export { Chats }
