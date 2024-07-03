import { type NextFunction, type Request, type Response } from "express"

export function deleteUnreferencedMatchListSelfSettingsSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["test-測試用"]
   * #swagger.description = "刪除無帳號的本身條件資料庫資料"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   */
  next()
}
