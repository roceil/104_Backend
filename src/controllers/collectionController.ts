import { type NextFunction, type Request, type Response } from "express"
import { Collection } from "@/models/collection"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { type Types } from "mongoose"
import { type LoginResData } from "@/types/login"
import checkMissingFields from "@/utils/checkMissingFields"
import { User } from "@/models/user"

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

  const collections = await Collection.find({ userId }).populate("user").populate("collectedUsers")

  if (!collections || collections.length === 0) {
    appErrorHandler(404, "查無收藏", next)
    return
  }

  appSuccessHandler(200, "查詢成功", collections, res)
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
  const existingCollection = await Collection.findOne({ userId, collectedUserId })
  if (existingCollection) {
    appErrorHandler(400, "已經存在相同的收藏", next)
    return
  }

  // 建立新的收藏記錄
  const collection = new Collection({
    userId,
    collectedUserId
  })

  await collection.save()

  if (!collection) {
    appErrorHandler(500, "收藏建立失敗", next)
    return
  }

  appSuccessHandler(201, "收藏建立成功", collection, res)
}
/**
 * 刪除收藏 By userId 和 collectedUserId
 */
const deleteCollectionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // 從認證使用者資訊中取得 userId
  const { userId } = req.user as LoginResData
  const { collectedUserId } = req.body

  if (!collectedUserId) {
    appErrorHandler(400, "請提供被收藏的使用者id", next)
    return
  }

  // 驗證被收藏的用戶是否存在
  // const collectedUser = await User.findById(collectedUserId);
  // if (!collectedUser) {
  //   appErrorHandler(404, "被收藏的使用者不存在", next);
  //   return;
  // }

  // 尋找並刪除收藏記錄
  const collection = await Collection.findOneAndDelete({ userId, collectedUserId })

  if (!collection) {
    appErrorHandler(404, "查無收藏", next)
    return
  }

  appSuccessHandler(200, "取消收藏成功", collection, res)
}

export { getCollections, getCollectionsByUserId, addCollection, deleteCollectionById }
