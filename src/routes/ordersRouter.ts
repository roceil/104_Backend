import { type RequestHandler, Router, type Handler } from "express"
import { createOrder, notifyOrder, returnOrder } from "@/services/newebPay"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"

const router = Router()

router.post("/create-order", isAuth as Handler, asyncErrorHandler(createOrder) as RequestHandler)

router.post("/notify", asyncErrorHandler(notifyOrder) as RequestHandler)

router.post("/return", asyncErrorHandler(returnOrder) as RequestHandler)

export default router
