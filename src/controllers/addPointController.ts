import { type NextFunction, type Request, type Response } from "express"
import { User } from "@/models/user"
import { type LoginResData } from "@/types/login"
import appSuccessHandler from "@/utils/appSuccessHandler"
import appErrorHandler from "@/utils/appErrorHandler"

const addPoint = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (process.env.NODE_ENV !== "dev") {
    appErrorHandler(400, "此功能僅供開發環境使用", next)
    return
  }

  const { userId } = req.user as LoginResData
  const points = Number(req.params.point)
  if (!points) {
    appErrorHandler(400, "缺少點數", next)
    return
  }
  if (typeof points !== "number") {
    appErrorHandler(400, "點數格式錯誤", next)
    return
  }
  if (points <= 0) {
    appErrorHandler(400, "點數必須大於0", next)
    return
  }
  if (isNaN(points)) {
    appErrorHandler(400, "點數格式錯誤", next)
    return
  }
  const userPoint = await User.findByIdAndUpdate(userId, { $inc: { points } }, { new: true }).select("points -_id")
  if (!userPoint) {
    appErrorHandler(404, "無法取增加點數，請稍後在試", next)
    return
  }
  appSuccessHandler(200, "增加點數成功", userPoint, res)
}
export { addPoint }
