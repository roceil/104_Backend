import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { Notification } from "@/models/notification"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"

/**
 * 取得所有通知
 */
const getNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const notifications = await Notification.find()

  if (!notifications || notifications.length === 0) {
    appErrorHandler(404, "查無通知", next)
    return
  }

  appSuccessHandler(200, "查詢成功", notifications, res)
}

/**
 * 取得邀請通知 By userId
 */
const getInviteNotificationsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData

  const notifications = await Notification
    .find({ receiveUserId: userId })
    .populate("user", "personalInfo")
    .populate("receiveUser", "personalInfo")
    .populate("invitation", "message")

  if (!notifications || notifications.length === 0) {
    appErrorHandler(404, "查無通知", next)
    return
  }

  appSuccessHandler(200, "查詢成功", notifications, res)
}

/**
 * 取得我送出的通知 By userId
 */
const getNotificationsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData

  const notifications = await Notification
    .find({ userId })
    .populate("user", "personalInfo")
    .populate("receiveUser", "personalInfo")

  if (!notifications || notifications.length === 0) {
    appErrorHandler(404, "查無通知", next)
    return
  }

  appSuccessHandler(200, "查詢成功", notifications, res)
}

/**
 * 建立通知
 */
const createNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userData = req.user as LoginResData

  // 取得通知內容
  const { receiveUserId, content, type } = req.body
  if (!receiveUserId) {
    appErrorHandler(400, "接收通知的使用者id不得為空", next)
    return
  }

  if (userData.userId === receiveUserId) {
    appErrorHandler(400, "通知不能發送給自己", next)
    return
  }

  if (!content) {
    appErrorHandler(400, "通知內容不得為空", next)
    return
  }

  if (!type) {
    appErrorHandler(400, "通知類型不得為空", next)
    return
  }

  const notification = new Notification({
    userId: userData.userId,
    receiveUserId,
    type,
    content,
    date: new Date()
  })

  await notification.save()

  appSuccessHandler(201, "通知建立成功", notification, res)
}

export { getNotifications, getInviteNotificationsByUserId, getNotificationsByUserId, createNotification }
