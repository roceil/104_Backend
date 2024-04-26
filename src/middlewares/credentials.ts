import { type Request, type Response, type NextFunction } from "express"
import allowOrigin from "../../configs/allowOrigins"

export const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as unknown as string
  if (allowOrigin.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true")
  }
  next()
}
