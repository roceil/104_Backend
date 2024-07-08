import { type NextFunction, type Request, type Response } from "express"
import { Collection } from "@/models/collection"
import { Invitation } from "@/models/invitation"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { type LoginResData } from "@/types/login"
import checkMissingFields from "@/utils/checkMissingFields"
import { checkPageSizeAndPageNumber } from "@/utils/checkControllerParams"
import mongoose from "mongoose"
interface InvitationList {
  invitedUserId: string
  status: string
}
interface ICollectionItem {
  _id: string
  personalInfo: {
    username: string
    email: string
    gender?: string
    birthday?: string
    _id: string
  }
  isSubscribe: boolean
  points: number
  resetPasswordToken: string
  isActive: boolean
  blockedUsers: string[]
  notifications: string[]
  createdAt: string
  updatedAt: string
}
/**
 * 取得所有收藏
 */
const getCollections = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const collections = await Collection.find().populate("user").populate("collectedUsers")

  if (!collections || collections.length === 0) {
    appErrorHandler(404, "查無收藏", next)
    return
  }

  appSuccessHandler(200, "查詢成功", collections, res)
}

/**
 * 取得使用者的收藏 By userId
 */
const getCollectionsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { page, pageSize, sort } = req.query as { page?: string, pageSize?: string, sort?: string }
  // 檢查是否有傳入pageSize和pageNumber，若無則設定預設值
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, page)
  const dateSort = sort === "desc" ? "-updatedAt" : "updatedAt"
  // 取得使用者邀請列表來判斷收藏的對象中是否有邀請中的使用者
  const rowInvitationList = await Invitation.find({ userId }).select("invitedUserId status")
  if (!rowInvitationList || rowInvitationList.length === 0) {
    appErrorHandler(404, "查無邀請", next)
    return
  }
  const invitationList: InvitationList[] = rowInvitationList.map((item) => {
    return {
      invitedUserId: item.invitedUserId,
      status: item.status
    }
  })
  const invitationListConfig: Record<string, string> = {}
  invitationList.forEach((item) => {
    invitationListConfig[item.invitedUserId] = item.status
  })
  const [totalCount, collections] = await Promise.all([Collection.countDocuments({ userId }), Collection.find({ userId }).sort(dateSort).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize).populate("collectedUsers")])
  const parseCollections = JSON.parse(JSON.stringify(collections))
  if (parseCollections.length === 0) {
    appSuccessHandler(200, "查詢成功", collections, res)
  }
  if (!collections || collections.length === 0) {
    appErrorHandler(404, "查無收藏", next)
    return
  }
  const collectionsWithInvitationStatus = parseCollections.map((item: ICollectionItem) => {
    const { _id } = item
    const collectedUserId = _id
    const status = invitationListConfig[collectedUserId] ?? "notInvited"
    return {
      ...item,
      status
    }
  }
  )
  const pagination = {
    page: parsedPageNumber,
    perPage: parsedPageSize,
    totalCount
  }
  const response = {
    collections: collectionsWithInvitationStatus,
    pagination
  }
  appSuccessHandler(200, "查詢成功", response, res)
}

/**
 * 新增收藏
 */
const addCollection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { collectedUserId } = req.body
  // 檢查使用者是否自己收藏自己
  if (userId === collectedUserId) {
    appErrorHandler(400, "不能收藏自己", next)
    return
  }

  // 檢查必填欄位
  const missingFields = checkMissingFields({ collectedUserId })
  if (missingFields.length > 0) {
    const missingFieldsMsg = `缺少必要欄位: ${missingFields.join(", ")}`
    appErrorHandler(400, missingFieldsMsg, next)
    return
  }

  // 檢查是否已經存在相同的收藏
  const existingCollectionUserId = await Collection.findOne({ userId, collectedUserId })
  if (existingCollectionUserId) {
    appErrorHandler(400, "已經存在相同的收藏", next)
    return
  }
  const collection = await Collection.create({ userId, collectedUserId })
  if (!collection) {
    appErrorHandler(500, "收藏失敗", next)
    return
  }
  appSuccessHandler(201, "收藏成功", collection, res)
}
/**
 * 刪除收藏 By userId 和 collectedUserId
 */
const deleteCollectionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // 從認證使用者資訊中取得 userId
  const { id } = req.params
  if (!id) {
    appErrorHandler(400, "需要收藏列表id", next)
    return
  }

  // 驗證被收藏的用戶是否存在
  // const collectedUser = await User.findById(collectedUserId);
  // if (!collectedUser) {
  //   appErrorHandler(404, "被收藏的使用者不存在", next);
  //   return;
  // }

  // 尋找並刪除收藏記錄
  const collection = await Collection.findByIdAndDelete(id)

  if (!collection) {
    appErrorHandler(404, "查無收藏", next)
    return
  }

  appSuccessHandler(200, "取消收藏成功", collection, res)
}

const getCollectionsByUserIdAggregation = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { page, pageSize, sort } = req.query as { page?: string, pageSize?: string, sort?: string }
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, page)
  const [totalCount] = await Promise.all([Collection.countDocuments({ userId })])
  const collections = await getCollectionByUserIdWithAggregation(userId, sort, parsedPageNumber, parsedPageSize)
  const pagination = {
    page: parsedPageNumber,
    perPage: parsedPageSize,
    totalCount
  }
  const response = {
    collections,
    pagination
  }
  appSuccessHandler(200, "查詢成功", response, res)
}
const getCollectionWithUserDetail = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData
  if (!id) {
    appErrorHandler(400, "需要收藏列表id", _next)
    return
  }
  const collection = await getCollectionDetailProfileWithAggregation(id, userId)
  if (!collection) {
    appErrorHandler(404, "查無收藏", _next)
    return
  }
  appSuccessHandler(200, "查詢成功", collection[0], res)
}

export { getCollections, getCollectionsByUserId, addCollection, deleteCollectionById, getCollectionsByUserIdAggregation, getCollectionWithUserDetail }
async function getCollectionByUserIdWithAggregation (userId: mongoose.Types.ObjectId | undefined, sort: string | undefined, parsedPageNumber: number, parsedPageSize: number) {
  return await Collection.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $sort: { updatedAt: sort === "desc" ? -1 : 1 } },
    { $skip: (parsedPageNumber - 1) * parsedPageSize },
    { $limit: parsedPageSize },
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
        from: "users",
        localField: "collectedUserId",
        foreignField: "_id",
        as: "collectedUsers"
      }
    },
    {
      $lookup: {
        from: "profiles",
        localField: "collectedUserId",
        foreignField: "userId",
        as: "personalDataInfo"
      }
    },
    {
      $lookup: {
        from: "invitations",
        // let暫存collectedUserId並轉呈sting，因為collectedUserId是string
        let: { collectedUserId: { $toString: "$collectedUserId" } },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] },
                  { $eq: ["$invitedUserId", "$$collectedUserId"] }
                ]
              }
            }
          }
        ],
        as: "invitation"
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
      $unwind: {
        path: "$personalDataInfo",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: "$collectedUsers",
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
        collectedUsers: {
          $mergeObjects: ["$collectedUsers", "$personalDataInfo"]
        }
      }
    },
    // 展開invitation
    {
      $unwind: {
        path: "$invitation",
        preserveNullAndEmptyArrays: true
      }
    },
    // 如果invitation不存在則設定invitation為notInvite
    {
      $addFields: {
        invitation: { $ifNull: ["$invitation", { status: "notInvite" }] },
        isUnlock: {
          $in: [{ $toString: "$collectedUserId" }, { $ifNull: [{ $arrayElemAt: ["$profileByUserId.unlockComment", 0] }, []] }]
        }
      }
    },
    {
      $project: {
        "collectedUsers.personalInfo.password": 0,
        "collectedUsers._id": 0,
        "collectedUsers.personalInfo._id": 0,
        "collectedUsers.isSubscribe": 0,
        "collectedUsers.points": 0,
        "collectedUsers.resetPasswordToken": 0,
        "collectedUsers.isActive": 0,
        "collectedUsers.blockedUsers": 0,
        "collectedUsers.notifications": 0,
        "collectedUsers.createdAt": 0,
        "collectedUsers.updatedAt": 0,
        "collectedUsers.userId": 0,
        "collectedUsers.photoDetails._id": 0,
        "collectedUsers.introDetails._id": 0,
        "collectedUsers.nickNameDetails._id": 0,
        "collectedUsers.lineDetails._id": 0,
        "collectedUsers.jobDetails._id": 0,
        "collectedUsers.chatRecord": 0,
        "collectedUsers.companyDetails._id": 0,
        "collectedUsers.incomeDetails._id": 0,
        "collectedUsers.phoneDetails._id": 0,
        "collectedUsers.unlockComment": 0,
        "collectedUsers.exposureSettings": 0,
        "collectedUsers.userStatus._id": 0,
        "collectedUsers.userStatus.isMatch": 0,
        "invitations._id": 0,
        "invitations.userId": 0,
        "invitations.invitedUserId": 0,
        "invitations.message": 0,
        "invitations.date": 0,
        "invitations.createdAt": 0,
        "invitations.updatedAt": 0,
        personalDataInfo: 0,
        userId: 0,
        "matchListSelfSettingByUser._id": 0,
        "matchListSelfSettingByUser.userId": 0,
        "matchListSelfSettingByUser.createdAt": 0,
        "matchListSelfSettingByUser.updatedAt": 0
      }
    }
  ])
}
async function getCollectionDetailProfileWithAggregation (id: string, userId: mongoose.Types.ObjectId | undefined) {
  return await Collection.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
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
        from: "users",
        localField: "collectedUserId",
        foreignField: "_id",
        as: "collectedUsers"
      }
    },
    {
      $lookup: {
        from: "profiles",
        localField: "collectedUserId",
        foreignField: "userId",
        as: "personalDataInfo"
      }
    },
    {
      $lookup: {
        from: "invitations",
        let: { collectedUserId: { $toString: "$collectedUserId" } },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$userId", "$$collectedUserId"] },
                  { $eq: ["$invitedUserId", "$$collectedUserId"] }
                ]
              }
            }
          }
        ],
        as: "invitation"
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
      $unwind: {
        path: "$personalDataInfo",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: "$collectedUsers",
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
        collectedUsers: {
          $mergeObjects: ["$collectedUsers", "$personalDataInfo"]
        }
      }
    },
    {
      $unwind: {
        path: "$invitation",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        invitation: { $ifNull: ["$invitation", { status: "notInvite" }] },
        isUnlock: {
          $in: [{ $toString: "$collectedUserId" }, { $ifNull: [{ $arrayElemAt: ["$profileByUserId.unlockComment", 0] }, []] }]
        }
      }
    },
    {
      $project: {
        "collectedUsers.personalInfo.password": 0,
        "collectedUsers._id": 0,
        "collectedUsers.personalInfo._id": 0,
        "collectedUsers.isSubscribe": 0,
        "collectedUsers.points": 0,
        "collectedUsers.resetPasswordToken": 0,
        "collectedUsers.isActive": 0,
        "collectedUsers.blockedUsers": 0,
        "collectedUsers.notifications": 0,
        "collectedUsers.createdAt": 0,
        "collectedUsers.updatedAt": 0,
        "collectedUsers.userId": 0,
        "collectedUsers.photoDetails._id": 0,
        "collectedUsers.introDetails._id": 0,
        "collectedUsers.nickNameDetails._id": 0,
        "collectedUsers.lineDetails._id": 0,
        "collectedUsers.jobDetails._id": 0,
        "collectedUsers.chatRecord": 0,
        "collectedUsers.companyDetails._id": 0,
        "collectedUsers.incomeDetails._id": 0,
        "collectedUsers.phoneDetails._id": 0,
        "collectedUsers.unlockComment": 0,
        "collectedUsers.exposureSettings": 0,
        "collectedUsers.userStatus._id": 0,
        "collectedUsers.userStatus.isMatch": 0,
        "invitations._id": 0,
        "invitations.userId": 0,
        "invitations.invitedUserId": 0,
        "invitations.message": 0,
        "invitations.date": 0,
        "invitations.createdAt": 0,
        "invitations.updatedAt": 0,
        personalDataInfo: 0,
        "matchListSelfSettingByUser._id": 0,
        "matchListSelfSettingByUser.userId": 0,
        "matchListSelfSettingByUser.createdAt": 0,
        "matchListSelfSettingByUser.updatedAt": 0
      }
    }
  ])
}
