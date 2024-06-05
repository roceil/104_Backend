import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import { unlockComment } from "@/controllers/unlockComment"
import { unlockCommentSwagger } from "@/middlewares/swaggerConfig/unlockCommentSwagger"
const router = Router()
router.put("/unlock-comment/:id", unlockCommentSwagger, isAuth, asyncErrorHandler(unlockComment) as RequestHandler)

export default router
