import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { Invitation } from "@/models/invitation"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { checkPageSizeAndPageNumber } from "@/utils/checkControllerParams"
const postInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { invitedUserId, message } = req.body
  if (!invitedUserId) {
    appErrorHandler(400, "缺少邀請使用者Id", next)
  }
  if (userId === invitedUserId) {
    appErrorHandler(400, "不能邀請自己", next)
  }
  if (!message) {
    appErrorHandler(400, "缺少訊息", next)
  }
  if (!message.title) {
    appErrorHandler(400, "缺少標題", next)
  }
  if (!message.content) {
    appErrorHandler(400, "缺少訊息", next)
  }
  const invitation = await Invitation.create({ userId, invitedUserId, message })
  if (!invitation) {
    appErrorHandler(400, "邀請失敗", next)
  } else {
    appSuccessHandler(201, "邀請成功", invitation, res)
  }
}

const getInvitationList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { pageSize, pageNumber } = req.query as { pageSize?: string, pageNumber?: string }
  // 檢查是否有傳入pageSize和pageNumber，若無則設定預設值
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, pageNumber)

  const { userId } = req.user as LoginResData
  const invitations = await Invitation.find({ userId }).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize).populate({
    path: "profileByUser",
    select: "photoDetails introDetails nickNameDetails incomeDetails lineDetails tags"
  })
  const invitationsLength = await Invitation.countDocuments({ userId })
  if (!invitations || invitations.length === 0) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "查詢成功", { invitations, invitationsLength }, res)
  }
}
const getWhoInvitationList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { pageSize, pageNumber } = req.query as { pageSize?: string, pageNumber?: string }
  // 檢查是否有傳入pageSize和pageNumber，若無則設定預設值
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, pageNumber)

  const { userId } = req.user as LoginResData
  const invitations = await Invitation.find({ invitedUserId: userId }).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize).populate({
    path: "profileByInvitedUser",
    select: "photoDetails introDetails nickNameDetails incomeDetails lineDetails tags"
  })
  const invitationsLength = await Invitation.countDocuments({ invitedUserId: userId })
  if (!invitations || invitations.length === 0) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "查詢成功", { invitations, invitationsLength }, res)
  }
}

const getInvitationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const invitation = await Invitation.findById(id).populate({
    path: "profile",
    select: "photoDetails introDetails nickNameDetails incomeDetails lineDetails tags exposureSettings"
  })
  if (!invitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "查詢成功", invitation, res)
  }
}

const cancelInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const invitation = await Invitation.findByIdAndUpdate(id, { status: "cancel" }, { new: true })
  if (!invitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "取消邀請成功", invitation, res)
  }
}
const rejectInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const invitation = await Invitation.findByIdAndUpdate(id, { status: "rejected" }, { new: true })
  if (!invitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "拒絕邀請成功", invitation, res)
  }
}

const acceptInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const invitation = await Invitation.findByIdAndUpdate(id, { status: "accepted" }, { new: true })
  if (!invitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "接受邀請成功", invitation, res)
  }
}

const deleteInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const invitation = await Invitation.findByIdAndDelete(id)
  if (!invitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "刪除成功", invitation, res)
  }
}

export { postInvitation, getInvitationList, getWhoInvitationList, getInvitationById, cancelInvitation, rejectInvitation, acceptInvitation, deleteInvitation }
