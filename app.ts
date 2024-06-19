import express, { type Express } from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import googleService from "@/services/google"
import connectDB from "./configs/dbConn"
import swaggerUI from "swagger-ui-express"
import swaggerFile from "./swagger-output.json"
import { corsOptions } from "./configs/corsOptions"
import { credentials } from "@/middlewares/credentials"
import globalErrorHandler from "@/utils/globalErrorHandler"
import healthyCheckRouter from "@/routes/healthyCheck"
import loginRouter from "@/routes/login"
import profileRouter from "@/routes/profileRoute"
import defaultParamsRouter from "@/routes/defaultParamsRoute"
import commentRouter from "@/routes/commentRouter"
import invitationRouter from "@/routes/invitationRouter"
import notificationRouter from "@/routes/notificationsRoute"
import beInvitationRouter from "@/routes/beInvitationRouter"
import blackListRouter from "@/routes/blackListRouter"
import matchListRouter from "@/routes/matchListRouter"
import unlockCommentRouter from "@/routes/unlockCommentRouter"
import addPointRouter from "@/routes/addPointRouter"
import collectionRouter from "@/routes/collectionRouter"
import searchRouter from "@/routes/searchRouter"
import http from "http"
import initializeSocket from "@/services/ws"
import chatRoomRouter from "@/routes/chatRoomRouter"

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const app: Express = express()

const port = process.env.PORT ?? 3001

/* 未捕捉的 Error */
process.on("uncaughtException", (err: Error) => {
  console.error(`[server]：捕獲到 uncaughtException: ${err.message}`)
  process.exit(1)
})
/* CORS */
app.use(credentials)
app.use(cors(corsOptions))

/* Cookie */
app.use(cookieParser())

/* 解析 Body */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Mongo DB */
void connectDB()

const httpServer = http.createServer(app)

// 初始化 Socket.IO
initializeSocket(httpServer)

httpServer.listen(3002, () => {
  console.log("socket listening on *:3002")
})

/* Router */
app.use("/api/v1", healthyCheckRouter)
app.use("/api/v1", loginRouter)
app.use("/api/v1", profileRouter)
app.use("/api/v1", defaultParamsRouter)
app.use("/api/v1", commentRouter)
app.use("/api/v1", blackListRouter)
app.use("/api/v1", invitationRouter)
app.use("/api/v1", beInvitationRouter)
app.use("/api/v1", notificationRouter)
app.use("/api/v1", matchListRouter)
app.use("/api/v1", collectionRouter)
app.use("/api/v1", searchRouter)
app.use("/api/v1", unlockCommentRouter)
app.use("/api/v1", addPointRouter)
app.use("/api/v1", chatRoomRouter)

/* Google OAuth */
googleService.setupGoogleStrategy()

/* Swagger */

interface ISwaggerFile {
  swagger: string
  info: {
    title: string
    description: string
    version: string
  }
  host: string
  basePath: string
  schemes: string[]
}

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerFile as ISwaggerFile))

/* 404 Handler */
app.use((_, res) => {
  res.status(404).send("404 Not Found")
})

/* Mongo 錯誤處理 */
app.use(globalErrorHandler)

/* 未捕捉的 Promise */
process.on("unhandledRejection", (err, promise) => {
  console.error("[server]：捕獲到 rejection：", promise, "原因：", err)
  process.exit(1)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
