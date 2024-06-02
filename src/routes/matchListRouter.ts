import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import { editMatchList, getMatchList, getMatchListOptions } from "@/controllers/matchListController"
import { postMatchListSwagger, getMatchListSwagger, getMatchListOptionSwagger } from "@/middlewares/swaggerConfig/matchListSwagger"

const router = Router()

router.get("/match-list/options", getMatchListOptionSwagger, asyncErrorHandler(getMatchListOptions) as RequestHandler)

router.put("/match-list", postMatchListSwagger, isAuth, asyncErrorHandler(editMatchList) as RequestHandler)

router.get("/match-list", getMatchListSwagger, isAuth, asyncErrorHandler(getMatchList) as RequestHandler)

export default router
