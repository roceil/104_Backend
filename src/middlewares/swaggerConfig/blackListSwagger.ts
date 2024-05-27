import { type NextFunction, type Request, type Response } from "express"

export function postBlackListSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["blackList-黑名單"]
   * #swagger.description = "新增黑名單"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters["body"] = {
      in: "body",
      required: true,
      type: "object",
      schema: {
        $lockedUserId: "string"
      }
    }
  * #swagger.responses[201] = {
      description: "黑名單新增成功",
      schema: {
        status: true,
        message: "黑名單新增成功",
        data: {
          userId: "664473d53d428e98fd5fb226",
          lockedUserId: "664c3cbe345b4cb02e698660",
          createdAt: "2024-05-22T02:14:28.873Z",
          updatedAt: "2024-05-22T02:14:28.873Z"
        }
      }
    }
    */
  next()
}

export function getBlackListSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["blackList-黑名單"]
   * #swagger.description = "取得黑名單列表"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.responses[200] = {
      description: '黑名單列表',
      schema: {
          status: true,
          message: "查詢成功",
          data: {
            userId: "664473d53d428e98fd5fb226",
            lockedUserId: "664c3cbe345b4cb02e698660",
            createdAt: "2024-05-22T02:14:28.873Z",
            updatedAt: "2024-05-22T02:14:28.873Z"
          }
        }
      }
    */
  next()
}

export function deleteBlackListByIdSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["blackList-黑名單"]
   * #swagger.description = "刪除黑名單"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters["path"] = {
      in: "path",
      required: true,
      type: "string",
      description: "黑名單userId",
      name: "id"
    }
   * #swagger.responses[200] = {
      description: "黑名單刪除成功",
      schema: {
        status: true,
        message: "黑名單刪除成功",
        data: {
          userId: "664473d53d428e98fd5fb226",
          lockedUserId: "664c3cbe345b4cb02e698660",
          createdAt: "2024-05-22T02:14:28.873Z",
          updatedAt: "2024-05-22T02:14:28.873Z"
        }
      }
    }
    */
  next()
}
