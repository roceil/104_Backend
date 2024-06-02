import { type NextFunction, type Request, type Response } from "express"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { type LoginResData } from "@/types/login"
import { MatchList } from "@/models/matchList"
import { matchListOption } from "@/models/matchListOption"

export const editMatchList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { matchList } = req.body

  if (!matchList) {
    appErrorHandler(400, "缺少配對設定", next)
  }
  if (!userId) {
    appErrorHandler(400, "缺少使用者Id", next)
  }

  const matchListData = await MatchList
    .findOneAndUpdate({ userId }, { $set: matchList }, { new: true })

  if (!matchListData) {
    appErrorHandler(400, "尚未新建配對設定，編輯配對設定失敗", next)
  } else {
    appSuccessHandler(201, "編輯配對設定成功", matchListData, res)
  }
}

export const getMatchList = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const matchListData = await MatchList.findOne({ userId })

  if (!matchListData) {
    const newMatchList = new MatchList({ userId })
    await newMatchList.save()
    appSuccessHandler(200, "預設配對設定", newMatchList, res)
  } else {
    appSuccessHandler(200, "取得配對設定", matchListData, res)
  }
}

export const getMatchListOptions = async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const options = await matchListOption.find({})
  const result: Record<string, Record<string, string>> = {}
  options.forEach((option) => {
    result[option.type] = option.options
  })

  appSuccessHandler(200, "取得配對設定選項", result, res)
}
