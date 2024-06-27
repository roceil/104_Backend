import { getIo, getRooms, socketErrorHandler, type IMessage } from "@/services/ws"
import { type Socket } from "socket.io"

export const sendNotification = (message: IMessage) => {
  const io = getIo()
  if (!io) {
    socketErrorHandler(new Error("Failed to initialize socket.io"), null as unknown as Socket)
    return
  }
  const rooms = getRooms()
  const roomId = rooms.values().next().value
  if (roomId) {
    io.to(roomId).emit("notification", message)
  }
}
