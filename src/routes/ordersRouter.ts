import { type RequestHandler, Router, type Handler } from "express"
import { createOrder, notifyOrder, returnOrder, createSubscriptionOrder, notifySubscriptionOrder } from "@/services/newebPay"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import multer from "multer"

const router = Router()
const upload = multer()

router.post("/create-order", isAuth as Handler, asyncErrorHandler(createOrder) as RequestHandler)

router.post("/create-subscription-order", isAuth as Handler, asyncErrorHandler(createSubscriptionOrder) as RequestHandler)

router.post("/notify", asyncErrorHandler(notifyOrder) as RequestHandler)

router.post("/notify-subscription-order", upload.none(), asyncErrorHandler(notifySubscriptionOrder) as RequestHandler)

router.post("/return", asyncErrorHandler(returnOrder) as RequestHandler)

export default router
