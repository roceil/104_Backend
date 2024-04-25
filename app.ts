import express, { type Express } from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./configs/dbConn"

import healthyCheckRouter from "@/routes/healthyCheck"
import loginRouter from "@/routes/login"

dotenv.config({ path: ".env.local" })

const app: Express = express()
const port = process.env.PORT ?? 3001

/* CORS */
const corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions))

/* 解析 Body */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Mongo DB */
void connectDB()

/* Router */
app.use("/api", healthyCheckRouter)
app.use("/api", loginRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
