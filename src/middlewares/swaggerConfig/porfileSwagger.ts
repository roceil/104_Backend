import { type NextFunction, type Request, type Response } from "express"
export function getProfileSwagger (_req: Request, _res: Response, next: NextFunction): void {
/**
 * #swagger.tags = ["Profile-會員資料"]
 * #swagger.description = "取得會員資料"
 * #swagger.security = [{
      "apiKeyAuth":[]
    }]
 * #swagger.responses[200] = {
            description: "註冊資訊",
            schema: {
                status: true,
                message: "查詢成功",
                data: {
                  _id: "6642c1504ff7d57fb94d9115",
                  userId: "6642bfaec60d4f7c475d8401",
                  nickNameDetails: {
                    nickName: "Eason",
                    isShow: false,
                    },
                  tags: [
                    "test1",
                    "test2"
                  ],
                  createdAt: "2024-05-14T01:41:36.960Z",
                  updatedAt: "2024-05-14T02:10:50.806Z",
                  companyDetails: {
                    company: "test company",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161ea"
                  },
                  exposureSettings: {
                    rating: 5,
                    isShow: true,
                    isMatch: true,
                    _id: "66670afb8e86cd62fa3161e6"
                  },
                  incomeDetails: {
                    income: "test income",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161e9"
                  },
                  introDetails: {
                    intro: "test intro",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161ed"
                  },
                  jobDetails: {
                    job: "test job",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161e7"
                  },
                  lineDetails: {
                    lineId: "test line",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161e8"
                  },
                  phoneDetails: {
                    phone: "0987654321",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161eb"
                  },
                  photoDetails: {
                    photo: "https://i.imgur.com/XgbZdeA.jpeg",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161ee"
                  },
                  userInfo: {
                    _id: "665c2f502ab2d6460452171c",
                    personalInfo: {
                      username: "Eason",
                      email: "56asdf@hotmail.com",
                      gender: null,
                      birthday: null,
                      _id: "665c2f502ab2d6460452171d"
                    },
                    isSubscribe: false,
                    points: 0,
                    resetPasswordToken: "",
                    isActive: true,
                    blockedUsers: [],
                    notifications: [],
                    createdAt: "2024-05-14T01:34:38.298Z",
                    updatedAt: "2024-05-14T01:34:38.298Z"
                  }
                }
            }
        }
 */
  next()
}
export function getProfileByIdSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
 * #swagger.tags = ["Profile-會員資料"]
 * #swagger.description = "取得會員資料"
 * #swagger.security = [{
      "apiKeyAuth":[]
    }]
 * #swagger.responses[200] = {
            description: "註冊資訊",
            schema: {
                status: true,
                message: "查詢成功",
                data: {
                  _id: "6642c1504ff7d57fb94d9115",
                  userId: "6642bfaec60d4f7c475d8401",
                  nickNameDetails: {
                    nickName: "Eason",
                    isShow: false,
                    },
                  tags: [],
                  createdAt: "2024-05-14T01:41:36.960Z",
                  updatedAt: "2024-05-14T02:10:50.806Z"
                }
            }
        }
 */
  next()
}
export function postProfileSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Profile-會員資料"]
   * #swagger.description = "新增會員資料"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters["body"] = {
            in: "body",
            type: Object,
            required: true,
            description: "資料格式",
            schema: {
                nickNameDetails:{
                  nickName:"Jack",
                  isShow:true
                }
            }
    }
   * #swagger.responses[200] = {
            description: "註冊資訊",
            schema: {
                status: true,
                message: "用戶新增成功",
                data: {
                  _id: "6642bfaec60d4f7c475d8401",
                  personalInfo: {
                  email: "a444455555@hotmail.com",
                  username: "咚咚",
                  gender: null,
                  birthday: null,
                },
                isSubscribe: false,
                points: 0,
                resetPasswordToken: "",
                isActive: true,
                blockedUsers: [],
                notifications: [],
                createdAt: "2024-05-14T01:34:38.298Z",
                updatedAt: "2024-05-14T01:34:38.298Z"
                }
            }
        }
   */
  next()
}
export function putProfileSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["Profile-會員資料"]
   * #swagger.description = "修改會員資料"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters["body"] = {
            in: "body",
            type: Object,
            required: true,
            description: "資料格式",
            schema: {
                photoDetails: {
                  photo:"https://i.imgur.com/XgbZdeA.jpeg",
                  isShow:true
                },
                introDetails: {
                  intro:"test intro",
                  isShow:true
                },
                nickNameDetails:{
                  nickName:"Jack",
                  isShow:true
                },
                phoneDetails:{
                  phone:"0987654321",
                  isShow:true
                },
                companyDetails:{
                  company:"test company",
                  isShow:true
                },
                incomeDetails:{
                  income:"test income",
                  isShow:true
                },
                lineDetails:{
                  lineId:"test line",
                  isShow:true
                },
                jobDetails:{
                  job:"test job",
                  isShow:true
                },
                tags:["test1","test2"],
                exposureSettings:{
                  rating:5,
                  isShow:true,
                  isMatch:true
                },
            }
    }
   * #swagger.responses[200] = {
            description: '修改使用者資訊',
            schema: {
                status: true,
                message: "修改資料成功",
                data: {
                  _id: "6642bfaec60d4f7c475d8401",
                  unlockComment: [],
                  userStatus: {
                    rating: 0,
                    isMatch: false,
                    _id: "66670afb8e86cd62fa3161f9"
                  },
                  userId: "665c2f502ab2d6460452171c",
                  nickNameDetails: {
                    nickName: "Jack",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161ec"
                  },
                  tags: [
                    "test1",
                    "test2"
                  ],
                  companyDetails: {
                    company: "test company",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161ea"
                  },
                  exposureSettings: {
                    rating: 5,
                    isShow: true,
                    isMatch: true,
                    _id: "66670afb8e86cd62fa3161e6"
                  },
                  incomeDetails: {
                    income: "test income",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161e9"
                  },
                  introDetails: {
                    intro: "test intro",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161ed"
                  },
                  jobDetails: {
                    job: "test job",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161e7"
                  },
                  lineDetails: {
                    lineId: "test line",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161e8"
                  },
                  phoneDetails: {
                    phone: "0987654321",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161eb"
                  },
                  photoDetails: {
                    photo: "https://i.imgur.com/XgbZdeA.jpeg",
                    isShow: true,
                    _id: "66670afb8e86cd62fa3161ee"
                  },
                  point: 0,
                createdAt: "2024-05-14T01:34:38.298Z",
                updatedAt: "2024-05-14T01:34:38.298Z"
                }
            }
        }
   */
  next()
}
