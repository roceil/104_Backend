import { type NextFunction, type Request, type Response } from "express"

export function getNotificationListFromInvitationSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Notification-通知"]
   * #swagger.description = "取得通知列表-邀約通知"
   * #swagger.security = [{
   *    "apiKeyAuth": []
   * }]
   * #swagger.responses[200] = {
   *    description: '取得通知列表成功',
   *    schema: {
   *        status: true,
   *        message: "查詢成功",
   *        data: [{
   *            _id: "664ee917d2ec90114441b60c",
   *            userId: "664d75461e76a855df1a8ba5",
   *            receiveUserId: "664d70cb23b6573c16ec0f86",
   *            type: 1,
   *            message: {
   *                title: "邀請邀請",
   *                content: "哈哈哈哈哈哈",
   *                _id: "664ee917d2ec90114441b60d"
   *            },
   *            isRead: false,
   *            date: "2024-05-23T06:58:31.114Z",
   *            createdAt: "2024-05-23T06:58:31.116Z",
   *            updatedAt: "2024-05-23T06:58:31.116Z",
   *            user: {
   *                _id: "664d75461e76a855df1a8ba5",
   *                personalInfo: {
   *                    username: "丁艳",
   *                    email: "q.siywv@pfyenmcl.ml"
   *                }
   *            },
   *            receiveUser: {
   *                _id: "664d70cb23b6573c16ec0f86",
   *                personalInfo: {
   *                    username: "龚桂英",
   *                    email: "c.llfmkjmsh@jub.biz"
   *                }
   *            },
   *            userProfile: [{
   *                _id: "664eedf3b4e844b61990d8c7",
   *                userId: "664d70cb23b6573c16ec0f86",
   *                nickNameDetails: {
   *                    nickName: "hihi",
   *                    isShow: true,
   *                    _id: "664eedf3b4e844b61990d8c8"
   *                },
   *                tags: [],
   *                createdAt: "2024-05-23T07:19:15.526Z",
   *                updatedAt: "2024-05-23T07:19:15.526Z"
   *            }]
   *        }]
   *    }
   * }
   * #swagger.responses[404] = {
   *    description: '查無通知'
   * }
   */
  next()
}
