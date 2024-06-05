import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import { Profile } from "@/models/profile"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
export const checkUnlockComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const { userId } = req.user as LoginResData
  const profile = await Profile.findOne({ userId }).select("unlockComment")
  if (!profile) {
    appErrorHandler(404, "用戶不存在", next)
    return
  }
  const { unlockComment } = profile
  if (unlockComment.length === 0) {
    appSuccessHandler(200, "尚未解鎖任何評價", unlockComment, res)
  } else {
    if (unlockComment.includes(id)) {
      next()
    } else {
      appErrorHandler(400, "尚未解鎖此評價", next)
    }
  }
}
