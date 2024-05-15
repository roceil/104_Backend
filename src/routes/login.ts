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
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "登入資訊",
      schema: {
        $account: "56asdf@hotmail.com",
        $password: "a1234567",
        }
      }
    * #swagger.responses[200] = {
      description: '登入成功',
      schema: {
        status: true,
        message: "登入成功",
        data: {
            userId: "66441880635c6a9bc95c164b",
            email:"56asdf@hotmail.com",
            name: "Eason",
            gender: null,
            birthday: null,
            token: "as4d5fa421sdfasdf",
            }
        }
      }
   */
  loginController.login) as RequestHandler)

router.patch("/reset-password/:id", isAuth as Handler, asyncErrorHandler(
  /**
   * #swagger.tags = ["LogInAndSignUp-登入與註冊"]
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
  * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "修改密碼",
      schema: {
        $newPassword: "a1234567",
        $confirmNewPassword: "a1234567"
      }
    }
  * #swagger.responses[200] = {
    description: '修改成功',
    schema: {
      status: true,
      message: "修改密碼成功",
      data: null
      }
    }
   */
  loginController.resetPassword) as RequestHandler)

router.post("/forget-password", asyncErrorHandler(
  /**
   * #swagger.tags = ["LogInAndSignUp-登入與註冊"]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "忘記密碼",
      schema: {
        $email: "asdfa@hotmail.com"
      }
    }
   * #swagger.responses[200] = {
      description: '郵件寄送成功',
      schema: {
        status: true,
        message: "郵件寄送成功",
        data: null
      }
    }
   */
  loginController.forgetPassword) as RequestHandler)

router.get("/verify", isAuth as Handler, asyncErrorHandler(
  /**
   * #swagger.tags = ["LogInAndSignUp-登入與註冊"]
   * #swagger.description = "把拿到的Token拿到Authorize中，進行驗證。"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   */
  loginController.verifyToken) as RequestHandler)

router.patch("/activate-account/:token", isAuth as Handler, asyncErrorHandler(loginController.activateAccount) as RequestHandler)

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
