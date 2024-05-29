import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { postBlackList, getBlackList, deleteBlackListById } from "@/controllers/blackListController"
import { postBlackListSwagger, getBlackListSwagger, deleteBlackListByIdSwagger } from "@/middlewares/swaggerConfig/blackListSwagger"
import isAuth from "@/middlewares/isAuth"

const router = Router()
router.post("/black-list", postBlackListSwagger, isAuth, asyncErrorHandler(postBlackList) as RequestHandler)
router.get("/black-list", getBlackListSwagger, isAuth, asyncErrorHandler(getBlackList) as RequestHandler)
router.delete("/black-list/:id", deleteBlackListByIdSwagger, isAuth, asyncErrorHandler(deleteBlackListById) as RequestHandler)
export default router
