import { type Request, type Response, type NextFunction } from "express"

// 定義一個類型，表示接受 Express 的 req, res, next 並返回 Promise 的異步函數
type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>

const handleErrorAsync = (func: AsyncFunction): unknown => {
  return function (req: Request, res: Response, next: NextFunction) {
    // NOTE：這裡的 next 不知原因無法被 app 的 mongoDB.errorHandler 捕捉到
    func(req, res, next).catch((err: Error) => {
      next(err)
    })
  }
}

export default handleErrorAsync
