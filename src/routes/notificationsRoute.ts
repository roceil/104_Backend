import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import { getNotifications, getInviteNotificationsByUserId, getNotificationsByUserId, readNotificationById, readAllNotificationsByUserId, deleteNotificationById } from "@/controllers/notificationsController"
import { getNotificationListSwagger, deleteNotificationSwagger } from "@/middlewares/swaggerConfig/notificationSwagger"
const router = Router()
router.get("/user/notifications",
  getNotificationListSwagger, isAuth, asyncErrorHandler(getInviteNotificationsByUserId) as RequestHandler)

router.delete("/user/notifications/:id",
  deleteNotificationSwagger, isAuth, asyncErrorHandler(deleteNotificationById) as RequestHandler)

router.get("/notifications", isAuth, asyncErrorHandler(getNotifications) as RequestHandler)

router.patch("/user/notifications/read", isAuth, asyncErrorHandler(readNotificationById) as RequestHandler)

router.patch("/user/notifications/read-all", isAuth, asyncErrorHandler(readAllNotificationsByUserId) as RequestHandler)

router.get("/my-notifications", isAuth, asyncErrorHandler(getNotificationsByUserId) as RequestHandler)

export default router
