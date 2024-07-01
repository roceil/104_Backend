import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import { createChatRoom, getChatRoomHistory, markAllMessagesAsRead } from "@/controllers/chatRoomController"

const router = Router()

router.post("/chat", isAuth, asyncErrorHandler(createChatRoom) as RequestHandler)

router.get("/chatHistory/:roomId", isAuth, asyncErrorHandler(getChatRoomHistory) as RequestHandler)

router.post("/chatrooms/:roomId/markAllRead", isAuth, asyncErrorHandler(markAllMessagesAsRead) as RequestHandler)

export default router
