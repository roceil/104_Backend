import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"

import { getNotifications, getInviteNotificationsByUserId, getNotificationsByUserId, readNotificationById, readAllNotificationsByUserId } from "@/controllers/notificationsController"
import { getNotificationListFromInvitationSwagger } from "@/middlewares/swaggerConfig/notificationSwagger"
import isAuth from "@/middlewares/isAuth"

const router = Router()

router.get("/notifications", isAuth, asyncErrorHandler(getNotifications) as RequestHandler)

router.get("/user/notifications", getNotificationListFromInvitationSwagger, isAuth, asyncErrorHandler(getInviteNotificationsByUserId) as RequestHandler)

router.patch("/user/notifications/read", isAuth, asyncErrorHandler(readNotificationById) as RequestHandler)

router.patch("/user/notifications/read-all", isAuth, asyncErrorHandler(readAllNotificationsByUserId) as RequestHandler)

router.get("/my-notifications", isAuth, asyncErrorHandler(getNotificationsByUserId) as RequestHandler)

export default router
