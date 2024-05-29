import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { BlackList } from "@/models/blackList"
import { Profile } from "@/models/profile"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { checkPageSizeAndPageNumber } from "@/utils/checkControllerParams"
const postBlackList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { lockedUserId } = req.body
  if (!lockedUserId) {
    appErrorHandler(400, "缺少被封鎖者id", next)
    return
  }
  const isExistList = await BlackList.findOne({ userId })
  if (!isExistList) {
    const blackList = await BlackList.create({ userId, lockedUserId: [lockedUserId] })
    if (!blackList) {
      appErrorHandler(400, "封鎖失敗", next)
    } else {
      appSuccessHandler(201, "封鎖成功", blackList, res)
    }
  } else {
    const isExistList = await BlackList.findOne({ userId })
    if (isExistList && isExistList.lockedUserId.includes(lockedUserId)) {
      appErrorHandler(400, "已經封鎖過此用戶", next)
    } else {
      const blackList = await BlackList.findOneAndUpdate({ userId }, { $push: { lockedUserId } }, { new: true })
      if (!blackList) {
        appErrorHandler(400, "封鎖失敗", next)
      } else {
        appSuccessHandler(200, "封鎖成功", blackList, res)
      }
    }
  }
}

const getBlackList = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const blackList = await BlackList.find({ userId })
  const { pageSize, pageNumber } = req.query as { pageSize?: string, pageNumber?: string }
  const { parsedPageNumber, parsedPageSize } = checkPageSizeAndPageNumber(pageSize, pageNumber)
  if (!blackList) {
    appSuccessHandler(200, "沒有黑名單", { data: [] }, res)
  } else {
    const blackProfileList = await Profile.find({ userId: { $in: blackList[0].lockedUserId } }).skip((parsedPageNumber - 1) * parsedPageSize).limit(parsedPageSize)
    appSuccessHandler(200, "查詢成功", blackProfileList, res)
  }
}

const deleteBlackListById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { id } = req.params
  if (!id) {
    appErrorHandler(400, "缺少被封鎖者id", next)
    return
  }
  const blackList = await BlackList.findOneAndUpdate({ userId }, { $pull: { lockedUserId: id } }, { new: true })
  if (!blackList) {
    appErrorHandler(404, "黑名單不存在", next)
  } else {
    appSuccessHandler(200, "刪除成功", blackList, res)
  }
}
export { postBlackList, getBlackList, deleteBlackListById }
