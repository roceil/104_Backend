import { type Request, type Response, type NextFunction } from "express"

interface CustomError extends Error {
  statusCode?: number
  isOperational?: boolean
}

// 開發環境
const resErrorDev = (err: CustomError, res: Response) => {
  const statusCode = err.statusCode ?? 500 // 預設值為 500
  res.status(statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack
  })
}

// 正式環境
const resErrorProd = (err: CustomError, res: Response) => {
  const statusCode = err.statusCode ?? 500 // 預設值為 500
  if (err.isOperational) { // 如果可操作的錯誤
    res.status(statusCode).json({
      message: err.message
    })
  } else {
    console.error("[server]：出現系統錯誤", err)
    res.status(500).json({
      status: "error",
      message: "系統錯誤，請稍後再試！"
    })
  }
}

const errorHandler = (err: CustomError, req: Request, res: Response, _next: NextFunction): void => {
  const statusCode = err.statusCode ?? 500
  err.statusCode = statusCode // 更新 err 內的 statusCode

  // 開發環境
  if (process.env.NODE_ENV === "dev") {
    resErrorDev(err, res)
    return
  }

  // 正式環境
  if (err.name === "ValidationError") {
    err.message = "資料欄位未填寫正確，請重新輸入！"
    err.isOperational = true
    resErrorProd(err, res)
    return
  }

  // 預設為正式環境
  resErrorProd(err, res)
}

export const mongoDB = {
  errorHandler
}
