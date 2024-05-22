import { type NextFunction, type Request, type Response } from "express"
export function postInvitationSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["invitation-邀約"]
   * #swagger.description = "新增邀約"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "邀請別人",
      schema: {
        $invitedUserId:"664c3cbe345b4cb02e698660",
        $message:{
        $title:"hello7777",
        $content:"7777777"
    }
      }
    }
   * #swagger.responses[201] = {
      description: "邀請成功",
      schema: {
        status: true,
        message: "邀請成功",
        data: {
          userId: "664473d53d428e98fd5fb226",
          invitedUserId: "664c3cbe345b4cb02e698660",
        message: {
          title: "hello7777",
          content: "7777777",
          createdAt: "2024-05-22T02:14:28.873Z",
          updatedAt: "2024-05-22T02:14:28.873Z"
        },
        "status": "pending",
        "_id": "664d55048e49b8c72b838f5a",
        "date": "2024-05-22T02:14:28.873Z",
        "createdAt": "2024-05-22T02:14:28.873Z",
        "updatedAt": "2024-05-22T02:14:28.873Z",
        "id": "664d55048e49b8c72b838f5a"
    }
      }
    }
   */
  next()
}
export function getInvitationListSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["invitation-邀約"]
   * #swagger.description = "取得邀約列表"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.responses[200] = {
      description: '邀約列表',
      schema: {
          status: true,
          message: "查詢成功",
          data: {
            invitations: [
                {
                message: {
                    title: "hello7777",
                    content: "7777777",
                    createdAt: "2024-05-21T06:49:49.383Z",
                    updatedAt: "2024-05-21T06:49:49.383Z"
                },
                _id: "664c440d58453572378249c9",
                userId: "664473d53d428e98fd5fb226",
                invitedUserId: "664c427bb56b34d999f86c83",
                status: "pending",
                date: "2024-05-21T06:49:49.383Z",
                createdAt: "2024-05-21T06:49:49.383Z",
                updatedAt: "2024-05-21T06:49:49.383Z",
                profile: [
                    {
                        _id: "664c42ea58453572378249bf",
                        userId: "664c427bb56b34d999f86c83",
                        nickNameDetails: {
                            nickName: "Kven",
                            isShow: true,
                            _id: "664c42ea58453572378249c0"
                        },
                        tags: []
                    }
                ],
                id: "664c440d58453572378249c9"
            },
            ],
            invitationsLength: 1
          }
      }
    }
   */
  next()
}
export function getWhoInvitationListSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["invitation-邀約"]
   * #swagger.description = "取得邀約列表"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.responses[200] = {
      description: '邀約列表',
      schema: {
          status: true,
          message: "查詢成功",
          data: {
            invitations: [
                {
                message: {
                    title: "hello7777",
                    content: "7777777",
                    createdAt: "2024-05-21T06:49:49.383Z",
                    updatedAt: "2024-05-21T06:49:49.383Z"
                },
                _id: "664c440d58453572378249c9",
                userId: "664473d53d428e98fd5fb226",
                invitedUserId: "664c427bb56b34d999f86c83",
                status: "pending",
                date: "2024-05-21T06:49:49.383Z",
                createdAt: "2024-05-21T06:49:49.383Z",
                updatedAt: "2024-05-21T06:49:49.383Z",
                profile: [
                    {
                        _id: "664c42ea58453572378249bf",
                        userId: "664c427bb56b34d999f86c83",
                        nickNameDetails: {
                            nickName: "Kven",
                            isShow: true,
                            _id: "664c42ea58453572378249c0"
                        },
                        tags: []
                    }
                ],
                id: "664c440d58453572378249c9"
            },
            ],
            invitationsLength: 1
          }
      }
    }
   */
  next()
}
export function getInvitationByIdSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["invitation-邀約"]
   * #swagger.description = "取得邀約人詳細資料"
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
      description: '邀約',
      schema: {
          status: true,
          message: "查詢成功",
          data: {
            message: {
                title: "hello7777",
                content: "7777777",
                createdAt: "2024-05-21T06:49:49.383Z",
                updatedAt: "2024-05-21T06:49:49.383Z"
            },
            _id: "664c440d58453572378249c9",
            userId: "664473d53d428e98fd5fb226",
            invitedUserId: "664c427bb56b34d999f86c83",
            status: "pending",
            date: "2024-05-21T06:49:49.383Z",
            createdAt: "2024-05-21T06:49:49.383Z",
            updatedAt: "2024-05-21T06:49:49.383Z",
            profile: [
                {
                    _id: "664c42ea58453572378249bf",
                    userId: "664c427bb56b34d999f86c83",
                    nickNameDetails: {
                        nickName: "Kven",
                        isShow: true,
                        _id: "664c42ea58453572378249c0"
                    },
                    tags: []
                }
            ],
            id: "664c440d58453572378249c9"
        }
      }
    }
   */
  next()
}
export function cancelInvitationSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["invitation-邀約"]
   * #swagger.description = "取消邀約"
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
      description: '取消邀約',
      schema: {
          status: true,
          message: "取消邀約成功",
          data: {
            message: {
                title: "hello7777",
                content: "7777777",
                createdAt: "2024-05-21T06:49:49.383Z",
                updatedAt: "2024-05-21T06:49:49.383Z"
            },
            _id: "664c440d58453572378249c9",
            userId: "664473d53d428e98fd5fb226",
            invitedUserId: "664c427bb56b34d999f86c83",
            status: "cancel",
            date: "2024-05-21T06:49:49.383Z",
            createdAt: "2024-05-21T06:49:49.383Z",
            updatedAt: "2024-05-21T06:49:49.383Z",
            id: "664c440d58453572378249c9"
        }
      }
    }
   */
  next()
}
export function rejectInvitationSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["invitation-邀約"]
   * #swagger.description = "拒絕邀約"
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
      description: '拒絕邀約',
      schema: {
          status: true,
          message: "拒絕邀約成功",
          data: {
            message: {
                title: "hello7777",
                content: "7777777",
                createdAt: "2024-05-21T06:49:49.383Z",
                updatedAt: "2024-05-21T06:49:49.383Z"
            },
            _id: "664c440d58453572378249c9",
            userId: "664473d53d428e98fd5fb226",
            invitedUserId: "664c427bb56b34d999f86c83",
            status: "rejected",
            date: "2024-05-21T06:49:49.383Z",
            createdAt: "2024-05-21T06:49:49.383Z",
            updatedAt: "2024-05-21T06:49:49.383Z",
            id: "664c440d58453572378249c9"
        }
      }
    }
   */
  next()
}
export function acceptInvitationSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["invitation-邀約"]
   * #swagger.description = "接受邀約"
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
      description: '接受邀約',
      schema: {
          status: true,
          message: "接受邀約成功",
          data: {
            message: {
                title: "hello7777",
                content: "7777777",
                createdAt: "2024-05-21T06:49:49.383Z",
                updatedAt: "2024-05-21T06:49:49.383Z"
            },
            _id: "664c440d58453572378249c9",
            userId: "664473d53d428e98fd5fb226",
            invitedUserId: "664c427bb56b34d999f86c83",
            status: "accepted",
            date: "2024-05-21T06:49:49.383Z",
            createdAt: "2024-05-21T06:49:49.383Z",
            updatedAt: "2024-05-21T06:49:49.383Z",
            id: "664c440d58453572378249c9"
        }
      }
    }
   */
  next()
}
export function deleteInvitationSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["invitation-邀約"]
   * #swagger.description = "刪除邀約"
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
      description: '刪除邀約',
      schema: {
          status: true,
          message: "刪除成功",
          data: {
            message: {
                title: "hello7777",
                content: "7777777",
                createdAt: "2024-05-21T06:49:49.383Z",
                updatedAt: "2024-05-21T06:49:49.383Z"
            },
            _id: "664c440d58453572378249c9",
            userId: "664473d53d428e98fd5fb226",
            invitedUserId: "664c427bb56b34d999f86c83",
            status: "pending",
            date: "2024-05-21T06:49:49.383Z",
            createdAt: "2024-05-21T06:49:49.383Z",
            updatedAt: "2024-05-21T06:49:49.383Z",
            id: "664c440d58453572378249c9"
        }
      }
    }
   */
  next()
}
