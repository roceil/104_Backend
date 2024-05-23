import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { postInvitation, getInvitationList, getWhoInvitationList, getInvitationById, cancelInvitation, rejectInvitation, acceptInvitation, deleteInvitation } from "@/controllers/invitationController"
import isAuth from "@/middlewares/isAuth"
import { postInvitationSwagger, getInvitationListSwagger, getWhoInvitationListSwagger, getInvitationByIdSwagger, cancelInvitationSwagger, rejectInvitationSwagger, acceptInvitationSwagger, deleteInvitationSwagger } from "@/middlewares/swaggerConfig/invitationSwagger"
export { postInvitation, getInvitationList, getInvitationById, cancelInvitation, rejectInvitation, acceptInvitation, deleteInvitation }
const router = Router()

router.post("/invite", postInvitationSwagger, isAuth, asyncErrorHandler(postInvitation) as RequestHandler)
router.get("/i-invite-who-list", getInvitationListSwagger, isAuth, asyncErrorHandler(getInvitationList) as RequestHandler)
router.get("/who-invite-me-list", getWhoInvitationListSwagger, isAuth, asyncErrorHandler(getWhoInvitationList) as RequestHandler)
router.get("/i-invite-who/:id", getInvitationByIdSwagger, isAuth, asyncErrorHandler(getInvitationById) as RequestHandler)
router.put("/i-invite-who/:id/cancel", cancelInvitationSwagger, isAuth, asyncErrorHandler(cancelInvitation) as RequestHandler)
router.put("/i-invite-who/:id/reject", rejectInvitationSwagger, isAuth, asyncErrorHandler(rejectInvitation) as RequestHandler)
router.put("/i-invite-who/:id/accept", acceptInvitationSwagger, isAuth, asyncErrorHandler(acceptInvitation) as RequestHandler)
router.delete("/i-invite-who/:id", deleteInvitationSwagger, isAuth, asyncErrorHandler(deleteInvitation) as RequestHandler)
export default router
