// 暫時先放著，不確定能不能動
import { type Socket } from "socket.io"

type AsyncSocketFunction = (socket: Socket) => Promise<void>

const handleSocketErrorAsync = (func: AsyncSocketFunction) => {
  return function (socket: Socket): void {
    func(socket).catch((err: Error) => {
      console.error("Socket Error:", err)
      socket.emit("error", { message: err.message })
    })
  }
}

export { handleSocketErrorAsync }
