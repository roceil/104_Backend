import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import {
  editMatchList, getMatchList, getMatchListOptions, findUsersByMultipleConditions, editMatchListSelf,
  getMatchListSelf
} from "@/controllers/matchListController"
import {
  editMatchListSwagger, getMatchListSwagger, getMatchListOptionSwagger, findUsersByMultipleConditionsSwagger,
  editMatchListSelfSwagger,
  getMatchListSelfSwagger
} from "@/middlewares/swaggerConfig/matchListSwagger"

const router = Router()

router.get("/match-list/options", getMatchListOptionSwagger, asyncErrorHandler(getMatchListOptions) as RequestHandler)

router.put("/match-list", editMatchListSwagger, isAuth, asyncErrorHandler(editMatchList) as RequestHandler)

router.get("/match-list", getMatchListSwagger, isAuth, asyncErrorHandler(getMatchList) as RequestHandler)

router.get("/match-result", findUsersByMultipleConditionsSwagger, isAuth, asyncErrorHandler(findUsersByMultipleConditions) as RequestHandler)

// matchListSelf
router.put("/match-list-self", editMatchListSelfSwagger, isAuth, asyncErrorHandler(editMatchListSelf) as RequestHandler)

router.get("/match-list-self", getMatchListSelfSwagger, isAuth, asyncErrorHandler(getMatchListSelf) as RequestHandler)

export default router
