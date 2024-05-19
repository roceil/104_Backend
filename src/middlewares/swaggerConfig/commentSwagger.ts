import { type NextFunction, type Request, type Response } from "express"
export function postCommentSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Comment-評價"]
   * #swagger.description = "新增評價"
   * #swagger.security = [{
       "apiKeyAuth":[]
     }]
   * #swagger.parameters["body"] = {
       in: "body",
       description: "新增評價",
       required: true,
       schema: {
         $commentedUserId:"66487581f6f2c93ddd16ff00",
         $content:"test666666"
       }
     }
   * #swagger.responses[200] = {
           description: '新增評價',
           schema: {
               status: true,
               message: "新增成功",
               data: {
                 userId: "664473d53d428e98fd5fb226",
                 commentedUserId: "66487581f6f2c93ddd16ff00",
                 content: "test666666",
                 _id: "664980fe213d91ed5fbff629",
                 createdAt: "2024-05-19T04:33:02.282Z",
                 updatedAt: "2024-05-19T04:33:02.282Z"
               }
           }
       }
   */
  next()
}
export function getCommentListSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Comment-評價"]
   * #swagger.description = "取得評價列表"
   * #swagger.security = [{
       "apiKeyAuth":[]
     }]
   * #swagger.responses[200] = {
           description: '評價列表',
           schema: {
               status: true,
               message: "查詢成功",
               data: [
                 {
                   _id: "66497a7c9acbc3bfb1a21621",
                   userId: "664473d53d428e98fd5fb226",
                   commentedUserId: "66487581f6f2c93ddd16ff00",
                   content: "test666666",
                   createdAt: "2024-05-19T04:05:16.243Z",
                   updatedAt: "2024-05-19T04:05:16.243Z"
                 }
               ]
           }
       }
   */
  next()
}
export function getCommentByIdSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Comment-評價"]
   * #swagger.description = "取得評價"
   * #swagger.security = [{
       "apiKeyAuth":[]
     }]
   * #swagger.parameters["path"] = {
       in: "path",
       required: true,
       type: "string",
       name: "id",
       description: "評價Id"
     }
   * #swagger.responses[200] = {
           description: '評價',
           schema: {
               status: true,
               message: "查詢成功",
               data: {
                 _id: "66497a7c9acbc3bfb1a21621",
                 userId: "664473d53d428e98fd5fb226",
                 commentedUserId: "66487581f6f2c93ddd16ff00",
                 content: "test666666",
                 createdAt: "2024-05-19T04:05:16.243Z",
                 updatedAt: "2024-05-19T04:05:16.243Z"
               }
           }
       }
   */
  next()
}
export function putCommentSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Comment-評價"]
   * #swagger.description = "修改評價"
   * #swagger.security = [{
       "apiKeyAuth":[]
     }]
   * #swagger.parameters["path"] = {
       in: "path",
       required: true,
       type: "string",
       name: "id",
       description: "評價Id"
     }
   * #swagger.parameters["body"] = {
       in: "body",
       description: "修改評價",
       required: true,
       schema: {
         $content:"test777777"
       }
     }
   * #swagger.responses[200] = {
           description: '修改評價',
           schema: {
               status: true,
               message: "修改成功",
               data: {
                 _id: "66497a7c9acbc3bfb1a21621",
                 userId: "664473d53d428e98fd5fb226",
                 commentedUserId: "66487581f6f2c93ddd16ff00",
                 content: "test777777",
                 createdAt: "2024-05-19T04:05:16.243Z",
                 updatedAt: "2024-05-19T04:05:16.243Z"
               }
           }
       }
   */
  next()
}
export function deleteCommentSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Comment-評價"]
   * #swagger.description = "刪除評價"
   * #swagger.security = [{
       "apiKeyAuth":[]
     }]
   * #swagger.parameters["path"] = {
       in: "path",
       required: true,
       type: "string",
       name: "id",
       description: "評價Id"
     }
   * #swagger.responses[200] = {
           description: '刪除評價',
           schema: {
               status: true,
               message: "刪除成功",
               data: {
                 _id: "66497a7c9acbc3bfb1a21621",
                 userId: "664473d53d428e98fd5fb226",
                 commentedUserId: "66487581f6f2c93ddd16ff00",
                 content: "test777777",
                 createdAt: "2024-05-19T04:05:16.243Z",
                 updatedAt: "2024-05-19T04:05:16.243Z"
               }
           }
       }
   */
  next()
}
