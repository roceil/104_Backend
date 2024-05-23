import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { postInvitation, getInvitationList, getInvitationById, cancelInvitation, rejectInvitation, acceptInvitation, deleteInvitation } from "@/controllers/invitationController"
import isAuth from "@/middlewares/isAuth"
const router = Router()

router.post("/invite", isAuth, asyncErrorHandler(postInvitation) as RequestHandler)
router.get("/i-invite-who-list", isAuth, asyncErrorHandler(getInvitationList) as RequestHandler)
router.get("/i-invite-who/:id", isAuth, asyncErrorHandler(getInvitationById) as RequestHandler)
router.put("/i-invite-who/:id/cancel", isAuth, asyncErrorHandler(cancelInvitation) as RequestHandler)
router.put("/i-invite-who/:id/reject", isAuth, asyncErrorHandler(rejectInvitation) as RequestHandler)
router.put("/i-invite-who/:id/accept", isAuth, asyncErrorHandler(acceptInvitation) as RequestHandler)
router.delete("/i-invite-who/:id", isAuth, asyncErrorHandler(deleteInvitation) as RequestHandler)
export default router
