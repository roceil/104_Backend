import { type Request, type Response, type NextFunction } from "express"
import jwt from "jsonwebtoken"
import appErrorHandler from "@/utils/appErrorHandler"

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  // 檢查 cookie 中是否有 token
  const token = req.cookies.token as string

  if (!token) {
    appErrorHandler(401, "未登入", next)
    return
  }

  // 提取 JWT 必要環境變數
  const key = process.env.JWT_SECRET
  if (!key) {
    appErrorHandler(500, "缺少必要環境變數", next)
    return
  }

  // 移除 Bearer 字串並確保 tokenString 不為 undefined
  const tokenParts = token.split(" ")
  const tokenString = tokenParts.length > 1 ? tokenParts[1] : undefined

  if (!tokenString) {
    appErrorHandler(401, "無效的 token 格式", next)
    return
  }

  // 驗證 token 並將解碼後的資料存入 req.user
  jwt.verify(tokenString, key, (err, decoded) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        appErrorHandler(401, "token 已過期", next)
        return
      } else {
        appErrorHandler(401, "驗證失敗", next)
        return
      }
    }

    req.user = decoded
  })

  next()
}

export default isAuth
