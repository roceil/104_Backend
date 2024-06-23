import { type RequestHandler, Router, type Handler } from "express"
import { createOrder } from "@/services/newebPay"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"

const router = Router()

router.post("/create-order", isAuth as Handler, asyncErrorHandler(createOrder) as RequestHandler)

export default router
