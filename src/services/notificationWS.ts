import { getIo, socketErrorHandler } from "@/services/ws"
import { type Socket } from "socket.io"
const io = getIo()

interface IMessage {
  title: string
  content: string
}

export const sendNotification = (invitedUserId: string, message: IMessage) => {
  console.log("sendNotification")
  if (!io) {
    socketErrorHandler(new Error("Failed to initialize socket.io"), null as unknown as Socket)
    return
  }

  io.to(invitedUserId).emit("notification", message)
}
