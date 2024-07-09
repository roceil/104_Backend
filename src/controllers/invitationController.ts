import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { Invitation } from "@/models/invitation"
import { BeInvitation } from "@/models/beInvitation"
import { Profile, type IPersonalInfo } from "@/models/profile"
import { Collection } from "@/models/collection"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { checkPageSizeAndPageNumber } from "@/utils/checkControllerParams"
import { createNotification } from "./notificationsController"
import { isInBlackList } from "@/utils/blackListHandler"
import { type IInvitations } from "@/types/invitationInterface"
import mongoose from "mongoose"
import { sendNotification } from "@/services/notificationWS"
import { type INotification } from "@/models/notification"
interface ParsedInvitation {
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
// import { eraseProperty } from "@/utils/responseDataHandler"
const postInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  if (!userId) {
    appErrorHandler(400, "缺少使用者Id", next)
    return
  }
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
  if (!userId || !invitedUserId) {
    appErrorHandler(400, "缺少使用者Id", next)
  }
  // 檢查邀約人是否在被邀約人的黑名單中
  if (await isInBlackList(userId, invitedUserId, next)) {
    appErrorHandler(400, "邀請失敗", next)
    return
  }
  // 檢查是否已經邀請過
  const isExistInvitation = await Invitation.findOne({ userId, invitedUserId })
  if (isExistInvitation) {
    // 若邀請狀態為pending或accept，則不可再次邀請
    if (isExistInvitation.status === "pending" || isExistInvitation.status === "accept") {
      appErrorHandler(400, "已邀請過", next)
    } else { // 若邀請狀態為cancel reject，則可再次邀請
      const [invitationAgain, beInvitation, profileWithUser] = await Promise.all([Invitation.findOneAndUpdate({ userId, invitedUserId }, { message, status: "pending" }, { new: true }), BeInvitation.findOneAndUpdate({ userId, invitedUserId }, { message, status: "pending" }, { new: true }), Profile.findOne({ userId }).select("nickNameDetails")
      ])
      if (!invitationAgain || !beInvitation) {
        appErrorHandler(400, "再次邀請失敗", next)
        return
      }
      const notificationCreated = await createNotification(userId, invitedUserId, message, 1)
      if (!notificationCreated) {
        appErrorHandler(400, "再次邀請通知失敗", next)
        return
      } else {
        const { _id } = notificationCreated as unknown as INotification
        const { nickNameDetails } = profileWithUser as IPersonalInfo
        const { userId } = req.user as LoginResData
        sendNotification({ title: message.title, content: message.content, nickNameDetails, userId }, invitedUserId, _id)
        appSuccessHandler(200, "再次邀請成功", invitationAgain, res)
      }
    }
  }
  const [invitation, profileWithUser] = await Promise.all([Invitation.create({ userId, invitedUserId, message }), Profile.findOne({ userId }).select("nickNameDetails")])
  const notificationCreated = await createNotification(userId, invitedUserId, message, 1)
  if (!invitation || !notificationCreated) {
    appErrorHandler(400, "邀請失敗", next)
  } else {
    if (!invitation.id) {
      appErrorHandler(400, "邀請失敗", next)
    }
    const beInvitation = await BeInvitation.create({ userId, invitedUserId, message, invitationId: invitation.id })
    if (!beInvitation) {
      appErrorHandler(400, "邀請失敗", next)
    } else {
      const { nickNameDetails } = profileWithUser as IPersonalInfo
      const { userId } = req.user as LoginResData
      const { invitedUserId } = beInvitation
      const { _id } = notificationCreated as unknown as INotification
      sendNotification({ title: message.title, content: message.content, nickNameDetails, userId }, invitedUserId, _id)
      appSuccessHandler(201, "邀請成功", invitation, res)
    }
  }
}
const getInvitationList = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { pageSize, page, sort } = req.query as { pageSize?: string, page?: string, sort?: string }
  // 檢查是否有傳入pageSize和pageNumber，若無則設定預設值
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, page)
  const dateSort = sort === "desc" ? "-updatedAt" : "updatedAt"
  const { userId } = req.user as LoginResData
  const [profile, collection] = await Promise.all([Profile.findOne({ userId }).select("unlockComment"), Collection.find({ userId }).select("collectedUserId")])
  const unlockComment = profile?.unlockComment ?? []
  const collectionList = collection.map(doc => doc.id.toString()) ?? []
  const [totalCount, invitationList] = await Promise.all([Invitation.countDocuments({ userId }), Invitation.find({ userId }).sort(dateSort).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize).populate({
    path: "profileByInvitedUser",
    select: "photoDetails introDetails nickNameDetails incomeDetails lineDetails jobDetails companyDetails tags exposureSettings userStatus"
  }).populate({
    path: "matchListSelfSettingByInvitedUser",
    select: "searchDataBase personalInfo workInfo"
  })])
  const invitationsLength = await Invitation.countDocuments({ userId })
  if (!invitationList || invitationList.length === 0) {
    appSuccessHandler(200, "沒有邀請", { invitations: [] }, res)
  } else {
    const parseInvitationList = JSON.parse(JSON.stringify(invitationList))
    const invitations: ParsedInvitation[] = parseInvitationList.map((invitation: ParsedInvitation) => {
      let isUnlock = false
      if (unlockComment.length !== 0) {
        isUnlock = unlockComment.includes(invitation.invitedUserId)
      }

      let isCollected = false
      if (collectionList.length !== 0) {
        isCollected = collectionList.includes(invitation.invitedUserId)
      }
      return { ...invitation, isUnlock, isCollected }
    })
    const pagination = {
      page: parsedPageNumber,
      perPage: parsedPageSize,
      totalCount
    }
    const response = {
      invitations,
      invitationsLength,
      pagination
    }
    appSuccessHandler(200, "查詢成功", response, res)
  }
}
const getInvitationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData
  const invitation = await getInvitationListByIdWithAggregation(userId, id)

  if (!invitation || invitation.length === 0) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "查詢成功", invitation[0], res)
  }
}
const cancelInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData
  const [invitation, profileWithUser] = await Promise.all([Invitation.findByIdAndUpdate(id, { status: "cancel" }, { new: true }), Profile.findOne({ userId }).select("nickNameDetails")])
  const beInvitation = await BeInvitation.findOneAndUpdate({ userId, invitationId: id }, { status: "cancel" }, { new: true })
  if (!invitation || !beInvitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    const { invitedUserId } = beInvitation
    const { nickNameDetails } = profileWithUser as IPersonalInfo
    const { userId } = req.user as LoginResData
    const message = {
      title: "取消邀約",
      content: `${nickNameDetails.nickName}已取消邀約`
    }
    appSuccessHandler(200, "取消邀請成功", invitation, res)
    const notification = await createNotification(userId, invitedUserId, message, 1)
    if (!notification) {
      appErrorHandler(400, "取消邀請通知失敗", next)
    } else {
      const { _id } = notification as unknown as INotification
      sendNotification({ ...message, nickNameDetails, userId }, invitedUserId, _id)
    }
  }
}
const deleteInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData
  const [invitation, profileWithUser] = await Promise.all([Invitation.findByIdAndDelete(id), Profile.findOne({ userId }).select("nickNameDetails")])
  const beInvitation = await BeInvitation.findOneAndUpdate({ invitationId: id }, { status: "cancel" }, { new: true })
  if (!invitation || !beInvitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    const { nickNameDetails } = profileWithUser as IPersonalInfo
    const { userId } = req.user as LoginResData
    const { invitedUserId } = beInvitation
    const message = {
      title: "取消邀約",
      content: `${nickNameDetails.nickName}已取消邀約`
    }
    appSuccessHandler(200, "刪除成功", invitation, res)
    const notification = await createNotification(userId, invitedUserId, message, 1)
    if (!notification) {
      appErrorHandler(400, "取消邀請通知失敗", next)
    } else {
      const { _id } = notification as unknown as INotification
      sendNotification({ ...message, nickNameDetails, userId }, invitedUserId, _id)
    }
  }
}
const finishInvitationDating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const invitation = await Invitation.findByIdAndUpdate(id, { isFinishDating: true, status: "finishDating" }, { new: true })
  if (!invitation) {
    appErrorHandler(404, "No invitation found", next)
  } else {
    appSuccessHandler(200, "已完成約會", invitation, res)
  }
}

const getInvitationListAggregation = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { pageSize, page, sort } = req.query as { pageSize?: string, page?: string, sort?: string }
  // 檢查是否有傳入pageSize和pageNumber，若無則設定預設值
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, page)
  const { userId } = req.user as LoginResData
  const [totalCount, invitations] = await Promise.all([Invitation.countDocuments({ userId }), getInvitationListWithAggregation(userId, sort, parsedPageNumber, parsedPageSize)])
  if (!invitations || invitations.length === 0) {
    appSuccessHandler(200, "沒有邀請", { invitations: [] }, res)
  } else {
    const pagination = {
      page: parsedPageNumber,
      perPage: parsedPageSize,
      totalCount
    }
    const response = {
      invitations,
      pagination
    }
    appSuccessHandler(200, "查詢成功", response, res)
  }
}

export { postInvitation, getInvitationList, getInvitationById, cancelInvitation, deleteInvitation, finishInvitationDating, getInvitationListAggregation }
async function getInvitationListByIdWithAggregation (userId: mongoose.Types.ObjectId | undefined, id: string) {
  return await Invitation.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "profiles",
        let: { invitedUserId: { $toObjectId: "$invitedUserId" } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$userId", "$$invitedUserId"]
              }
            }
          }
        ],
        as: "profileByInvitedUser"
      }
    },
    {
      $lookup: {
        from: "matchlistselfsettings",
        let: { invitedUserId: { $toObjectId: "$invitedUserId" } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$userId", "$$invitedUserId"]
              }
            }
          }
        ],
        as: "matchListSelfSettingByInvitedUser"
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
        path: "$profileByInvitedUser",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: "$matchListSelfSettingByInvitedUser",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        isUnlock: {
          $in: ["$invitedUserId", { $ifNull: [{ $arrayElemAt: ["$profileByUserId.unlockComment", 0] }, []] }]
        }
      }
    },
    {
      $project: {
        profileByUserId: 0,
        "profileByInvitedUser._id": 0,
        "profileByInvitedUser.userId": 0,
        "profileByInvitedUser.photoDetails._id": 0,
        "profileByInvitedUser.introDetails._id": 0,
        "profileByInvitedUser.nickNameDetails._id": 0,
        "profileByInvitedUser.incomeDetails._id": 0,
        "profileByInvitedUser.lineDetails._id": 0,
        "profileByInvitedUser.jobDetails._id": 0,
        "profileByInvitedUser.companyDetails._id": 0,
        "profileByInvitedUser.unlockComment": 0,
        "profileByInvitedUser.exposureSettings._id": 0,
        "profileByInvitedUser.createdAt": 0,
        "profileByInvitedUser.updatedAt": 0,
        "matchListSelfSettingByInvitedUser._id": 0,
        "matchListSelfSettingByInvitedUser.userId": 0,
        "matchListSelfSettingByInvitedUser.createdAt": 0,
        "matchListSelfSettingByInvitedUser.updatedAt": 0
      }
    }
  ])
}

function getInvitationListWithAggregation (userId: mongoose.Types.ObjectId | undefined, sort: string | undefined, parsedPageNumber: number, parsedPageSize: number): mongoose.Aggregate<IInvitations[]> {
  return Invitation.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $sort: { updatedAt: sort === "desc" ? -1 : 1 } },
    { $skip: (parsedPageNumber - 1) * parsedPageSize },
    { $limit: parsedPageSize },
    {
      $lookup: {
        from: "profiles",
        // let暫存invitedUserId並轉呈ObjectId，因為invitedUserId是ObjectId
        let: { invitedUserId: { $toObjectId: "$invitedUserId" } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$userId", "$$invitedUserId"]
              }
            }
          }
        ],
        as: "profileByInvitedUser"
      }
    },
    {
      $unwind: {
        path: "$profileByInvitedUser",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "matchlistselfsettings",
        let: { invitedUserId: { $toObjectId: "$invitedUserId" } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$userId", "$$invitedUserId"]
              }
            }
          }
        ],
        as: "matchListSelfSettingByInvitedUser"
      }
    },
    {
      $unwind: {
        path: "$matchListSelfSettingByInvitedUser",
        preserveNullAndEmptyArrays: true
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
      $addFields: {
        isUnlock: {
          $in: ["$invitedUserId", { $ifNull: [{ $arrayElemAt: ["$profileByUserId.unlockComment", 0] }, []] }]
        },
        isCollected: {
          $in: ["$invitedUserId", {
            $map: {
              input: "$collection",
              as: "col",
              in: { $toString: "$$col.collectedUserId" }
            }
          }]
        },
        profileByInvitedUser: { $ifNull: ["$profileByInvitedUser", { message: "找不到被邀請者" }] },
        matchListSelfSettingByInvitedUser: { $ifNull: ["$matchListSelfSettingByInvitedUser", { message: "找不到被邀請者" }] }
      }
    },
    {
      $project: {
        collection: 0,
        profileByUserId: 0,
        "profileByInvitedUser._id": 0,
        "profileByInvitedUser.userId": 0,
        "profileByInvitedUser.photoDetails._id": 0,
        "profileByInvitedUser.introDetails._id": 0,
        "profileByInvitedUser.nickNameDetails._id": 0,
        "profileByInvitedUser.incomeDetails._id": 0,
        "profileByInvitedUser.lineDetails._id": 0,
        "profileByInvitedUser.jobDetails._id": 0,
        "profileByInvitedUser.companyDetails._id": 0,
        "profileByInvitedUser.unlockComment": 0,
        "profileByInvitedUser.exposureSettings._id": 0,
        "profileByInvitedUser.createdAt": 0,
        "profileByInvitedUser.updatedAt": 0,
        "matchListSelfSettingByInvitedUser._id": 0,
        "matchListSelfSettingByInvitedUser.userId": 0,
        "matchListSelfSettingByInvitedUser.createdAt": 0,
        "matchListSelfSettingByInvitedUser.updatedAt": 0
      }
    }
  ])
}
