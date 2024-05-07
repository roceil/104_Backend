import { type RequestHandler, Router, type Handler } from "express"
import loginController from "@/controllers/loginController"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"

const router = Router()

router.post("/sign-up", asyncErrorHandler(loginController.signUp) as RequestHandler)

router.post("/login", asyncErrorHandler(loginController.login) as RequestHandler)

router.put("/reset-password", isAuth as Handler, asyncErrorHandler(loginController.resetPassword) as RequestHandler)

router.post("/forget-password", asyncErrorHandler(loginController.forgetPassword) as RequestHandler)

router.get("/verify", isAuth as Handler, asyncErrorHandler(loginController.verifyToken) as RequestHandler)

export default router
