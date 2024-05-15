import { type RequestHandler, Router, type Handler } from "express"
import loginController from "@/controllers/loginController"
import googleService from "@/services/google"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"

const router = Router()

router.post("/sign-up", asyncErrorHandler(
  /**
   * #swagger.tags = ["LogInAndSignUp-登入與註冊"]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "註冊資訊",
      schema: {
        $username: "Eason",
        $email: "56asdf@hotmail.com",
        $password: "a1234567",
        $confirmPassword: "a1234567"
      }
    }
    * #swagger.responses[201] = {
      description: '用戶新增成功',
      schema: {
        status: true,
        message: "用戶新增成功",
        data: {
            _id: "66441880635c6a9bc95c164b",
            personalInfo: {
                username: "Eason",
                email: "56asdf@hotmail.com",
                gender: null,
                birthday: null,
                _id: "66441880635c6a9bc95c164c"
            },
            isSubscribe: false,
            points: 0,
            resetPasswordToken: "",
            isActive: true,
            blockedUsers: [],
            notifications: [],
            createdAt: "2024-05-15T02:05:52.314Z",
            updatedAt: "2024-05-15T02:05:52.314Z"
            }
        }
      }
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
