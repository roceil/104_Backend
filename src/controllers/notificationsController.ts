import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { Notification } from "@/models/notification"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { type Types } from "mongoose"

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
    .populate("user", "personalInfo.username personalInfo.email")
    .populate("receiveUser", "personalInfo.username personalInfo.email")
    .populate("userProfile")
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
 * 已讀特定通知 By notificationId
 */
const readNotificationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { notificationId } = req.body

  if (!notificationId) {
    appErrorHandler(400, "請提供通知id", next)
    return
  }

  const notification = await Notification.findById(notificationId)

  if (!notification) {
    appErrorHandler(404, "查無通知", next)
    return
  }

  notification.isRead = true
  await notification.save()

  appSuccessHandler(200, "已讀成功", notification, res)
}

/**
 * 已讀所有通知 By userId
 */
const readAllNotificationsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData

  // 先檢查是否有未讀的通知
  const unreadNotifications = await Notification.countDocuments({ receiveUserId: userId, isRead: false })

  if (unreadNotifications === 0) {
    appErrorHandler(404, "目前沒有訊息可以設為已讀", next)
    return
  }

  // 更新所有未讀通知為已讀
  const updated = await Notification.updateMany({ receiveUserId: userId, isRead: false }, { isRead: true })

  if (updated.modifiedCount === 0) {
    appErrorHandler(400, "訊息已讀失敗", next)
    return
  }

  appSuccessHandler(200, "成功已讀所有訊息", null, res)
}

/**
 * 【函式】建立通知
 * @param userId 送出通知的使用者id
 * @param receiveUserId 接收通知的使用者id
 * @param message 通知內容
 * @param notifyType 通知類型
 */
const createNotification = async (
  userId: Types. ObjectId | undefined,
  receiveUserId: Types.ObjectId | undefined | string,
  message: { title: string, content: string },
  notifyType: 1 | 2): Promise<boolean> => {
  // 取得通知內容
  if (!receiveUserId) {
    throw new Error("接收通知的使用者id不得為空")
  }

  if (userId === receiveUserId) {
    throw new Error("通知不能發送給自己")
  }

  if (!message) {
    throw new Error("通知內容不得為空")
  }

  if (!notifyType) {
    throw new Error("通知類型不得為空")
  }

  const notification = new Notification({
    userId,
    receiveUserId,
    type: notifyType,
    message,
    date: new Date()
  })

  await notification.save()

  if (!notification) {
    throw new Error("通知建立失敗")
  }

  return true
}
const deleteNotificationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params

  if (!id) {
    appErrorHandler(400, "請提供通知id", next)
    return
  }

  const notification = await Notification.findByIdAndDelete(id)
  if (!notification) {
    appErrorHandler(404, "查無通知", next)
  }
  appSuccessHandler(200, "刪除成功", notification, res)
}

export { getNotifications, getInviteNotificationsByUserId, getNotificationsByUserId, createNotification, readNotificationById, readAllNotificationsByUserId, deleteNotificationById }
