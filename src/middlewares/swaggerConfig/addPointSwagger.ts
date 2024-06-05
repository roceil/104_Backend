import { type NextFunction, type Request, type Response } from "express"
export function addPointSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["測試用增加點數"]
   * #swagger.description = "增加點數"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters["path"] = {
        in: "path",
        name: "point",
        required: true,
        type: "number",
        description: "點數"
    }
   * #swagger.responses[200] = {
       description: '增加點數成功',
       schema: {
           status: true,
           message: "增加點數成功",
           data: {
             point: 5
           }
       }
     }
   */
  next()
}
