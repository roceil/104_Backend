import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { Invitation } from "@/models/invitation"
import { BeInvitation } from "@/models/beInvitation"
import { Profile, type IPersonalInfo } from "@/models/profile"
import { Collection } from "@/models/collection"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { checkPageSizeAndPageNumber } from "@/utils/checkControllerParams"
import { isInBlackList } from "@/utils/blackListHandler"
import { createNotification } from "./notificationsController"
import { sendNotification } from "@/services/notificationWS"
import mongoose, { type Types } from "mongoose"
import { type INotification } from "@/models/notification"
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
  const { pageSize, page, sort } = req.query as { pageSize?: string, page?: string, sort?: string }
  const dateSort = sort === "desc" ? "-updatedAt" : "updatedAt"
  // 檢查是否有傳入pageSize和pageNumber，若無則設定預設值
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, page)

  const { userId } = req.user as LoginResData

  const [profile, collection] = await Promise.all([Profile.findOne({ userId }).select("unlockComment"), Collection.find({ userId }).select("collectedUserId")])
  const unlockComment = profile?.unlockComment ?? []
  const collectionList = collection.map(doc => doc.id.toString()) ?? []
  const [totalCount, beInvitationList] = await Promise.all([BeInvitation.countDocuments({ invitedUserId: userId }), BeInvitation.find({ invitedUserId: userId }).sort(dateSort).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize).populate({
    path: "profileByUser",
    select: "photoDetails introDetails nickNameDetails incomeDetails lineDetails jobDetails companyDetails tags exposureSettings userStatus"
  }).populate({
    path: "matchListSelfSettingByUser",
    select: "searchDataBase personalInfo workInfo"
  })])
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
    const pagination = {
      page: parsedPageNumber,
      perPage: parsedPageSize,
      totalCount
    }
    const response = {
      beInvitations,
      pagination
    }
    appSuccessHandler(200, "查詢成功", response, res)
  }
}
const getWhoInvitationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData
  const beInvitation = await getBeInvitationListByIdWithAggregation(userId, id)

  if (!beInvitation || beInvitation.length === 0) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "查詢成功", beInvitation[0], res)
  }
}
const cancelBeInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData
  const [beInvitation, beInvitationId, profileWithUser] = await Promise.all([BeInvitation.findByIdAndUpdate(id, { status: "cancel" }, { new: true }), BeInvitation.findById(id).select("invitationId"), Profile.findOne({ userId }).select("nickNameDetails")])
  const { invitationId } = beInvitationId as { invitationId: string }
  if (!invitationId) {
    appErrorHandler(404, "No invitation found", next)
  }
  const invitation = await Invitation.findByIdAndUpdate(invitationId, { status: "cancel" }, { new: true })
  if (!beInvitation || !invitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    const { nickNameDetails } = profileWithUser as IPersonalInfo
    const { userId: startInviteUserId } = invitation
    const message = {
      title: "取消邀約",
      content: `${nickNameDetails.nickName}已取消邀約`
    }
    appSuccessHandler(200, "取消邀請成功", beInvitation, res)
    const notification = await createNotification(userId, startInviteUserId as unknown as Types.ObjectId, message, 1)
    if (!notification) {
      appErrorHandler(400, "取消邀請通知失敗", next)
    } else {
      const { _id } = notification as unknown as INotification
      sendNotification({ ...message, nickNameDetails }, startInviteUserId as unknown as Types.ObjectId, _id)
    }
  }
}

const rejectInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData
  const [beInvitation, beInvitationId, profileWithUser] = await Promise.all([BeInvitation.findByIdAndUpdate(id, { status: "reject" }, { new: true }), BeInvitation.findById(id).select("invitationId"), Profile.findOne({ userId }).select("nickNameDetails")])
  if (!beInvitationId || !beInvitationId.invitationId) {
    appErrorHandler(404, "No invitation found", next)
  }
  const { invitationId } = beInvitationId as { invitationId: string }
  const invitation = await Invitation.findByIdAndUpdate(invitationId, { status: "reject" }, { new: true })
  if (!invitation || !beInvitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    const { nickNameDetails } = profileWithUser as IPersonalInfo
    const { userId: startInviteUserId } = invitation
    const message = {
      title: "拒絕邀約",
      content: `${nickNameDetails.nickName}已拒絕邀約`
    }
    appSuccessHandler(200, "拒絕邀請成功", invitation, res)
    const notification = await createNotification(userId, startInviteUserId as unknown as Types.ObjectId, message, 1)
    if (!notification) {
      appErrorHandler(400, "取消邀請通知失敗", next)
    } else {
      const { _id } = notification as unknown as INotification
      sendNotification({ ...message, nickNameDetails }, startInviteUserId as unknown as Types.ObjectId, _id)
    }
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
  const [invitation, profileWithUser] = await Promise.all([Invitation.findByIdAndUpdate(invitationId, { status: "accept" }, { new: true }), Profile.findOne({ userId }).select("nickNameDetails")])
  if (!invitation || !beInvitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    const { nickNameDetails } = profileWithUser as IPersonalInfo
    const { userId: startInviteUserId } = invitation
    const message = {
      title: "接受邀約",
      content: `${nickNameDetails.nickName}已接受邀約`
    }

    appSuccessHandler(200, "接受邀請成功", invitation, res)
    const notification = await createNotification(userId, startInviteUserId as unknown as Types.ObjectId, message, 1)
    if (!notification) {
      appErrorHandler(400, "取消邀請通知失敗", next)
    } else {
      const { _id } = notification as unknown as INotification
      sendNotification({ ...message, nickNameDetails }, startInviteUserId as unknown as Types.ObjectId, _id)
    }
  }
}
const deleteBeInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData
  const beInvitationId = await BeInvitation.findById(id).select("invitationId")
  const { invitationId } = beInvitationId as { invitationId: string }
  const [invitation, beInvitation, profileWithUser] = await Promise.all([Invitation.findByIdAndUpdate(invitationId, { status: "cancel" }, { new: true }), BeInvitation.findByIdAndDelete(id), Profile.findOne({ userId }).select("nickNameDetails")])
  if (!beInvitation || !invitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    const { nickNameDetails } = profileWithUser as IPersonalInfo
    const { userId: startInviteUserId } = invitation
    const message = {
      title: "取消邀約",
      content: `${nickNameDetails.nickName}已取消邀約`
    }
    appSuccessHandler(200, "刪除成功", beInvitation, res)
    const notification = await createNotification(userId, startInviteUserId as unknown as Types.ObjectId, message, 1)
    if (!notification) {
      appErrorHandler(400, "取消邀請通知失敗", next)
    } else {
      const { _id } = notification as unknown as INotification
      sendNotification({ ...message, nickNameDetails }, startInviteUserId as unknown as Types.ObjectId, _id)
    }
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

const getWhoInvitationListWithAggregation = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { pageSize, page, sort } = req.query as { pageSize?: string, page?: string, sort?: string }
  // 檢查是否有傳入pageSize和pageNumber，若無則設定預設值
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, page)

  const { userId } = req.user as LoginResData

  const [totalCount, beInvitations] = await Promise.all([BeInvitation.countDocuments({ invitedUserId: userId }), getBeInvitationListWithAggregation(userId, sort, parsedPageNumber, parsedPageSize)])
  if (!beInvitations || beInvitations.length === 0) {
    appSuccessHandler(200, "沒有邀請", { BeInvitations: [] }, res)
  }
  const pagination = {
    page: parsedPageNumber,
    perPage: parsedPageSize,
    totalCount
  }
  const response = {
    beInvitations,
    pagination
  }
  appSuccessHandler(200, "查詢成功", response, res)
}
export { getWhoInvitationList, getWhoInvitationById, cancelBeInvitation, rejectInvitation, acceptInvitation, deleteBeInvitation, finishBeInvitationDating, getWhoInvitationListWithAggregation }

async function getBeInvitationListByIdWithAggregation (userId: mongoose.Types.ObjectId | undefined, id: string) {
  return await BeInvitation.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "profiles",
        localField: "userId",
        foreignField: "userId",
        as: "profileByUser"
      }
    },
    {
      $lookup: {
        from: "matchlistselfsettings",
        localField: "userId",
        foreignField: "userId",
        as: "matchListSelfSettingByUser"
      }
    },
    {
      $lookup: {
        from: "profiles",
        pipeline: [
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId)
            }
          },
          {
            $project: {
              unlockComment: 1
            }
          }
        ],
        as: "profileByUserId"
      }
    },
    {
      $unwind: {
        path: "$profileByUser",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: "$matchListSelfSettingByUser",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        isUnlock: {
          $in: [{ $toString: "$userId" }, { $ifNull: [{ $arrayElemAt: ["$profileByUserId.unlockComment", 0] }, []] }]
        }
      }
    },
    {
      $project: {
        profileByInvitedUser: 0,
        profileByInvitedUserId: 0,
        profileByUserId: 0,
        "profileByUser._id": 0,
        "profileByUser.userId": 0,
        "profileByUser.unlockComment": 0,
        "profileByUser.photoDetails._id": 0,
        "profileByUser.introDetails._id": 0,
        "profileByUser.nickNameDetails._id": 0,
        "profileByUser.incomeDetails._id": 0,
        "profileByUser.lineDetails._id": 0,
        "profileByUser.jobDetails._id": 0,
        "profileByUser.companyDetails._id": 0,
        "profileByUser.exposureSettings._id": 0,
        "profileByUser.createdAt": 0,
        "profileByUser.updatedAt": 0,
        "matchListSelfSettingByUser._id": 0,
        "matchListSelfSettingByUser.userId": 0,
        "matchListSelfSettingByUser.createdAt": 0,
        "matchListSelfSettingByUser.updatedAt": 0
      }
    }
  ])
}

async function getBeInvitationListWithAggregation (userId: mongoose.Types.ObjectId | undefined, sort: string | undefined, parsedPageNumber: number, parsedPageSize: number) {
  return await BeInvitation.aggregate([
    // invitedUserId是string
    { $match: { invitedUserId: userId } },
    { $sort: { updatedAt: sort === "desc" ? -1 : 1 } },
    { $skip: (parsedPageNumber - 1) * parsedPageSize },
    { $limit: parsedPageSize },
    {
      $lookup: {
        from: "profiles",
        localField: "userId",
        foreignField: "userId",
        as: "profileByUser"
      }
    },
    {
      $lookup: {
        from: "profiles",
        pipeline: [
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId)
            }
          },
          {
            $project: {
              unlockComment: 1
            }
          }
        ],
        as: "profileByUserId"
      }
    },
    {
      $lookup: {
        from: "matchlistselfsettings",
        localField: "userId",
        foreignField: "userId",
        as: "matchListSelfSettingByUser"
      }
    },
    {
      $lookup: {
        from: "collections",
        pipeline: [
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId)
            }
          },
          {
            $project: {
              collectedUserId: 1
            }
          }
        ],
        as: "collection"
      }
    },
    {
      $unwind: {
        path: "$profileByUser",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: "$matchListSelfSettingByUser",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        isUnlock: {
          $in: [{ $toString: "$userId" }, { $ifNull: [{ $arrayElemAt: ["$profileByUserId.unlockComment", 0] }, []] }]
        },
        isCollected: {
          $in: [{ $toString: "$userId" }, {
            $map: {
              input: "$collection",
              as: "col",
              in: { $toString: "$$col.collectedUserId" }
            }
          }]
        },
        profileByUser: { $ifNull: ["$profileByUser", { message: "找不到邀請者" }] },
        matchListSelfSettingByUser: { $ifNull: ["$matchListSelfSettingByUser", { message: "找不到邀請者" }] }
      }
    },
    {
      $project: {
        // collection: 0,
        // profileByInvitedUser: 0,
        // profileByInvitedUserId: 0,
        "profileByUser._id": 0,
        "profileByUser.userId": 0,
        "profileByUser.unlockComment": 0,
        "profileByUser.photoDetails._id": 0,
        "profileByUser.introDetails._id": 0,
        "profileByUser.nickNameDetails._id": 0,
        "profileByUser.incomeDetails._id": 0,
        "profileByUser.lineDetails._id": 0,
        "profileByUser.jobDetails._id": 0,
        "profileByUser.companyDetails._id": 0,
        "profileByUser.exposureSettings._id": 0,
        "profileByUser.userStatus._id": 0,
        "profileByUser.createdAt": 0,
        "profileByUser.updatedAt": 0,
        "matchListSelfSettingByUser._id": 0,
        "matchListSelfSettingByUser.userId": 0,
        "matchListSelfSettingByUser.createdAt": 0,
        "matchListSelfSettingByUser.updatedAt": 0
      }
    }
  ])
}
