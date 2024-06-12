import { type NextFunction, type Request, type Response } from "express"
export function unlockCommentSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["解鎖評價"]
   * #swagger.description = "解鎖評價"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters["path"] = {
        in: "path",
        name: "id",
        required: true,
        type: "string",
        description: "被評價人id"
    }
   * #swagger.responses[200] = {
      description: '解鎖評價成功',
      schema: {
          status: true,
          message: "解鎖評價成功",
          data: ""
      }
    }
   */
  next()
}
