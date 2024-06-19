import { type NextFunction, type Request, type Response } from "express"
import { Collection } from "@/models/collection"
import { Invitation } from "@/models/invitation"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { type LoginResData } from "@/types/login"
import checkMissingFields from "@/utils/checkMissingFields"
import { checkPageSizeAndPageNumber } from "@/utils/checkControllerParams"
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

export { getCollections, getCollectionsByUserId, addCollection, deleteCollectionById }
