import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import {
  editMatchList, getMatchList, getMatchListOptions, findUsersByMultipleConditions, editMatchListSelfSetting,
  getMatchListSelfSetting
} from "@/controllers/matchListController"
import {
  editMatchListSwagger, getMatchListSwagger, getMatchListOptionSwagger, findUsersByMultipleConditionsSwagger,
  editMatchListSelfSettingSwagger,
  getMatchListSelfSettingSwagger
} from "@/middlewares/swaggerConfig/matchListSwagger"

const router = Router()

router.get("/match-list/options", getMatchListOptionSwagger, asyncErrorHandler(getMatchListOptions) as RequestHandler)

router.put("/match-list", editMatchListSwagger, isAuth, asyncErrorHandler(editMatchList) as RequestHandler)

router.get("/match-list", getMatchListSwagger, isAuth, asyncErrorHandler(getMatchList) as RequestHandler)

router.get("/match-result", findUsersByMultipleConditionsSwagger, isAuth, asyncErrorHandler(findUsersByMultipleConditions) as RequestHandler)

// MatchListSelfSetting
router.put("/match-list-self", editMatchListSelfSettingSwagger, isAuth, asyncErrorHandler(editMatchListSelfSetting) as RequestHandler)

router.get("/match-list-self", getMatchListSelfSettingSwagger, isAuth, asyncErrorHandler(getMatchListSelfSetting) as RequestHandler)

export default router
