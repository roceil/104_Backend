import { type RequestHandler, Router } from "express"
import loginController from "@/controllers/loginController"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"

const router = Router()

router.post("/sign-up", asyncErrorHandler(loginController.signUp) as RequestHandler)

router.post("/login", asyncErrorHandler(loginController.login) as RequestHandler)

router.post("/verify-token", asyncErrorHandler(loginController.verifyToken) as RequestHandler)

export default router
