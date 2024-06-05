import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { postComment, getCommentILiftList, getCommentList, getCommentById, getCommentByIdAndUserId, putComment, deleteComment } from "@/controllers/commentController"
import isAuth from "@/middlewares/isAuth"
import { checkUnlockComment } from "@/middlewares/checkUnlockComment"
import { asyncHandler } from "@/middlewares/asyncHandler"
import { postCommentSwagger, getCommentListSwagger, getCommentILiftListSwagger, getCommentByIdSwagger, putCommentSwagger, deleteCommentSwagger } from "@/middlewares/swaggerConfig/commentSwagger"
const router = Router()
router.post("/comment-i-left", postCommentSwagger, isAuth, asyncErrorHandler(postComment) as RequestHandler)
router.get("/comment-i-left-list", getCommentILiftListSwagger, isAuth, asyncErrorHandler(getCommentILiftList) as RequestHandler)
router.get("/comment-list/:id", getCommentByIdSwagger, isAuth, asyncHandler(checkUnlockComment), asyncErrorHandler(getCommentById) as RequestHandler)
router.get("/comment-list", getCommentListSwagger, isAuth, asyncErrorHandler(getCommentList) as RequestHandler)
router.get("/comment-i-left/:id", getCommentByIdSwagger, isAuth, asyncErrorHandler(getCommentByIdAndUserId) as RequestHandler)
router.put("/comment-i-left/:id", putCommentSwagger, isAuth, asyncErrorHandler(putComment) as RequestHandler)
router.delete("/comment-i-left/:id", deleteCommentSwagger, isAuth, asyncErrorHandler(deleteComment) as RequestHandler)
export default router
