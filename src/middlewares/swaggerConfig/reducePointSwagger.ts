import { type NextFunction, type Request, type Response } from "express"
export function reducePointSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["reducePoint-扣除點數"]
   * #swagger.description = "扣除點數"
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
       description: '扣除點數成功',
       schema: {
           status: true,
           message: "扣除點數成功",
           data: {
             point: 50
           }
       }
     }
   */
  next()
}
