import { type LoginResData } from "@/types/login"
import { type NextFunction, type Request, type Response } from "express"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { User } from "@/models/user"
import { ChatRoom } from "@/models/chatRoom"

const createChatRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { receiverId } = req.body

  const user = await User.findById(userId)
  const receiver = await User.findById(receiverId)

  if (!userId || !receiver) {
    appErrorHandler(400, "無此使用者", next)
    return
  }

  if (userId === receiverId) {
    appErrorHandler(400, "您無法跟自己聊天", next)
  }

  // Check if chat room already exists
  const existingChatRecord = user?.chatRecord.find(record => record.receiverId.toString() === receiverId)
  if (existingChatRecord) {
    appSuccessHandler(200, "查詢成功", existingChatRecord, res)
    return
  }
  const newChatRoom = new ChatRoom({
    members: [userId, receiverId]
  })
  await newChatRoom.save()

  if (user?._id && receiver._id) {
    user.chatRecord.push({ receiverId: receiver._id, roomId: newChatRoom._id })
    receiver.chatRecord.push({ receiverId: user._id, roomId: newChatRoom._id })

    await user.save()
    await receiver.save()

    appSuccessHandler(200, "查詢成功", newChatRoom, res)
  } else {
    appErrorHandler(500, "無法創建聊天房間", next)
  }
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

export { createChatRoom, getChatRoomHistory }
