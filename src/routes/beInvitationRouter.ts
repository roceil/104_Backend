import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { getWhoInvitationById, cancelBeInvitation, rejectInvitation, acceptInvitation, deleteBeInvitation, finishBeInvitationDating, getWhoInvitationListWithAggregation } from "@/controllers/beInvitationController"
import isAuth from "@/middlewares/isAuth"
import { getBeInvitationByIdSwagger, rejectInvitationSwagger, cancelBeInvitationSwagger, acceptInvitationSwagger, deleteBeInvitationSwagger, finishBeInvitationDatingSwagger, getWhoInvitationListByAggregationSwagger } from "@/middlewares/swaggerConfig/beInvitationSwagger"
const router = Router()

// router.get("/who-invite-me-list", getWhoInvitationListSwagger, isAuth, asyncErrorHandler(getWhoInvitationList) as RequestHandler)
router.get("/who-invite-me-list", getWhoInvitationListByAggregationSwagger, isAuth, asyncErrorHandler(getWhoInvitationListWithAggregation) as RequestHandler)
router.get("/who-invite-me/:id", isAuth, getBeInvitationByIdSwagger, asyncErrorHandler(getWhoInvitationById) as RequestHandler)
router.put("/who-invite-me/:id/reject", rejectInvitationSwagger, isAuth, asyncErrorHandler(rejectInvitation) as RequestHandler)
router.put("/who-invite-me/:id/accept", acceptInvitationSwagger, isAuth, asyncErrorHandler(acceptInvitation) as RequestHandler)
router.put("/who-invite-me/:id/cancel", cancelBeInvitationSwagger, isAuth, asyncErrorHandler(cancelBeInvitation) as RequestHandler)
router.put("/who-invite-me/:id/finishDating", finishBeInvitationDatingSwagger, isAuth, asyncErrorHandler(finishBeInvitationDating) as RequestHandler)
router.delete("/who-invite-me/:id", deleteBeInvitationSwagger, isAuth, asyncErrorHandler(deleteBeInvitation) as RequestHandler)
export default router
