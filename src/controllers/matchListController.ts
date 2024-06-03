import { type NextFunction, type Request, type Response } from "express"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { type LoginResData } from "@/types/login"
import { MatchList, MatchListSelfSetting } from "@/models/matchList"
import { matchListOption } from "@/models/matchListOption"
import { User } from "@/models/user"

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

export const findUsersByMultipleConditions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const matchListData = await MatchList.findOne({ userId })

  if (!matchListData) {
    appErrorHandler(400, "尚未新建配對設定，查詢配對失敗", next)
  } else {
    // 該用戶的配對設定
    const { personalInfo, workInfo, blacklist } = matchListData

    // 從每個人自身條件MatchListSelfSetting找出符合 該用戶的配對設定
    const users = await MatchListSelfSetting.find({
      // "userId": { $ne: userId },
      $and: [
        { "personalInfo.age": personalInfo.age },
        { "personalInfo.gender": personalInfo.gender },
        { "personalInfo.height": personalInfo.height },
        { "personalInfo.weight": personalInfo.weight },
        { "personalInfo.socialCircle": { $in: personalInfo.socialCircle, $nin: [blacklist.socialCircle] } },
        { "personalInfo.activities": { $in: personalInfo.activities, $nin: blacklist.activities } },
        { "personalInfo.location": personalInfo.location },
        { "personalInfo.education": personalInfo.education },
        { "personalInfo.liveWithParents": personalInfo.liveWithParents },
        { "personalInfo.religion": personalInfo.religion },
        { "personalInfo.smoking": personalInfo.smoking },
        { "workInfo.occupation": { $in: [workInfo.occupation], $nin: [blacklist.occupation] } },
        { "workInfo.industry": { $in: workInfo.industry, $nin: blacklist.industry } },
        { "workInfo.workLocation": workInfo.workLocation },
        { "workInfo.expectedSalary": workInfo.expectedSalary }
      ]
    })

    const userIds = users.map(user => user.userId)

    const usersData = await User.find({ _id: { $in: userIds } })

    if (users.length === 0) {
      appSuccessHandler(200, "查無符合條件的使用者", [], res)
    } else {
      appSuccessHandler(200, "查詢配對結果成功", usersData, res)
    }
  }
}

// MatchListSelfSetting
export const editMatchListSelfSetting = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { matchList } = req.body

  if (!matchList) {
    appErrorHandler(400, "缺少配對設定", next)
  }
  if (!userId) {
    appErrorHandler(400, "缺少使用者Id", next)
  }

  const matchListData = await MatchListSelfSetting
    .findOneAndUpdate({ userId }, { $set: matchList }, { new: true })

  if (!matchListData) {
    appErrorHandler(400, "尚未新建配對設定，編輯配對設定失敗", next)
  } else {
    appSuccessHandler(201, "編輯配對設定成功", matchListData, res)
  }
}

export const getMatchListSelfSetting = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const matchListData = await MatchListSelfSetting.findOne({ userId })

  if (!matchListData) {
    const newMatchList = new MatchListSelfSetting({ userId })
    await newMatchList.save()
    appSuccessHandler(200, "預設配對設定", newMatchList, res)
  } else {
    appSuccessHandler(200, "取得配對設定", matchListData, res)
  }
}
