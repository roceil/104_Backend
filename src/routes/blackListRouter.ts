import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { postBlackList, getBlackList, deleteBlackListById } from "@/controllers/blackListController"
import isAuth from "@/middlewares/isAuth"

const router = Router()
router.post("/black-list", isAuth, asyncErrorHandler(postBlackList) as RequestHandler)
router.get("/black-list", isAuth, asyncErrorHandler(getBlackList) as RequestHandler)
router.delete("/black-list/:id", isAuth, asyncErrorHandler(deleteBlackListById) as RequestHandler)
export default router
