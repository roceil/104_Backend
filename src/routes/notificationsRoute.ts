import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"

import { getNotifications, getInviteNotificationsByUserId, getNotificationsByUserId, createNotification } from "@/controllers/notificationsController"
import isAuth from "@/middlewares/isAuth"

const router = Router()

router.get("/notifications", isAuth, asyncErrorHandler(getNotifications) as RequestHandler)

router.get("/user/invitations", isAuth, asyncErrorHandler(getInviteNotificationsByUserId) as RequestHandler)

router.get("/my-notifications", isAuth, asyncErrorHandler(getNotificationsByUserId) as RequestHandler)

router.post("/notification", isAuth, asyncErrorHandler(createNotification) as RequestHandler)

export default router
