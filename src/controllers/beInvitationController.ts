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
import mongoose from "mongoose"
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
  const beInvitation = await BeInvitation.findByIdAndUpdate(id, { status: "reject" }, { new: true })
  const beInvitationId = await BeInvitation.findById(id).select("invitationId")
  if (!beInvitationId || !beInvitationId.invitationId) {
    appErrorHandler(404, "No invitation found", next)
  }
  const { invitationId } = beInvitationId as { invitationId: string }
  const invitation = await Invitation.findByIdAndUpdate(invitationId, { status: "reject" }, { new: true })
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

const getWhoInvitationListWithAggregation = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { pageSize, page, sort } = req.query as { pageSize?: string, page?: string, sort?: string }
  const dateSort = sort === "desc" ? "-updatedAt" : "updatedAt"
  // 檢查是否有傳入pageSize和pageNumber，若無則設定預設值
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, page)

  const { userId } = req.user as LoginResData

  const [totalCount, beInvitations] = await Promise.all([BeInvitation.countDocuments({ invitedUserId: userId }), getBeInvitationListWithAggregation(userId, dateSort, parsedPageNumber, parsedPageSize)])
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

function getBeInvitationListWithAggregation (userId: mongoose.Types.ObjectId | undefined, sort: string | undefined, parsedPageNumber: number, parsedPageSize: number) {
  return BeInvitation.aggregate([
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
        as: "profileByInvitedUserId"
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
          $cond: {
            if: {
              $in: ["$userId", { $ifNull: ["$profileByInvitedUserId.unlockComment", []] }]
            },
            then: true,
            else: false
          }
        },
        isCollected: {
          $cond: {
            if: {
              $in: ["$userId", { $ifNull: ["$collection.collectedUserId", []] }]
            },
            then: true,
            else: false
          }
        },
        profileByUser: { $ifNull: ["$profileByUser", { message: "找不到邀請者" }] },
        matchListSelfSettingByUser: { $ifNull: ["$matchListSelfSettingByUser", { message: "找不到邀請者" }] }
      }
    },
    {
      $project: {
        collection: 0,
        profileByInvitedUser: 0,
        profileByInvitedUserId: 0,
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
