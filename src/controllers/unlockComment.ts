import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { User } from "@/models/user"
import { Profile } from "@/models/profile"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"

const unlockComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData

  const isCorrectUserId = await User.findById(id)
  if (!isCorrectUserId) {
    appErrorHandler(404, "解鎖用戶ID不存在", next)
    return
  }

  const unlockComment = await Profile.findOne({ userId }).select("unlockComment")
  const isUnlock = unlockComment?.unlockComment.includes(id)
  if (isUnlock) {
    appSuccessHandler(200, "已解鎖過評價", "", res)
    return
  }
  const userPoint = await User.findById(userId).select("points -_id")
  if (!userPoint) {
    appErrorHandler(404, "無法取解鎖評價，請稍後在試", next)
    return
  }
  const { points } = userPoint
  if (points >= 5) {
    const userPointConsume = await User.findByIdAndUpdate(userId, { $inc: { points: -5 } }, { new: true })
    if (!userPointConsume) {
      appErrorHandler(404, "無法取解鎖評價，請稍後在試", next)
      return
    }
    const profile = await Profile.findOneAndUpdate({ userId }, { $push: { unlockComment: id } }, { new: true })
    if (!profile) {
      appErrorHandler(404, "無法取解鎖評價，請稍後在試", next)
    } else {
      appSuccessHandler(200, "解鎖評價成功", "", res)
    }
  }
}

export { unlockComment }
