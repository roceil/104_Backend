import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { postInvitation, getInvitationList, getInvitationById } from "@/controllers/invitationController"
import isAuth from "@/middlewares/isAuth"
const router = Router()

router.post("/invite", isAuth, asyncErrorHandler(postInvitation) as RequestHandler)
router.get("/i-invite-who-list", isAuth, asyncErrorHandler(getInvitationList) as RequestHandler)
router.get("/i-invite-who/:id", isAuth, asyncErrorHandler(getInvitationById) as RequestHandler)

export default router
