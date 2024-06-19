// src/services/ws.ts
import { type Server as HttpServer } from "http"
import { Server, type Socket } from "socket.io"
import jwt from "jsonwebtoken"
import { type ExtendedError } from "socket.io/dist/namespace"
import { ChatRoom } from "@/models/chatRoom"

declare module "socket.io" {
  interface Socket {
    userInfo?: {
      userId: string
      name: string
      gender?: string
    }
    rooms: Set<string>
  }
}

const socketErrorHandler = (error: Error, socket: Socket) => {
  console.error("Socket Error:", error)
  socket.emit("error", { message: error.message })
}

const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }

  })
  console.log("有人嘗試連接")

  io.use((socket: Socket, next: (err?: ExtendedError) => void) => {
    const token = socket.handshake.headers.authorization
    if (token) {
      const key = process.env.JWT_SECRET
      if (!key) {
        const error: ExtendedError = new Error("缺少必要環境變數")
        error.data = { statusCode: 500 }
        next(error); return
      }

      jwt.verify(token, key, (err, decoded) => {
        if (err) {
          const error: ExtendedError = new Error(err instanceof jwt.TokenExpiredError ? "token 已過期" : "驗證失敗")
          error.data = { statusCode: 401 }
          next(error); return
        }

        socket.userInfo = decoded as { userId: string, name: string, gender?: string }
        next()
      })
    } else {
      const error: ExtendedError = new Error("Authentication error")
      error.data = { statusCode: 401 }
      next(error)
    }
  })

  io.on("connection", (socket) => {
    // 加入房間
    socket.on("join", async ({ roomId }) => {
      const chatRoom = await ChatRoom.findById(roomId)
      if (!chatRoom) {
        socket.emit("error", "房間不存在")
        return
      }
      // 將用戶加入房間
      void socket.join(roomId)
      socket.rooms.add(roomId) // 將房間ID加入到使用者的房間集合中
      socket.emit("chatHistory", chatRoom.messages)
      console.log(socket.rooms)
    })

    socket.on("error", (error) => {
      socketErrorHandler(error, socket)
    })

    // // 離開房間
    // socket.on("leave", () => {
    //   const room = socket.rooms
    //   if (room) {
    //     void socket.leave(room)
    //     socket.emit("message", `Left room: ${room}`)
    //     delete socket.currentRoom
    //   } else {
    //     socket.emit("error", "You are not in any room.")
    //   }
    // })

    // 聊天消息
    socket.on("chat", async ({ message, roomId }) => {
      try {
        const userId = socket.userInfo?.userId
        // 檢查使用者ID和房間ID是否存在
        if (!userId) {
          socket.emit("error", "用戶未登入")
          return
        }
        // 驗證房間ID
        const chatRoom = await ChatRoom.findById(roomId)
        if (!chatRoom) {
          socket.emit("error", "房間不存在")
          return
        }
        // 驗證使用者是否在聊天室中
        if (!socket.rooms.has(roomId)) {
          socket.emit("error", "用戶未加入目標聊天室")
          return
        }

        await ChatRoom.findByIdAndUpdate(roomId, {
          $push: { messages: { senderId: userId, message } }
        })
        io.to(roomId).emit("message", { message, sender: userId })
      } catch (error) {
        socketErrorHandler(error as Error, socket)
      }
    })

    // 斷開連接
    socket.on("disconnect", () => {
      console.log("客戶端斷開連線")
      socket.rooms.clear()
    })
  })
}

export default initializeSocket
