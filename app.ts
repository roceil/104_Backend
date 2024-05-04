import express, { type Express } from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./configs/dbConn"
import { corsOptions } from "./configs/corsOptions"
import { credentials } from "@/middlewares/credentials"
import { mongoDB } from "@/services/mongo"

import healthyCheckRouter from "@/routes/healthyCheck"
import loginRouter from "@/routes/login"
import userRouter from "@/routes/userRoute"

dotenv.config({ path: ".env.local" })

const app: Express = express()
const port = process.env.PORT ?? 3001

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

/* Router */
app.use("/api", healthyCheckRouter)
app.use("/api", loginRouter)
app.use("/api/v1/user-data", userRouter)

/* 404 Handler */
app.use((_, res) => {
  res.status(404).send("404 Not Found")
})

/* Error Handler 簡單版 */
// app.use((err: Error, req: Request, res: Response, _next: NextFunction): void => {
//   console.log("errorHandler")
//   console.error("nodeJs出錯啦", err)
//   res.status(500).json({ status: false, message: err })
// })

/* Mongo 錯誤處理 */
app.use(mongoDB.errorHandler)

/* 未捕捉的 Promise */
process.on("unhandledRejection", (err, promise) => {
  console.error("[server]：捕獲到 rejection：", promise, "原因：", err)
  process.exit(1)
})

/* 未捕捉的 Error */
process.on("uncaughtException", (err: Error) => {
  console.error(`[server]：捕獲到 uncaughtException: ${err.message}`)
  process.exit(1)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
