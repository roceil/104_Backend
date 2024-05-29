import { BlackList } from "@/models/blackList"
import { type NextFunction } from "express"
import { type Types } from "mongoose"
import appErrorHandler from "@/utils/appErrorHandler"

export async function isInBlackList (userId: Types.ObjectId | undefined | string, invitedUserId: Types.ObjectId | undefined | string, next: NextFunction): Promise<boolean> {
  if (!userId || !invitedUserId) {
    appErrorHandler(404, "黑名單檢查失敗，需要邀請者與被邀請者id", next)
  }
  const blackList = await BlackList.find({ lockedUserId: { $in: [invitedUserId, userId] } })
  if (blackList.length === 0) return false
  const blackListIds = blackList[0].lockedUserId
  if (blackListIds.includes(userId as Types.ObjectId) || blackListIds.includes(invitedUserId as Types.ObjectId)) {
    return true
  } else {
    return false
  }
}
