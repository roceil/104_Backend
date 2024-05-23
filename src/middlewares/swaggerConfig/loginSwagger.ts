import { type NextFunction, type Request, type Response } from "express"
export function signUpSwagger (_req: Request, _res: Response, next: NextFunction): void {
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
  next()
}
export function loginSwagger (_req: Request, _res: Response, next: NextFunction): void {
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
  next()
}
export function resetPasswordSwagger (_req: Request, _res: Response, next: NextFunction): void {
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
  next()
}
export function forgetPasswordSwagger (_req: Request, _res: Response, next: NextFunction): void {
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
  next()
}
export function verifySwagger (_req: Request, _res: Response, next: NextFunction): void {
/**
   * #swagger.tags = ["LogInAndSignUp-登入與註冊"]
   * #swagger.description = "把拿到的Token拿到Authorize中，進行驗證。"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   */
  next()
}

export function logOutSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
     * #swagger.tags = ["LogInAndSignUp-登入與註冊"]
     * #swagger.description = "登出並清除 Cookie 中的 Token。"
     * #swagger.security = [{
        "apiKeyAuth":[]
      }]
     */
  next()
}
export function activateAccountSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["LogInAndSignUp-登入與註冊"]
   * #swagger.description = "swagger未完成。"
   */
  next()
}
export function googleSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["第三方登入"]
   */
  next()
}
export function googleCallbackSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["第三方登入"]
   */
  next()
}
