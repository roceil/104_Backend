import { type LoginResData } from "@/types/login"
import { type NextFunction, type Request, type Response } from "express"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { User } from "@/models/user"
import { ChatRoom } from "@/models/chatRoom"
import { fetchChatHistories, getIo, onlineUsers } from "@/services/ws"
import { Profile } from "@/models/profile"
import type mongoose from "mongoose"

const createChatRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { receiverId } = req.body

  const user = await User.findById(userId).lean()
  const receiver = await User.findById(receiverId).lean()

  if (!user || !receiver) {
    appErrorHandler(400, "無此使用者", next)
    return
  }

  if (userId === receiverId) {
    appErrorHandler(400, "您無法跟自己聊天", next)
    return
  }

  // 檢查聊天室是否已存在
  const existingChatRecord = user.chatRecord?.find(record => record.receiverId.toString() === receiverId)
  if (existingChatRecord) {
    appSuccessHandler(200, "查詢成功", existingChatRecord, res)
    return
  }

  // 創建新的聊天室，只存儲用戶ID
  const newChatRoom = new ChatRoom({ members: [user._id, receiver._id] })
  await newChatRoom.save()

  if (user._id && receiver._id) {
    await User.findByIdAndUpdate(user._id, { $push: { chatRecord: { receiverId: receiver._id, roomId: newChatRoom._id } } })
    await User.findByIdAndUpdate(receiver._id, { $push: { chatRecord: { receiverId: user._id, roomId: newChatRoom._id } } })

    const formattedMembers = await formatMembers(newChatRoom.members)
    const responseData = { ...newChatRoom.toObject(), members: formattedMembers }

    // 處理 Socket.io 相關邏輯
    const io = getIo()
    if (io) {
      const userSocketId = onlineUsers.get(user._id.toString())
      const receiverSocketId = onlineUsers.get(receiverId)

      if (userSocketId) {
        const userSocket = io.sockets.sockets.get(userSocketId)
        if (userSocket) {
          const userChatHistories = await fetchChatHistories(userSocket)
          io.to(userSocketId).emit("chatHistory", userChatHistories)
        }
      }

      if (receiverSocketId) {
        const receiverSocket = io.sockets.sockets.get(receiverSocketId)
        if (receiverSocket) {
          const receiverChatHistories = await fetchChatHistories(receiverSocket)
          io.to(receiverSocketId).emit("chatHistory", receiverChatHistories)
        }
      }
    }

    appSuccessHandler(200, "查詢成功", responseData, res)
  } else {
    appErrorHandler(500, "無法創建聊天房間", next)
  }
}

// 輔助函數：格式化成員信息
async function formatMembers (memberIds: mongoose.Types.ObjectId[]): Promise<Array<{ username: string, photo: string | null, id: string }>> {
  const formattedMembers = await Promise.all(memberIds.map(async (memberId) => {
    const user = await User.findById(memberId).select("personalInfo.username").lean()
    const profile = await Profile.findOne({ userId: memberId }).select("photoDetails.photo").lean()

    return {
      id: memberId.toString(),
      username: user?.personalInfo?.username ?? "",
      photo: profile?.photoDetails?.photo ?? ""
    }
  }))

  return formattedMembers
}

const getChatRoomHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { roomId } = req.params
  const chatRoom = await ChatRoom.findById(roomId).populate("messages.senderId", "personalInfo.username")
  if (!chatRoom) {
    appErrorHandler(400, "房間不存在", next)
    return
  }

  appSuccessHandler(200, "取得聊天記錄成功", chatRoom.messages, res)
}

const markAllMessagesAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { roomId } = req.params
  const chatRoom = await ChatRoom.findById(roomId)

  if (!chatRoom) {
    appErrorHandler(400, "房間不存在", next)
    return
  }

  chatRoom.messages.forEach((message) => {
    message.isRead = true
  })

  await chatRoom.save()

  appSuccessHandler(200, "所有消息已標記為已讀", chatRoom, res)
}

export { createChatRoom, getChatRoomHistory, markAllMessagesAsRead }
