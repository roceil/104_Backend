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
         data: {
          blackListProfile: [
            {
              _id: "667f67ecc8242fa00840b778",
              userId: "667f67ecc8242fa00840b76e",
              photoDetails: {
                photo: "https://firebasestorage.googleapis.com/v0/b/social-e030c.appspot.com/o/default_img%2FLove%20%26%20Dating%20(9).png?alt=media&token=630b4f66-2304-4084-aeed-f9ba177794d2",
                isShow: false
              },
              introDetails: {
                intro: "",
                isShow: false
              },
              nickNameDetails: {
                nickName: "依娃叁",
                isShow: false
              },
              lineDetails: {
                lineId: "",
                isShow: false
              },
              tags: [],
              userStatus: {
                rating: 0,
                isMatch: false,
                commentScore: 0,
                commentCount: 0
              },
              createdAt: "2024-06-29T01:48:28.359Z",
              updatedAt: "2024-06-30T08:35:48.960Z",
              matchListSettings: {
                searchDataBase: [],
                personalInfo: {
                  age: 0,
                  gender: 0,
                  isMarried: 0,
                  height: 0,
                  weight: 0,
                  socialCircle: 0,
                  activities: [
                    0
                  ],
                  location: 0,
                  education: 0,
                  liveWithParents: 0,
                  religion: 0,
                  smoking: 0
                },
                workInfo: {
                  occupation: 0,
                  industry: [
                    0
                  ],
                  expectedSalar: 0
                }
              }
            }
          ],
          pagination: {
            totalCount: 3,
            page: 1,
            perPage: 6
          }
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
