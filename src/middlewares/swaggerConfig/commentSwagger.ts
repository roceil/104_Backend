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
         $content:"test666666",
         $score:4
       }
     }
   * #swagger.responses[200] = {
           description: "新增評價",
           schema: {
               status: true,
               message: "新增成功",
               data: {
                 userId: "664473d53d428e98fd5fb226",
                 commentedUserId: "66487581f6f2c93ddd16ff00",
                 content: "test666666",
                 isUnlock: false,
                 score: 4,
                 _id: "664980fe213d91ed5fbff629",
                 createdAt: "2024-05-19T04:33:02.282Z",
                 updatedAt: "2024-05-19T04:33:02.282Z"
               }
           }
       }
   */
  next()
}
export function getCommentILiftListSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Comment-評價"]
   * #swagger.description = "取得我從留下的評價列表"
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
           description: "評價列表",
           schema: {
               status: true,
               message: "查詢成功",
               data: [
                 {
                   _id: "66497a7c9acbc3bfb1a21621",
                   userId: "664473d53d428e98fd5fb226",
                   commentedUserId: "66487581f6f2c93ddd16ff00",
                   content: "test666666",
                   score: 4,
                   createdAt: "2024-05-19T04:05:16.243Z",
                   updatedAt: "2024-05-19T04:05:16.243Z"
                 }
               ]
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
                   score: 4,
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
                 score: 4,
                 createdAt: "2024-05-19T04:05:16.243Z",
                 updatedAt: "2024-05-19T04:05:16.243Z"
               }
           }
       }
   */
  next()
}
export function getCommentByUserIdSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Comment-評價"]
   * #swagger.description = "取得特定使用者評價"
   * #swagger.security = [{
       "apiKeyAuth":[]
     }]
   * #swagger.parameters["path"] = {
       in: "path",
       required: true,
       type: "string",
       name: "id",
       description: "userId"
     }
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
           description: '評價',
           schema: {
               status: true,
               message: "查詢成功",
               data: {
               beCommentedUserProfile: {
                  photoDetails: {
                    photo: "",
                    isShow: false,
                    _id: "666e703374ca9f27515da5b6",
                    id: "666e703374ca9f27515da5b6"
                  },
                  introDetails: {
                    intro: "",
                    isShow: false,
                    _id: "666e703374ca9f27515da5b7",
                    id: "666e703374ca9f27515da5b7"
                  },
                  phoneDetails: {
                    phone: "",
                    isShow: false,
                    _id: "666e703374ca9f27515da5b9",
                    id: "666e703374ca9f27515da5b9"
                  },
                  companyDetails: {
                    company: "",
                    isShow: false,
                    _id: "666e703374ca9f27515da5ba",
                    id: "666e703374ca9f27515da5ba"
                  },
                  incomeDetails: {
                    income: "",
                    isShow: false,
                    _id: "666e703374ca9f27515da5bb",
                    id: "666e703374ca9f27515da5bb"
                  },
                  lineDetails: {
                    lineId: "",
                    isShow: false,
                    _id: "666e703374ca9f27515da5bc",
                    id: "666e703374ca9f27515da5bc"
                  },
                  jobDetails: {
                    job: "",
                    isShow: false,
                    _id: "666e703374ca9f27515da5bd",
                    id: "666e703374ca9f27515da5bd"
                  },
                  unlockComment: [],
                  exposureSettings: {
                    rating: 0,
                    isShow: false,
                    isMatch: false,
                    _id: "666e703374ca9f27515da5be",
                    id: "666e703374ca9f27515da5be"
                  },
                  _id: "6656d1c22f1545bc8d671ba2",
                  userId: "66487581f6f2c93ddd16ff00",
                  nickNameDetails: {
                    nickName: "Eason",
                    isShow: false,
                    _id: "6656d1c22f1545bc8d671ba3",
                    id: "6656d1c22f1545bc8d671ba3"
                  },
                  tags: [],
                  createdAt: "2024-05-29T06:57:06.807Z",
                  updatedAt: "2024-06-16T04:51:15.852Z",
                  userStatus: {
                    commentScore: null,
                    commentCount: null,
                    rating: 0,
                    isMatch: false,
                    point: 0,
                    _id: "666e703374ca9f27515da5c0",
                    id: "666e703374ca9f27515da5c0"
                  },
                  matchListByUserId: [],
                  id: "6656d1c22f1545bc8d671ba2"
                },
                comments: [
                  {
                    isUnlock: false,
                    _id: "6651a9bc0dedc6aa09bed056",
                    userId: "66487581f6f2c93ddd16ff00",
                    commentedUserId: "66487581f6f2c93ddd16ff00",
                    content: "test666666",
                    createdAt: "2024-05-25T09:05:00.434Z",
                    updatedAt: "2024-05-25T09:05:00.434Z",
                    commentUserProfile: [
                      {
                        photoDetails: {
                          photo: "",
                          isShow: false,
                          _id: "666e703374ca9f27515da5ca",
                          id: "666e703374ca9f27515da5ca"
                        },
                        jobDetails: {
                          job: "",
                          isShow: false,
                          _id: "666e703374ca9f27515da5cc",
                          id: "666e703374ca9f27515da5cc"
                        },
                        _id: "6656d1c22f1545bc8d671ba2",
                        userId: "66487581f6f2c93ddd16ff00",
                        nickNameDetails: {
                          nickName: "Eason",
                          isShow: false,
                          _id: "6656d1c22f1545bc8d671ba3",
                          id: "6656d1c22f1545bc8d671ba3"
                        },
                        userStatus: {
                          commentScore: null,
                          commentCount: null,
                          rating: 0,
                          isMatch: false,
                          point: 0,
                          _id: "666e703374ca9f27515da5ce",
                          id: "666e703374ca9f27515da5ce"
                        },
                        id: "6656d1c22f1545bc8d671ba2"
                      }
                    ],
                    id: "6651a9bc0dedc6aa09bed056"
                  },
                  {
                    isUnlock: false,
                    _id: "66596951bedecf92e0333fae",
                    userId: "6656d1bc2f1545bc8d671b9a",
                    commentedUserId: "66487581f6f2c93ddd16ff00",
                    content: "test666666",
                    createdAt: "2024-05-31T06:08:17.448Z",
                    updatedAt: "2024-05-31T06:08:17.448Z",
                    commentUserProfile: [
                      {
                        userStatus: {
                          rating: 0,
                          isMatch: false,
                          point: 0,
                          commentScore: 0,
                          commentCount: 0,
                          _id: "666e703374ca9f27515da5c9",
                          id: "666e703374ca9f27515da5c9"
                        },
                        _id: "6656d1be2f1545bc8d671b9e",
                        userId: "6656d1bc2f1545bc8d671b9a",
                        nickNameDetails: {
                          nickName: "陳咚咚",
                          isShow: false,
                          _id: "666b8f318593484e1056f03a",
                          id: "666b8f318593484e1056f03a"
                        },
                        jobDetails: {
                          job: "",
                          isShow: false,
                          _id: "666b8f318593484e1056f035",
                          id: "666b8f318593484e1056f035"
                        },
                        photoDetails: {
                          photo: "",
                          isShow: false,
                          _id: "666b8f318593484e1056f03c",
                          id: "666b8f318593484e1056f03c"
                        },
                        id: "6656d1be2f1545bc8d671b9e"
                      }
                    ],
                    id: "66596951bedecf92e0333fae"
                  },
                  {
                    _id: "666e6f3429840a156b11afbf",
                    userId: "665fe01431e8f0630d407037",
                    commentedUserId: "66487581f6f2c93ddd16ff00",
                    content: "test666666555555",
                    score: 4,
                    isUnlock: false,
                    createdAt: "2024-06-16T04:51:00.512Z",
                    updatedAt: "2024-06-16T04:51:00.512Z",
                    commentUserProfile: [
                      {
                        photoDetails: {
                          photo: "",
                          isShow: false,
                          _id: "666e703374ca9f27515da5c8",
                          id: "666e703374ca9f27515da5c8"
                        },
                        jobDetails: {
                          job: "",
                          isShow: false,
                          _id: "666e703374ca9f27515da5ca",
                          id: "666e703374ca9f27515da5ca"
                        },
                        _id: "665fe1c831e8f0630d40703d",
                        userId: "665fe01431e8f0630d407037",
                        nickNameDetails: {
                          nickName: "咚咚",
                          isShow: true,
                          _id: "665fe1c831e8f0630d40703e",
                          id: "665fe1c831e8f0630d40703e"
                        },
                        userStatus: {
                          commentScore: 3.7,
                          commentCount: 8,
                          rating: 0,
                          isMatch: false,
                          point: 0,
                          _id: "666e703374ca9f27515da5cc",
                          id: "666e703374ca9f27515da5cc"
                        },
                        id: "665fe1c831e8f0630d40703d"
                      }
                    ],
                    id: "666e6f3429840a156b11afbf"
                  }
                ],
                pagination: {
                  page: 1,
                  perPage: 6,
                  totalCount: 11
                }
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
         $commentedUserId:"66487581f6f2c93ddd16ff00",
         $content:"test777777",
         $score: 5
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
                 score: 5,
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
       * #swagger.parameters["body"] = {
       in: "body",
       description: "刪除評價",
       required: true,
       schema: {
         $commentedUserId:"66487581f6f2c93ddd16ff00",
       }
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
                 score: 5,
                 createdAt: "2024-05-19T04:05:16.243Z",
                 updatedAt: "2024-05-19T04:05:16.243Z"
               }
           }
       }
   */
  next()
}
