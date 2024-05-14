import { type RequestHandler, Router, type Handler } from "express"
import loginController from "@/controllers/loginController"
import googleService from "@/services/google"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"

const router = Router()

router.post("/sign-up", asyncErrorHandler(
  /**
   * #swagger.tags = ["LogInAndSignUp-登入與註冊"]
   */
  loginController.signUp) as RequestHandler)

router.post("/login", asyncErrorHandler(
  /**
   * #swagger.tags = ["LogInAndSignUp-登入與註冊"]
   */
  loginController.login) as RequestHandler)

router.put("/reset-password", isAuth as Handler, asyncErrorHandler(
  /**
   * #swagger.tags = ["LogInAndSignUp-登入與註冊"]
   */
  loginController.resetPassword) as RequestHandler)

router.post("/forget-password", asyncErrorHandler(
  /**
   * #swagger.tags = ["LogInAndSignUp-登入與註冊"]
   */
  loginController.forgetPassword) as RequestHandler)

router.get("/verify", isAuth as Handler, asyncErrorHandler(
  /**
   * #swagger.tags = ["LogInAndSignUp-登入與註冊"]
   */
  loginController.verifyToken) as RequestHandler)

/* Google Login */
router.get("/google", asyncErrorHandler(
  /**
   * #swagger.tags = ["第三方登入"]
   */
  googleService.googleAuthenticate) as RequestHandler)

router.get("/google/callback", asyncErrorHandler(
  /**
   * #swagger.tags = ["第三方登入"]
   */
  googleService.googleCallback) as RequestHandler)

export default router
