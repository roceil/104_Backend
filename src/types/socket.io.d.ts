import "socket.io"

declare module "socket.io" {
  interface Server {
    emit: {
      <E extends string>(event: E, ...args: unknown[]): boolean
      (event: "userConnectNotify", ...args: unknown[]): boolean
      (event: "message", message: { message: string, sender: string, roomId: string }): boolean
      (event: "joinRoom", roomId: string): boolean
    }
  }

  interface Socket {
    emit: {
      <E extends string>(event: E, ...args: unknown[]): boolean
      (event: "userConnectNotify", ...args: unknown[]): boolean
      (event: "message", message: { message: string, sender: string, roomId: string }): boolean
      (event: "joinRoom", roomId: string): boolean
    }
  }
}
