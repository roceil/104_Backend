import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { Invitation } from "@/models/invitation"
import { BeInvitation } from "@/models/beInvitation"
import { Profile } from "@/models/profile"
import { Collection } from "@/models/collection"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { checkPageSizeAndPageNumber } from "@/utils/checkControllerParams"
import { isInBlackList } from "@/utils/blackListHandler"
interface ParsedBeInvitation {
  userId: string
  invitedUserId: string
  message: {
    title: string
    content: string
  }
  id?: string
  profileByInvitedUser: {
    photoDetails: string
    introDetails: string
    nickNameDetails: string
    incomeDetails: string
    lineDetails: string
    tags: string[]
    exposureSettings: string
    userStatus: string
  }
}
interface BeInvitationWithUnlockAndCollection extends ParsedBeInvitation {
  isUnlock: boolean
  isCollected: boolean
}

const getWhoInvitationList = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { pageSize, pageNumber } = req.query as { pageSize?: string, pageNumber?: string }
  // 檢查是否有傳入pageSize和pageNumber，若無則設定預設值
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, pageNumber)

  const { userId } = req.user as LoginResData

  const [profile, collection] = await Promise.all([Profile.findOne({ userId }).select("unlockComment"), Collection.find({ userId }).select("collectedUserId")])
  const unlockComment = profile?.unlockComment ?? []
  const collectionList = collection.map(doc => doc.collectedUserId.toString()) ?? []

  const beInvitationList = await BeInvitation.find({ invitedUserId: userId }).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize).populate({
    path: "profileByUser",
    select: "photoDetails introDetails nickNameDetails incomeDetails lineDetails jobDetails companyDetails tags exposureSettings userStatus"
  }).populate({
    path: "matchListByUser",
    select: "personalInfo workInfo blacklist noticeInfo"
  })
  const beInvitationsLength = await BeInvitation.countDocuments({ invitedUserId: userId })
  if (!beInvitationList || beInvitationList.length === 0) {
    appSuccessHandler(200, "沒有邀請", { invitations: [] }, res)
  } else {
    const parsedBeInvitationList = JSON.parse(JSON.stringify(beInvitationList))
    const beInvitations: BeInvitationWithUnlockAndCollection[] = parsedBeInvitationList.map((beInvitation: ParsedBeInvitation) => {
      let isUnlock = false
      if (unlockComment.length !== 0) {
        isUnlock = collectionList.includes(beInvitation.userId)
      }
      let isCollected = false
      if (collectionList.length !== 0) {
        isCollected = collectionList.includes(beInvitation.userId)
      }
      return { ...beInvitation, isUnlock, isCollected }
    })
    appSuccessHandler(200, "查詢成功", { beInvitations, beInvitationsLength }, res)
  }
}
const getWhoInvitationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const beInvitation = await BeInvitation.findById(id).populate({
    path: "profileByUser",
    select: "photoDetails introDetails nickNameDetails incomeDetails lineDetails jobDetails companyDetails tags exposureSettings userStatus"
  })
  if (!beInvitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "查詢成功", beInvitation, res)
  }
}

const cancelBeInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const beInvitation = await BeInvitation.findByIdAndUpdate(id, { status: "cancel" }, { new: true })
  const beInvitationId = await BeInvitation.findById(id).select("invitationId")
  const { invitationId } = beInvitationId as { invitationId: string }
  if (!invitationId) {
    appErrorHandler(404, "No invitation found", next)
  }
  const invitation = await Invitation.findByIdAndUpdate(invitationId, { status: "cancel" }, { new: true })
  if (!beInvitation || !invitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "取消邀請成功", beInvitation, res)
  }
}

const rejectInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const beInvitation = await BeInvitation.findByIdAndUpdate(id, { status: "rejected" }, { new: true })
  const beInvitationId = await BeInvitation.findById(id).select("invitationId")
  if (!beInvitationId || !beInvitationId.invitationId) {
    appErrorHandler(404, "No invitation found", next)
  }
  const { invitationId } = beInvitationId as { invitationId: string }
  const invitation = await Invitation.findByIdAndUpdate(invitationId, { status: "rejected" }, { new: true })
  if (!invitation || !beInvitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "拒絕邀請成功", invitation, res)
  }
}

const acceptInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData
  // 檢查邀約者是否在黑名單中
  if (await isInBlackList(userId, id, next)) {
    appErrorHandler(400, "接受失敗", next)
  }
  const beInvitation = await BeInvitation.findByIdAndUpdate(id, { status: "accept" }, { new: true })
  if (!beInvitation) {
    appErrorHandler(404, "No invitation found", next)
  }
  const beInvitationId = await BeInvitation.findById(id).select("invitationId")
  const { invitationId } = beInvitationId as { invitationId: string }
  const invitation = await Invitation.findByIdAndUpdate(invitationId, { status: "accept" }, { new: true })
  if (!invitation || !beInvitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "接受邀請成功", invitation, res)
  }
}
const deleteBeInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const beInvitationId = await BeInvitation.findById(id).select("invitationId")
  const { invitationId } = beInvitationId as { invitationId: string }
  const invitation = await Invitation.findByIdAndUpdate(invitationId, { status: "cancel" }, { new: true })
  const beInvitation = await BeInvitation.findByIdAndDelete(id)

  if (!beInvitation || !invitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "刪除成功", beInvitation, res)
  }
}
const finishBeInvitationDating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const beInvitation = await BeInvitation.findByIdAndUpdate(id, { isFinishDating: true, status: "finishDating" }, { new: true })
  if (!beInvitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "完成約會", beInvitation, res)
  }
}
export { getWhoInvitationList, getWhoInvitationById, cancelBeInvitation, rejectInvitation, acceptInvitation, deleteBeInvitation, finishBeInvitationDating }
