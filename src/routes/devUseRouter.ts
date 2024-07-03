import { type RequestHandler, Router } from "express"
import isAuth from "@/middlewares/isAuth"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { deleteUnreferencedMatchListSelfSettingsSwagger } from "@/middlewares/swaggerConfig/devUseSwagger"
import { deleteUnreferencedMatchListSelfSettings } from "@/controllers/devUseController"

const router = Router()

router.put("/delete-self-setting", deleteUnreferencedMatchListSelfSettingsSwagger, isAuth, asyncErrorHandler(deleteUnreferencedMatchListSelfSettings) as RequestHandler)

export default router
