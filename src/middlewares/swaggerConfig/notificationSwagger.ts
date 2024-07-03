import { type NextFunction, type Request, type Response } from "express"

export function getNotificationListSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
  * #swagger.tags = ["Notification-通知"]
  * #swagger.description = "取得通知列表-邀約通知"
  *  * #swagger.security = [{
      "apiKeyAuth":[]
    }]
  * #swagger.responses[200] = {
      description: "取得通知列表",
      schema: {
        status: true,
        message: "查詢成功",
        data: [{
          _id: "6656d28e92d286ab6638e779",
          userId: "66557ab1e67debd9083e3669",
          receiveUserId: "66542d94edb728aae4b1f218",
          type: 1,
          message: {
            title: "hello7777",
            content: "7777777",
            _id: "6656d28e92d286ab6638e77a"
          },
          isRead: false,
          date: "2024-05-29T07:00:30.973Z",
          createdAt: "2024-05-29T07:00:30.975Z",
          updatedAt: "2024-05-29T07:00:30.975Z",
          user: [{
            _id: "66557ab1e67debd9083e3669",
            personalInfo: {
              username: "hello",
              email: "a53135adfae@hotmail.com",
              id: null
            },
            id: "66557ab1e67debd9083e3669"
        }],
          receiveUser:[ {
            _id: "66542d94edb728aae4b1f218",
            personalInfo: {
              username: "hello",
              email: "asdfrghjk@hotmail.com",
              id: null
            },
            id: "66542d94edb728aae4b1f218"
          }],
          userProfile: [{
            _id: "66542d94edb728aae4b1f218",
            userId: "66542d94edb728aae4b1f218",
            photoDetails: {
              photo: "https://firebasestorage.googleapis.com/v0/b/social-e030c.appspot.com/o/default_img%2F%E5%9C%96%E7%89%87%20%281%29.png?alt=media&token=1f8e0c8b-9c4b-4a7b-8e3d-8f0d5e4d6b9f",
              isShow: false,
              _id: "66542d94edb728aae4b1f21a",
              id: "66542d94edb728aae4b1f21a"
            },
            introDetails: {
              intro: "hello",
              isShow: false,
              _id: "66542d94edb728aae4b1f21b",
              id: "66542d94edb728aae4b1f21b"
            },
            nickNameDetails: {
              nickName: "hello",
              isShow: false,
              _id: "66542d94edb728aae4b1f21c",
              id: "66542d94edb728aae4b1f21c"
            },
            lineDetails: {
              lineId: "hello",
              isShow: false,
              _id: "66542d94edb728aae4b1f21d",
              id: "66542d94edb728aae4b1f21d"
            },
            tags: [],
            unlockComment: [],
            exposureSettings: {
              rating: 0,
              isShow: false,
              isMatch: false,
              _id: "66542d94edb728aae4b1f21e",
              id: "66542d94edb728aae4b1f21e"
            },
            userStatus: {
              rating: 0,
              isMatch: false,
              commentScore: 0,
              commentCount: 0,
              _id: "66542d94edb728aae4b1f21f",
              id: "66542d94edb728aae4b1f21f"
            },
            createdAt: "2024-05-29T07:00:30.975Z",
            updatedAt: "2024-05-29T07:00:30.975Z",
            id: "66542d94edb728aae4b1f218"
          }],
          id: "6656d28e92d286ab6638e779"
        }]
      }
    }
   */
  next()
}

export function deleteNotificationSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
  * #swagger.tags = ["Notification-通知"]
  * #swagger.description = "刪除通知"
  * #swagger.security = [{
      "apiKeyAuth":[]
    }]
  * #swagger.parameters["path"] = {
      in: "path",
      required: true,
      type: "string",
      description: "通知列表Id",
      name: "id"
    }
  * #swagger.responses[200] = {
       description: '刪除通知成功',
       schema: {
           status: true,
           message: "刪除成功",
           data: {
            _id: "6656d28e92d286ab6638e779",
            userId: "66557ab1e67debd9083e3669",
            receiveUserId: "66542d94edb728aae4b1f218",
            type: 1,
            message: {
              title: "hello7777",
              content: "7777777",
              _id: "6656d28e92d286ab6638e77a",
              id: "6656d28e92d286ab6638e77a"
            },
            isRead: false,
            date: "2024-05-29T07:00:30.973Z",
            createdAt: "2024-05-29T07:00:30.975Z",
            updatedAt: "2024-05-29T07:00:30.975Z",
            id: "6656d28e92d286ab6638e779"
       }
    }
}
   */
  next()
}
