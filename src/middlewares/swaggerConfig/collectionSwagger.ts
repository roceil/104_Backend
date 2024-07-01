import { type NextFunction, type Request, type Response } from "express"

export function getCollectionSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["collection-收藏"]
   * #swagger.description = "取得收藏"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters['page'] = {
      in: 'query',
      description: '頁數 不可為0',
      required: false,
      schema: { type: 'number' }
    }
   * #swagger.parameters['pageSize'] = {
      in: 'query',
      description: '每頁幾筆',
      required: false,
      schema: { type: 'number' }
    }
   * #swagger.parameters['sort'] = {
      in: 'query',
      description: '依時間排序，desc: 由新到舊，asc: 由舊到新',
      required: false,
      schema: { type: 'string' }
    }
   * #swagger.responses[200] = {
      description: '查詢成功',
      schema: {
        status: true,
        message: "查詢成功",
        data: {
          collections: [
            {
              _id: "6672a71fcf7d8ade64acdf58",
              userId: "665fe01431e8f0630d407037",
              collectedUserId: "66571be82f1545bc8d671be4",
              createdAt: "2024-06-19T09:38:39.918Z",
              updatedAt: "2024-06-19T09:38:39.918Z",
              collectedUsers: {
                personalInfo: {
                  username: "Node2024",
                  email: "3ADF213@hotmail.com",
                  gender: null,
                  birthday: null,
                }
              },
              invitation: {
                _id: "66752531sdf32aad453sdf",
                userId: "665fe01431e8f0630d407037",
                invitedUserId: "66571be82f1545bc8d671be4",
                message: {
                  title: "hello",
                  content: "hello",
                  createdAt: "2024-06-19T09:38:39.918Z",
                  updatedAt: "2024-06-19T09:38:39.918Z"
                },
                isFinishDating: false,
                status: "pending",
                date: "2024-06-19T09:38:39.918Z",
                createdAt: "2024-06-19T09:38:39.918Z",
                updatedAt: "2024-06-19T09:38:39.918Z"
              }
            }
          ],
          pagination: {
            page: 1,
            perPage: 6,
            totalCount: 1
          }
        }
      }
    }
    */
  next()
}

export function addCollectionSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["collection-收藏"]
   * #swagger.description = "新增收藏"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters["body"] = {
        in: "body",
        name: "body",
        required: true,
        schema: {
          $collectedUserId: "60b5e7b5d2d9e1b6c8e1b3b0"
        }
    }
   * #swagger.responses[201] = {
      description: '新增收藏成功',
      schema: {
          status: true,
          message: "新增收藏成功",
          data: {
            _id: "60b5e7b5d2d9e1b6c8e1b3b0",
            userId: "60b5e7b5d2d9e1b6c8e1b3b0",
            collectedUserId: ["60b5e7b5d2d9e1b6c8e1b3b0"],
            createdAt: "2024-06-13T05:36:36.125Z",
            updatedAt: "2024-06-13T05:55:01.382Z",
            id: "60b5e7b5d2d9e1b6c8e1b3b0"
          }
      }
    }
   */
  next()
}
export function deleteCollectionByIdSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["collection-收藏"]
   * #swagger.description = "刪除收藏"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters["path"] = {
        in: "path",
        required: true,
        type: "string",
        name: "id",
        description: "列表Id"
    }
   * #swagger.responses[200] = {
      description: '刪除收藏',
      schema: {
          status: true,
          message: "取消收藏成功",
          data: {
            _id: "60b5e7b5d2d9e1b6c8e1b3b0",
            userId: "60b5e7b5d2d9e1b6c8e1b3b0",
            collectedUserId: [],
            createdAt: "2024-06-13T06:06:22.897Z",
            updatedAt: "2024-06-13T06:06:22.897Z",
            id: "60b5e7b5d2d9e1b6c8e1b3b0"
          }
      }
    }
   */
  next()
}

export function getCollectionsByUserIdSwagger (_req: Request, _res: Response, next: NextFunction): void {
/**
 * #swagger.tags = ["collection-收藏"]
 * #swagger.description = "取得user收藏"
 * #swagger.security = [{
    "apiKeyAuth": []
  }]
 * #swagger.parameters['page'] = {
  in: 'query',
  description: '頁數 不可為0',
  required: false,
  schema: { type: 'number' }
  }
 * #swagger.parameters['pageSize'] = {
  in: 'query',
  description: '每頁幾筆',
  required: false,
  schema: { type: 'number' }
  }
 * #swagger.parameters['sort'] = {
  in: 'query',
  description: '依時間排序，desc: 由新到舊，asc: 由舊到新',
  required: false,
  schema: { type: 'string' }
  }
 * #swagger.responses[200] = {
  description: '查詢成功',
  schema: {
    status: true,
    message: "查詢成功",
    data: {
      collections: [
        {
          _id: "6672a71fcf7d8ade64acdf58",
          userId: "665fe01431e8f0630d407037",
          collectedUserId: "66571be82f1545bc8d671be4",
          createdAt: "2024-06-19T09:38:39.918Z",
          updatedAt: "2024-06-19T09:38:39.918Z",
          collectedUsers: {
            personalInfo: {
              username: "Node2024",
              email: "sdfasdf@hotmail.com",
              gender: null,
              birthday: null,
            }
          },
          invitation: {
            _id: "66752531sdf32aad453sdf",
            userId: "665fe01431e8f0630d407037",
            invitedUserId: "66571be82f1545bc8d671be4",
            message: {
              title: "hello",
              content: "hello",
              createdAt: "2024-06-19T09:38:39.918Z",
              updatedAt: "2024-06-19T09:38:39.918Z"
            },
            isFinishDating: false,
            status: "pending",
            date: "2024-06-19T09:38:39.918Z",
            createdAt: "2024-06-19T09:38:39.918Z",
            updatedAt: "2024-06-19T09:38:39.918Z"
          }
        }
      ],
      pagination: {
        page: 1,
        perPage: 6,
        totalCount: 1
      }
    }
  }
}
 */
  next()
}
