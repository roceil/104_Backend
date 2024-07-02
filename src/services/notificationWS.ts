import { getIo, socketErrorHandler } from "@/services/ws"
import { type INickNameDetails } from "@/models/profile"
import { type Types } from "mongoose"
import { type Socket } from "socket.io"
// { title: message.title, content: message.content, nickNameDetails, userId }
interface INotification {
  title: string
  content: string
  nickNameDetails: INickNameDetails
  userId?: Types.ObjectId
}

const sendNotification = (message: INotification, roomId: string | Types.ObjectId) => {
  const io = getIo()
  if (!io) {
    socketErrorHandler(new Error("Failed to initialize socket.io"), null as unknown as Socket)
    return
  }
  if (roomId) {
    io.to(roomId.toString()).emit("notification", message)
  }
}
export { sendNotification, type INotification }
