import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { getWhoInvitationList, getWhoInvitationById, cancelBeInvitation, rejectInvitation, acceptInvitation, deleteBeInvitation, finishBeInvitationDating } from "@/controllers/beInvitationController"
import isAuth from "@/middlewares/isAuth"
import { getWhoInvitationListSwagger, getBeInvitationByIdSwagger, rejectInvitationSwagger, cancelBeInvitationSwagger, acceptInvitationSwagger, deleteBeInvitationSwagger, finishBeInvitationDatingSwagger } from "@/middlewares/swaggerConfig/beInvitationSwagger"
const router = Router()

router.get("/who-invite-me-list", getWhoInvitationListSwagger, isAuth, asyncErrorHandler(getWhoInvitationList) as RequestHandler)
router.get("/who-invite-me/:id", isAuth, getBeInvitationByIdSwagger, asyncErrorHandler(getWhoInvitationById) as RequestHandler)
router.put("/who-invite-me/:id/reject", rejectInvitationSwagger, isAuth, asyncErrorHandler(rejectInvitation) as RequestHandler)
router.put("/who-invite-me/:id/accept", acceptInvitationSwagger, isAuth, asyncErrorHandler(acceptInvitation) as RequestHandler)
router.put("/who-invite-me/:id/cancel", cancelBeInvitationSwagger, isAuth, asyncErrorHandler(cancelBeInvitation) as RequestHandler)
router.put("/who-invite-me/:id/finishDating", finishBeInvitationDatingSwagger, isAuth, asyncErrorHandler(finishBeInvitationDating) as RequestHandler)
router.delete("/who-invite-me/:id", deleteBeInvitationSwagger, isAuth, asyncErrorHandler(deleteBeInvitation) as RequestHandler)
export default router
