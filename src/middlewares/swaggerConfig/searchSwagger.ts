import { type NextFunction, type Request, type Response } from "express"

export function searchSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Search-搜尋"]
   * #swagger.description = '搜尋關鍵字和標籤 (陣列示範："test1,test2" )'
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters['page'] = {
          in: 'query',
          type: 'string',
          required: false,
          description: '目前頁數'
      }    
   * #swagger.parameters['sort'] = {
         in: 'query',
         type: 'string',
         required: false,
         description: '排序：desc/asc'
     }
   * #swagger.parameters["body"] = {
            in: "body",
            type: Object,
            required: true,
            description: "資料格式",
            schema: {
                "keyword": "軍人",
                "gender": 0,
                "tags": "雙子座,金牛座",
                "location": 0
            } 
    }
   * #swagger.responses[200] = {
            description: "搜尋列表",
            schema: {
                status: true,
                message: "搜尋新增成功",
                data: {
                    "resultList": [
                      {
                        "userInfo": {
                          "_id": "665d6e7cd43964256b106f68",
                          "personalInfo": {
                            "username": "Eason",
                            "email": "56asdf@hotmail.com",
                            "gender": null,
                            "birthday": null,
                            "_id": "665d6e7cd43964256b106f69"
                          },
                          "isSubscribe": false,
                          "points": 175,
                          "resetPasswordToken": "",
                          "isActive": true,
                          "blockedUsers": [],
                          "notifications": [],
                          "createdAt": "2024-06-03T07:19:24.161Z",
                          "updatedAt": "2024-06-21T02:38:30.999Z",
                          "chatRecord": []
                        },
                        "matchListSelfSetting": {
                          "personalInfo": {
                            "age": 1,
                            "gender": 0,
                            "isMarried": 0,
                            "height": 0,
                            "weight": 0,
                            "socialCircle": 0,
                            "activities": [
                              1,
                              2,
                              3
                            ],
                            "location": 0,
                            "education": 0,
                            "liveWithParents": 0,
                            "religion": 0,
                            "smoking": 1
                          },
                          "workInfo": {
                            "occupation": 1,
                            "industry": [
                              1,
                              2,
                              3
                            ],
                            "expectedSalary": 7
                          },
                          "_id": "6666bea3df6fee39f7ccaa79",
                          "userId": "665d6e7cd43964256b106f68",
                          "createdAt": "2024-06-10T08:51:47.578Z",
                          "updatedAt": "2024-06-20T01:50:58.817Z",
                          "searchDataBase": [
                            "20-22 歲",
                            "健行",
                            "園藝",
                            "慈善",
                            "不抽菸",
                            "軍人",
                            "餐旅",
                            "50k以上"
                          ]
                        },
                        "profile": {
                          "userStatus": {
                            "rating": null,
                            "isMatch": false,
                            "point": 0,
                            "_id": "666a88e4b65d5d116d8053f7",
                            "commentScore": 0,
                            "commentCount": 0,
                            "id": "666a88e4b65d5d116d8053f7"
                          },
                          "photoDetails": {
                            "photo": "https://i.imgur.com/XgbZdeA.jpeg",
                            "isShow": true,
                            "_id": "667129208753a1adebfd3dea",
                            "id": "667129208753a1adebfd3dea"
                          },
                          "tags": [
                            "test1",
                            "test2",
                            "test1",
                            "test1",
                            "test1"
                          ]
                        },
                        "invitationStatus": "not invited",
                        "isCollected": false,
                        "isLocked": false,
                        "isUnlock": true,
                        "hasComment": false,
                        "beInvitationStatus": "not invited"
                      }
                    ],
                    "pagination": {
                      "page": 1,
                      "perPage": 6,
                      "totalCount": 1
                    }
                  }
            }
        }
   */
  next()
}

export function getEliteListSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Search-搜尋"]
   * #swagger.description = '取得精選列表'
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.responses[200] = {
            description: "取得精選列表",
            schema: {
                status: true,
                message: "取得精選列表成功",
                data: [
                ]
            }
        }
   */
  next()
}

export function maybeYouLikeSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Search-搜尋"]
   * #swagger.description = '隨機搜尋關鍵字'
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters['page'] = {
          in: 'query',
          type: 'string',
          required: false,
          description: '目前頁數'
      }    
   * #swagger.parameters['sort'] = {
         in: 'query',
         type: 'string',
         required: false,
         description: '排序：desc/asc'
     }

   * #swagger.responses[200] = {
            description: "可能你也喜歡列表",
            schema: {
                status: true,
                message: "取得成功",
                data: {
                    "resultList": [
                      {
                        "userInfo": {
                          "_id": "665d6e7cd43964256b106f68",
                          "personalInfo": {
                            "username": "Eason",
                            "email": "56asdf@hotmail.com",
                            "gender": null,
                            "birthday": null,
                            "_id": "665d6e7cd43964256b106f69"
                          },
                          "isSubscribe": false,
                          "points": 175,
                          "resetPasswordToken": "",
                          "isActive": true,
                          "blockedUsers": [],
                          "notifications": [],
                          "createdAt": "2024-06-03T07:19:24.161Z",
                          "updatedAt": "2024-06-21T02:38:30.999Z",
                          "chatRecord": []
                        },
                        "matchListSelfSetting": {
                          "personalInfo": {
                            "age": 1,
                            "gender": 0,
                            "isMarried": 0,
                            "height": 0,
                            "weight": 0,
                            "socialCircle": 0,
                            "activities": [
                              1,
                              2,
                              3
                            ],
                            "location": 0,
                            "education": 0,
                            "liveWithParents": 0,
                            "religion": 0,
                            "smoking": 1
                          },
                          "workInfo": {
                            "occupation": 1,
                            "industry": [
                              1,
                              2,
                              3
                            ],
                            "expectedSalary": 7
                          },
                          "_id": "6666bea3df6fee39f7ccaa79",
                          "userId": "665d6e7cd43964256b106f68",
                          "createdAt": "2024-06-10T08:51:47.578Z",
                          "updatedAt": "2024-06-20T01:50:58.817Z",
                          "searchDataBase": [
                            "20-22 歲",
                            "健行",
                            "園藝",
                            "慈善",
                            "不抽菸",
                            "軍人",
                            "餐旅",
                            "50k以上"
                          ]
                        },
                        "profile": {
                          "userStatus": {
                            "rating": null,
                            "isMatch": false,
                            "point": 0,
                            "_id": "666a88e4b65d5d116d8053f7",
                            "commentScore": 0,
                            "commentCount": 0,
                            "id": "666a88e4b65d5d116d8053f7"
                          },
                          "photoDetails": {
                            "photo": "https://i.imgur.com/XgbZdeA.jpeg",
                            "isShow": true,
                            "_id": "667129208753a1adebfd3dea",
                            "id": "667129208753a1adebfd3dea"
                          },
                          "tags": [
                            "test1",
                            "test2",
                            "test1",
                            "test1",
                            "test1"
                          ]
                        },
                        "invitationStatus": "not invited",
                        "isCollected": false,
                        "isLocked": false,
                        "isUnlock": true,
                        "hasComment": false,
                        "beInvitationStatus": "not invited"
                      }
                    ],
                    "pagination": {
                      "page": 1,
                      "perPage": 6,
                      "totalCount": 1
                    }
                  }
            }
        }
   */
  next()
}