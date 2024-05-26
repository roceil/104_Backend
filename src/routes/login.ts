import { type RequestHandler, Router, type Handler } from "express"
import loginController from "@/controllers/loginController"
import googleService from "@/services/google"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import {
  signUpSwagger, loginSwagger, resetPasswordSwagger, forgetPasswordSwagger, verifySwagger,
  activateAccountSwagger, googleSwagger, googleCallbackSwagger
} from "@/middlewares/swaggerConfig/loginSwagger"
const router = Router()

router.post("/sign-up", signUpSwagger, asyncErrorHandler(loginController.signUp) as RequestHandler)

router.post("/login", loginSwagger, asyncErrorHandler(loginController.login) as RequestHandler)

router.patch("/reset-password/:id", resetPasswordSwagger, isAuth as Handler, asyncErrorHandler(loginController.resetPassword) as RequestHandler)

router.post("/forget-password", forgetPasswordSwagger, asyncErrorHandler(loginController.forgetPassword) as RequestHandler)

router.get("/verify", verifySwagger, isAuth as Handler, asyncErrorHandler(loginController.verifyToken) as RequestHandler)

router.patch("/activate-account/:token", activateAccountSwagger, isAuth as Handler, asyncErrorHandler(loginController.activateAccount) as RequestHandler)

router.get("/logout", isAuth as Handler, asyncErrorHandler(loginController.logout) as RequestHandler)

/* Google Login */
router.get("/google", googleSwagger, asyncErrorHandler(googleService.googleAuthenticate) as RequestHandler)

router.get("/google/callback", googleCallbackSwagger, asyncErrorHandler(googleService.googleCallback) as RequestHandler)

router.get("/google/check-auth/:token", googleCallbackSwagger, isAuth as Handler, asyncErrorHandler(googleService.googleWriteCookie) as RequestHandler)

export default router
