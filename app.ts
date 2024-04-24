import express, { type Express } from "express"
import connectDB from "./configs/dbConn"
import dotenv from "dotenv"

import healthyCheckRouter from "@/routes/healthyCheck"
dotenv.config({ path: ".env.local" })

const app: Express = express()
const port = process.env.PORT ?? 3000

/* 解析 Body */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Mongo DB */
void connectDB()

/* Router */
app.use("/api", healthyCheckRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
