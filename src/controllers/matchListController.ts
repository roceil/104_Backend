import { type NextFunction, type Request, type Response } from "express"
// import { Types } from "mongoose"

import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { type LoginResData } from "@/types/login"
import { MatchList } from "@/models/matchList"
import { MatchListSelfSetting } from "@/models/matchListSelfSetting"
import { matchListOption } from "@/models/matchListOption"
import { User } from "@/models/user"

// import { Collection } from "@/models/collection"
import { BlackList } from "@/models/blackList"
import { Invitation } from "@/models/invitation"

export const editMatchList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const body = req.body

  if (!body) {
    appErrorHandler(400, "缺少配對設定", next)
  }
  if (!userId) {
    appErrorHandler(400, "缺少使用者Id", next)
  }

  const matchListData = await MatchList
    .findOneAndUpdate({ userId }, { $set: body }, { new: true })

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

  appSuccessHandler(200, "取得配對設定選項", options, res)
}

export const findUsersByMultipleConditions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const matchListData = await MatchList.findOne({ userId })

  if (!matchListData) {
    appErrorHandler(400, "尚未新建配對設定，查詢配對失敗", next)
  } else {
    // 該用戶的配對設定
    const {
      personalInfo, workInfo, blacklist
    } = matchListData

    // 從每個人自身條件MatchListSelfSetting找出符合 該用戶的配對設定
    const users = await MatchListSelfSetting.find({
      // "userId": { $ne: userId },
      $and: [
        { "personalInfo.age": personalInfo.age },
        { "personalInfo.gender": personalInfo.gender },
        { "personalInfo.height": personalInfo.height },
        { "personalInfo.weight": personalInfo.weight },
        { "personalInfo.location": personalInfo.location },
        { "personalInfo.education": personalInfo.education },
        { "personalInfo.liveWithParents": personalInfo.liveWithParents },
        { "personalInfo.religion": personalInfo.religion },
        { "personalInfo.socialCircle": personalInfo.socialCircle },
        { "personalInfo.activities": { $in: personalInfo.activities } },
        { "personalInfo.smoking": { $in: personalInfo.smoking, $nin: blacklist.banSmoking } }, // 剔除名單
        { "workInfo.occupation": { $in: workInfo.occupation, $nin: blacklist.banOccupation } },
        { "workInfo.industry": { $in: workInfo.industry, $nin: blacklist.banIndustry } },
        { "workInfo.expectedSalary": { $in: workInfo.expectedSalary, $nin: blacklist.banExpectedSalary } }
        // { "personalInfo.activities": { $all: personalInfo.activities } }, // 精準搜尋
      ]
    })

    if (users.length === 0) {
      appSuccessHandler(200, "查無符合條件的使用者", [], res)
    } else {
      const resultUserIds = users.map(user => user.userId)
      // const resultUsersData = await User.find({ _id: { $in: resultUserIds } })

      // 取得對方用戶的封鎖狀態
      const blackList = await BlackList.findOne({ userId })
      const lockedUserIds = blackList ? blackList.lockedUserId : []

      // 取得對方用戶的邀約狀態
      const invitations = await Invitation.find({
        userId, // 邀請者
        invitedUserId: { $in: resultUserIds } // 被邀請者
      })

      console.log("invitations", invitations)

      const invitationStatuses = invitations.reduce<Record<string, string>>((acc, invitation) => {
        /* eslint-disable-next-line */
        acc[invitation.userId.toString()] = invitation.status
        return acc
      }, {})

      // 將每個用戶的邀約狀態加入到返回的用戶資料中
      const resultUsersData = await Promise.all(resultUserIds.map(async (id) => {
        const user = await User.findById(id)
        return {
          ...user?.toObject(),
          /* eslint-disable-next-line */
          isLocked: lockedUserIds.map(id => id.toString()).includes(id.toString()),
          /* eslint-disable-next-line */
          invitationStatus: invitationStatuses[id.toString()] || "no invitation"
        }
      }))

      appSuccessHandler(200, "查詢配對結果成功", resultUsersData, res)
    }
  }
}

// MatchListSelfSetting
export const editMatchListSelfSetting = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData
  const body = req.body

  if (!body) {
    appErrorHandler(400, "缺少配對設定", next)
  }
  if (!userId) {
    appErrorHandler(400, "缺少使用者Id", next)
  }

  const matchListData = await MatchListSelfSetting
    .findOneAndUpdate({ userId }, { $set: body }, { new: true })

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
