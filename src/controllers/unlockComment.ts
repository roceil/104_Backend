import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { User } from "@/models/user"
import { Profile } from "@/models/profile"
import appErrorHandler from "@/utils/appErrorHandler"

const unlockComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData
  const userPoint = await User.findById(userId).select("point")
  if (typeof userPoint !== "number" || !userPoint) {
    appErrorHandler(404, "無法取解鎖評價，請稍後在試", next)
    return
  }
  if (userPoint >= 5) {
    const userPointConsume = await User.findByIdAndUpdate(userId, { $inc: { point: -5 } }, { new: true })
    if (!userPointConsume) {
      appErrorHandler(404, "無法取解鎖評價，請稍後在試", next)
      return
    }
    const profile = await Profile.findByIdAndUpdate(userId, { $push: { unlockComment: id } }, { new: true })
    if (!profile) {
      appErrorHandler(404, "無法取解鎖評價，請稍後在試", next)
    }
  }
}

export { unlockComment }
