import { type NextFunction, type Request, type Response } from "express"

import appSuccessHandler from "@/utils/appSuccessHandler"
import appErrorHandler from "@/utils/appErrorHandler"

import { User } from "@/models/user"
import { MatchListSelfSetting } from "@/models/matchListSelfSetting"

const deleteUnreferencedMatchListSelfSettings = async (_req: Request, _res: Response, _next: NextFunction): Promise<void> => {
  try {
    // 獲取所有 User 的 _id
    const userIds = await User.find().distinct("_id")
    // console.warn("userIds", userIds)

    // 計算要刪除的文檔數量
    const countToDelete = await MatchListSelfSetting.countDocuments({
      userId: { $nin: userIds }
    })

    // 顯示需刪除的id
    const idsToDelete = await MatchListSelfSetting.find({
      userId: { $nin: userIds }
    }).distinct("userId")
    console.warn("idsToDelete", idsToDelete)

    // 刪除不存在對應 User 的 MatchListSelfSettings
    await MatchListSelfSetting.deleteMany({
      userId: { $nin: userIds }
    })

    appSuccessHandler(200, "Deleted unreferenced.", `Deleted： ${countToDelete}`, _res)
  } catch (error) {
    console.error("Error deleting unreferenced MatchListSelfSettings:", error)

    appErrorHandler(500, "Error deleting unreferenced MatchListSelfSettings.", _next)
  }
}

export { deleteUnreferencedMatchListSelfSettings }
