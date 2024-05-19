import { type NextFunction, type Request, type Response } from "express"
export function ignoreSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.ignore = true
   */
  next()
}
