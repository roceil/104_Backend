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
        message: "封鎖成功",
        data: {
          userId: "664473d53d428e98fd5fb226",
          lockedUserId: ["664c3cbe345b4cb02e698660"],
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
      description: "黑名單列表",
      schema: {
         status: true,
         message: "查詢成功",
         data: [
            {
          _id: "66542da5edb728aae4b1f220",
          userId: "66542d94edb728aae4b1f218",
          nickNameDetails: {
          nickName: "JACK",
          isShow: false,
          _id: "66542f38edb728aae4b1f234"
            },
          tags: [],
          createdAt: "2024-05-27T06:52:21.549Z",
          updatedAt: "2024-05-27T06:59:04.972Z"
    }
  ]
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
          _id: "665581e6974f4f097bfe5751",
          userId: "66557ab1e67debd9083e3669",
          lockedUserId: [
            "66542d94edb728aae4b1f218"
          ],
          createdAt: "2024-05-28T07:04:06.857Z",
          updatedAt: "2024-05-28T07:15:36.384Z"
        }
      }
    }
    */
  next()
}
