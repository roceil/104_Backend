import { type NextFunction, type Request, type Response } from "express"

import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import { type LoginResData } from "@/types/login"

import { MatchList } from "@/models/matchList"
import { MatchListSelfSetting } from "@/models/matchListSelfSetting"
import { matchListOption } from "@/models/matchListOption"
import { User } from "@/models/user"
import { BlackList } from "@/models/blackList"
import { Invitation } from "@/models/invitation"
import { Collection } from "@/models/collection"
import { Profile } from "@/models/profile"
import { Comment } from "@/models/comment"
import { BeInvitation } from "@/models/beInvitation"

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
  const { page, sort } = req.query
  const selectedSort: string = sort === "" ? "-updatedAt" : sort as string

  const matchListData = await MatchList.findOne({ userId })

  if (page === undefined || Number(page) < 1) {
    appErrorHandler(400, "頁數需要大於 1", next)
  }

  if (!matchListData) {
    appErrorHandler(400, "尚未新建配對設定，查詢配對失敗", next)
  } else {
    // 該用戶的配對設定
    const {
      personalInfo, workInfo, blacklist
    } = matchListData

    // 使用相同的查询条件
    const queryCondition = {
      userId: { $ne: userId },
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
    }

    // 計算總筆數
    const totalCount = await MatchListSelfSetting.find({ userId: { $ne: userId } }).countDocuments(queryCondition)
    const perPage = 6

    // 從每個人自身條件MatchListSelfSetting找出符合 該用戶的配對設定
    // 可用陣列 sort 來排序 profile.userStatus.commentScore
    const resultUsers = await MatchListSelfSetting.find(
      queryCondition
    ).sort(selectedSort).skip(((Number(page) ?? 1) - 1) * perPage).limit(perPage)

    if (resultUsers.length === 0) {
      appSuccessHandler(200, "查無符合條件的使用者", [], res)
    } else {
      const resultUserIds = resultUsers.map(user => user.userId)

      const resultUsersData = await Promise.all(resultUserIds.map(async (resultId) => {
        // 取得每個用戶的資料
        const resultUserInfo = await User.findById(resultId)

        // 取得每個用戶的封鎖狀態
        const blackList = await BlackList.findOne({ userId })
        const lockedUserIds = blackList ? blackList.lockedUserId.map(id => id.toString()) : []
        /* eslint-disable */
        const isLocked = lockedUserIds.includes(resultId.toString() as unknown as string) ?? false

        // 取得卡片用戶的邀約狀態
        const invitations = await Invitation.find({
          userId, // 邀請者
          invitedUserId: resultId // 被邀請者
        })
        const invitationStatus = invitations.length > 0 ? invitations[0].status : "not invited"
        const invitationTableId = invitations[0]?._id

        // 取得登入者被邀約的狀態 (invitations / beInvitations 都是用invitedUserId存被邀請者)
        const beInvitations = await BeInvitation.find({
          userId: resultId,
          invitedUserId: userId
        })
        const beInvitationStatus = beInvitations.length > 0 ? beInvitations[0].status : "not invited"
        const beInvitationTableId = beInvitations[0]?._id

        // 取得每個用戶的個人條件和工作條件
        const matchListSelfSetting = await MatchListSelfSetting.findOne({
          userId: resultId
        })

        // 取得每個用戶的收藏狀態
        const collection = await Collection.findOne({ userId, collectedUserId: resultId }, { isCollected: 1 })
        const isCollected = Boolean(collection)
        const collectionTableId = collection?._id

        // 取得每個用戶的評價狀態 和 被評價數量
        const hasComment = await Comment.findOne({ userId, commentedUserId: resultId }).countDocuments() > 0
        const beCommentCount = await Comment.find({ commentedUserId: resultId }).countDocuments() // userStatus.commentCount
        const commentTableId = await Comment.findOne({ userId, commentedUserId: resultId }).select("id").lean().then(doc => doc?._id)

        // 計算評分
        const comments = await Comment.find({ commentedUserId: resultId })
        const averageScore = comments.length > 0 ? (comments.reduce((acc, comment) => acc + comment.score, 0) / comments.length).toFixed(1) : 0
        await Profile.findOneAndUpdate({ userId: resultId }, {
          $set: {
            "userStatus.commentScore": averageScore,
            "userStatus.commentCount": beCommentCount
          }
        })

        // 取得每個用戶的 解鎖狀態 和 評分
        const profile = await Profile.findOne({ userId })
        const isUnlock = profile?.unlockComment.includes(resultId as unknown as string) ?? false
        // const unlockCommentIds = profile?.unlockComment ?? []

        // 取得每個用戶的評分 和 標籤 和 照片 和 暱稱 和 LineId 和 自我介紹
        const resultIdProfile = await Profile.findOne({ userId: resultId }).select("userStatus photoDetails nickNameDetails lineDetails introDetails tags").lean()

        return {
          userInfo: {
            ...resultUserInfo?.toObject()
          },
          matchListSelfSetting,
          profile: resultIdProfile,
          invitationStatus,
          isCollected,
          isLocked,
          isUnlock,
          hasComment,
          beCommentCount,
          beInvitationStatus,
          collectionTableId,
          invitationTableId,
          beInvitationTableId,
          commentTableId
        }
      }))

      // 分頁資訊
      const pagination = {
        page: Number(page) ?? 1,
        perPage,
        totalCount
      }

      // 將分頁資訊和查詢結果合併在一個物件中
      const response = {
        resultList: resultUsersData,
        pagination
      }

      appSuccessHandler(200, "查詢配對結果成功", response, res)
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
