// src/middlewares/auth.ts
import { type Request, type Response, type NextFunction } from "express"
import jwt from "jsonwebtoken"
import appErrorHandler from "@/utils/appErrorHandler"

export const verifyToken = (token: string, next: NextFunction) => {
  const key = process.env.JWT_SECRET
  if (!key) {
    appErrorHandler(500, "缺少必要環境變數", next)
    return null
  }

  try {
    const decoded = jwt.verify(token, key)
    return decoded
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      appErrorHandler(401, "token 已過期", next)
    } else {
      appErrorHandler(401, "驗證失敗", next)
    }
    return null
  }
}

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization ?? req.params.token

  if (!token) {
    appErrorHandler(401, "未登入", next)
    return
  }

  const decoded = verifyToken(token, next)
  if (decoded) {
    req.user = decoded
    req.token = token
    next()
  }
}

export default isAuth
