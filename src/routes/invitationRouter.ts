import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { postInvitation, getInvitationById, cancelInvitation, deleteInvitation, finishInvitationDating, getInvitationListAggregation } from "@/controllers/invitationController"
import isAuth from "@/middlewares/isAuth"
import { postInvitationSwagger, getInvitationByIdSwagger, cancelInvitationSwagger, deleteInvitationSwagger, finishInvitationDatingSwagger, getInvitationListAggregationSwagger } from "@/middlewares/swaggerConfig/invitationSwagger"
const router = Router()
router.post("/invite", postInvitationSwagger, isAuth, asyncErrorHandler(postInvitation) as RequestHandler)
// router.get("/i-invite-who-list", getInvitationListSwagger, isAuth, asyncErrorHandler(getInvitationList) as RequestHandler)
router.get("/i-invite-who-list", getInvitationListAggregationSwagger, isAuth, asyncErrorHandler(getInvitationListAggregation) as RequestHandler)
router.get("/i-invite-who/:id", getInvitationByIdSwagger, isAuth, asyncErrorHandler(getInvitationById) as RequestHandler)
router.put("/i-invite-who/:id/cancel", cancelInvitationSwagger, isAuth, asyncErrorHandler(cancelInvitation) as RequestHandler)
router.put("/i-invite-who/:id/finishDating", finishInvitationDatingSwagger, isAuth, asyncErrorHandler(finishInvitationDating) as RequestHandler)
router.delete("/i-invite-who/:id", deleteInvitationSwagger, isAuth, asyncErrorHandler(deleteInvitation) as RequestHandler)
export default router
