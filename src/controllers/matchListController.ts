import { type NextFunction, type Request, type Response } from "express"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { type LoginResData } from "@/types/login"
import { MatchList, MatchListSelf } from "@/models/matchList"
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
    // const { personalInfo, workInfo, blacklist } = matchListData

    const users = await MatchListSelf.find({
      // "userId": { $ne: userId },
      // "personalInfo.age": personalInfo.age,
      // "personalInfo.gender": personalInfo.gender,
      // "personalInfo.height": personalInfo.height,
      // "personalInfo.weight": personalInfo.weight,
      // "personalInfo.socialCircle": personalInfo.socialCircle,
      // "personalInfo.activites": { $in: personalInfo.activites },
      // "personalInfo.location": personalInfo.location,
      // "personalInfo.education": personalInfo.education,
      // "personalInfo.liveWithParents": personalInfo.liveWithParents,
      // "personalInfo.religion": personalInfo.religion,
      // "personalInfo.smoking": personalInfo.smoking,
      // "workInfo.occupation": workInfo.occupation,
      // "workInfo.industry": { $in: workInfo.industry },
      // "workInfo.workLocation": workInfo.workLocation,
      // "workInfo.expectedSalary": workInfo.expectedSalary,
      // "blacklist.occupation": blacklist.occupation,
      // "blacklist.industry": { $in: blacklist.industry },
      // "blacklist.socialCircle": blacklist.socialCircle,
      // "blacklist.activites": { $in: blacklist.activites },
      // "blacklist.smokingOptions": blacklist.smokingOptions
    })

    const userIds = users.map(user => user.userId)

    const usersData = await User.find({ _id: { $in: userIds } })

    if (users.length === 0) {
      appSuccessHandler(200, "查無符合條件的使用者", [], res)
    } else {
      appSuccessHandler(200, "查詢配對成功", usersData, res)
    }
  }
}

// MatchListSelf
export const editMatchListSelf = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const { matchList } = req.body

  if (!matchList) {
    appErrorHandler(400, "缺少配對設定", next)
  }
  if (!userId) {
    appErrorHandler(400, "缺少使用者Id", next)
  }

  const matchListData = await MatchListSelf
    .findOneAndUpdate({ userId }, { $set: matchList }, { new: true })

  if (!matchListData) {
    appErrorHandler(400, "尚未新建配對設定，編輯配對設定失敗", next)
  } else {
    appSuccessHandler(201, "編輯配對設定成功", matchListData, res)
  }
}

export const getMatchListSelf = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const matchListData = await MatchListSelf.findOne({ userId })

  if (!matchListData) {
    const newMatchList = new MatchListSelf({ userId })
    await newMatchList.save()
    appSuccessHandler(200, "預設配對設定", newMatchList, res)
  } else {
    appSuccessHandler(200, "取得配對設定", matchListData, res)
  }
}
