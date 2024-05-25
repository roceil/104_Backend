import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { getWhoInvitationList, getWhoInvitationById, cancelBeInvitation, rejectInvitation, acceptInvitation, deleteBeInvitation } from "@/controllers/beInvitationController"
import isAuth from "@/middlewares/isAuth"
import { getWhoInvitationListSwagger, rejectInvitationSwagger, cancelBeInvitationSwagger, acceptInvitationSwagger, deleteBeInvitationSwagger } from "@/middlewares/swaggerConfig/beInvitationSwagger"
const router = Router()

router.get("/who-invite-me-list", getWhoInvitationListSwagger, isAuth, asyncErrorHandler(getWhoInvitationList) as RequestHandler)
router.get("/who-invite-me/:id", isAuth, asyncErrorHandler(getWhoInvitationById) as RequestHandler)
router.put("/who-invite-me/:id/reject", rejectInvitationSwagger, isAuth, asyncErrorHandler(rejectInvitation) as RequestHandler)
router.put("/who-invite-me/:id/accept", acceptInvitationSwagger, isAuth, asyncErrorHandler(acceptInvitation) as RequestHandler)
router.put("/who-invite-me/:id/cancel", cancelBeInvitationSwagger, isAuth, asyncErrorHandler(cancelBeInvitation) as RequestHandler)
router.delete("/who-invite-me/:id", deleteBeInvitationSwagger, isAuth, asyncErrorHandler(deleteBeInvitation) as RequestHandler)
export default router
