import { type NextFunction, type Request, type Response } from "express"
import { Profile } from "@/models/profile"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
// 搜尋精選會員
const searchFeaturedUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const users = await Profile.find()
  if (!users || users.length === 0) {
    appErrorHandler(404, "No user found", next)
  } else {
    appSuccessHandler(200, "查詢成功", users, res)
  }
}

// 關鍵字搜尋
const keywordSearch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const users = await Profile.find()
  if (!users || users.length === 0) {
    appErrorHandler(404, "No user found", next)
  } else {
    appSuccessHandler(200, "查詢成功", users, res)
  }
}

export { searchFeaturedUser, keywordSearch }
