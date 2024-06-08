import { type NextFunction, type Request, type Response } from "express"

export function editMatchListSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["matchList-配對設定"]
   * #swagger.description = "編輯配對設定"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
    * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "編輯配對設定",
      schema: {
            $personalInfo: {
              $age: 1,
              $gender: 1,
              $isMarried: 1,
              $height: 1,
              $weight: 1,
              $socialCircle: 1,
              $activities: [1],
              $location: 1,
              $education: 1,
              $liveWithParents: 1,
              $religion: 1,
              $smoking: 1
            },
            $workInfo: {
              $occupation: 1,
              $industry: [1],
              $workLocation: 1,
              $expectedSalary: 1
            },
            $blacklist: {
              $occupation: 0,
              $industry: [0],
              $socialCircle: 0,
              $activities: [0],
              $smokingOptions: 0
            },
            $noticeInfo: {
              $email: "",
              $notice: false
    }
      }
    }
   * #swagger.responses[201] = {
      description: "編輯配對設定成功",
      schema: {
        status: true,
        message: "編輯配對設定成功",
        data: {
                    "personalInfo": {
                      "age": 1,
                      "gender": 1,
                      "isMarried": 1,
                      "height": 1,
                      "weight": 1,
                      "socialCircle": 1,
                      "activities": [
                        1
                      ],
                      "location": 1,
                      "education": 1,
                      "liveWithParents": 1,
                      "religion": 1,
                      "smoking": 1
                    },
                    "workInfo": {
                      "occupation": 1,
                      "industry": [
                        1
                      ],
                      "workLocation": 1,
                      "expectedSalary": 1
                    },
                    "blacklist": {
                      "occupation": 1,
                      "industry": [
                        1
                      ],
                      "socialCircle": 1,
                      "activities": [
                        1
                      ],
                      "smokingOptions": 1
                    },
                    "noticeInfo": {
                      "email": "",
                      "notice": false
                    },
                    "_id": "665c3a32c06a9436c9bc2401",
                    "userId": "665c1a800aa26fb4fb4e9823",
                    "createdAt": "2024-06-02T09:24:02.313Z",
                    "updatedAt": "2024-06-02T09:24:02.313Z",
                    "__v": 0
    }
      } 
    }
   */
  next()
}

export const getMatchListSwagger = (_req: Request, _res: Response, next: NextFunction): void => {
  /**
   * #swagger.tags = ["matchList-配對設定"]
   * #swagger.description = "取得配對設定"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.responses[201] = {
      description: "取得配對設定成功",
      schema: {
        status: true,
        message: "取得配對設定成功",
        data: {
          matchList: {
              "personalInfo": {
                "age": 0,
                "gender": 0,
                "isMarried": 0,
                "height": 0,
                "weight": 0,
                "socialCircle": 0,
                "activities": [
                  0
                ],
                "location": 0,
                "education": 0,
                "liveWithParents": 0,
                "religion": 0,
                "smoking": 0
              },
              "workInfo": {
                "occupation": 0,
                "industry": [
                  0
                ],
                "workLocation": 0,
                "expectedSalary": 0
              },
              "blacklist": {
                "occupation": 0,
                "industry": [
                  0
                ],
                "socialCircle": 0,
                "activities": [
                  0
                ],
                "smokingOptions": 0
              },
              "noticeInfo": {
                "email": "",
                "notice": false
              },
              "_id": "665c3a32c06a9436c9bc2401",
              "userId": "665c1a800aa26fb4fb4e9823",
              "createdAt": "2024-06-02T09:24:02.313Z",
              "updatedAt": "2024-06-02T09:24:02.313Z",
              "__v": 0
    }
      }
    }
      } 
    }
   */
  next()
}

export const getMatchListOptionSwagger = (_req: Request, _res: Response, next: NextFunction): void => {
  /**
   * #swagger.tags = ["matchList-配對設定"]
   * #swagger.description = "取得配對設定"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.responses[201] = {
      description: "取得配對設定成功",
      schema: {
        status: true,
        message: "取得配對設定成功",
        data: {
            "ageOptions": {
              "0": "無指定",
              "1": "20-22 歲",
              "2": "23-25 歲",
              "3": "26-28 歲",
              "4": "29-31 歲",
              "5": "32-34 歲",
              "6": "35-37 歲",
              "7": "38-40 歲",
              "8": "41-43 歲",
              "9": "44-46 歲",
              "10": "47-50 歲",
              "11": "50 歲以上"
            },
            "genderOptions": {
              "0": "無指定",
              "1": "男性",
              "2": "女性",
              "3": "其他",
              "4": "不透露"
            },
            "heightOptions": {
              "0": "無指定",
              "1": "150cm 以下",
              "2": "150-155cm",
              "3": "155-160cm",
              "4": "160-165cm",
              "5": "165-170cm",
              "6": "170-175cm",
              "7": "175-180cm",
              "8": "180-185cm",
              "9": "185-190cm",
              "10": "190cm 以上",
              "11": "不透露"
            },
            "weightOptions": {
              "0": "無指定",
              "1": "50kg 以下",
              "2": "50-55kg",
              "3": "55-60kg",
              "4": "60-65kg",
              "5": "65-70kg",
              "6": "70-75kg",
              "7": "75-80kg",
              "8": "80-85kg",
              "9": "85-90kg",
              "10": "90kg 以上",
              "11": "不透露"
            },
            "isMarriedOptions": {
              "0": "無指定",
              "1": "已婚",
              "2": "未婚",
              "3": "離婚"
            },
            "locationOptions": {
              "0": "無指定",
              "1": "北部",
              "2": "南部",
              "3": "東部",
              "4": "西部",
              "5": "中部",
              "6": "海外"
            },
            "educationOptions": {
              "0": "無指定",
              "1": "國小",
              "2": "國中",
              "3": "高中",
              "4": "大學",
              "5": "研究所",
              "6": "博士後研究"
            },
            "liveWithParentsOptions": {
              "0": "無指定",
              "1": "與父母同住",
              "2": "獨立居住",
              "3": "其他"
            },
            "religionOptions": {
              "0": "無指定",
              "1": "基督教",
              "2": "佛教",
              "3": "道教",
              "4": "伊斯蘭教",
              "5": "天主教",
              "6": "印度教",
              "7": "錫克教",
              "8": "猶太教",
              "9": "其他"
            },
            "smokingOptions": {
              "0": "無指定",
              "1": "不抽菸",
              "2": "偶爾抽菸",
              "3": "經常抽菸",
              "4": "電子菸"
            },
            "socialCircleOptions": {
              "0": "無指定",
              "1": "外籍人士",
              "2": "本地人",
              "3": "藝術",
              "4": "音樂",
              "5": "運動",
              "6": "電影",
              "7": "烹飪",
              "8": "旅遊",
              "9": "攝影",
              "10": "閱讀",
              "11": "其他"
            },
            "activitiesOptions": {
              "0": "無指定",
              "1": "健行",
              "2": "園藝",
              "3": "慈善",
              "4": "其他"
            },
            "occupationOptions": {
              "0": "無指定",
              "1": "軍人",
              "2": "警察",
              "3": "消防員",
              "4": "教育",
              "5": "醫療",
              "6": "自由業",
              "7": "家庭主婦",
              "8": "學生",
              "9": "其他"
            },
            "industryOptions": {
              "0": "無指定",
              "1": "餐旅",
              "2": "科技",
              "3": "金融",
              "4": "零售",
              "5": "製造",
              "6": "農業",
              "7": "礦業",
              "8": "營建業",
              "9": "運輸業",
              "10": "倉儲業",
              "11": "資訊業",
              "12": "其他"
            },
            "expectedSalary": {
              "0": "無指定",
              "1": "20-25k",
              "2": "25-30k",
              "3": "30-35k",
              "4": "35-40k",
              "5": "40-45k",
              "6": "45-50k",
              "7": "50k以上"
      }
    }
      }
    }
   */
  next()
}

export const findUsersByMultipleConditionsSwagger = (_req: Request, _res: Response, next: NextFunction): void => {
  /**
   * #swagger.tags = ["matchList-配對設定"]
   * #swagger.description = "查詢配對"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.responses[201] = {
      description: "查詢配對成功",
      schema: {
      status: true,
      message: "查詢配對成功",
      data: {}
    }
  }
   */
  next()
}

// MatchListSelfSetting
export function editMatchListSelfSettingSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["matchList-配對設定"]
   * #swagger.description = "編輯配對設定"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
    * #swagger.parameters['body'] = {
      in: "body",
      required: true,
      type: "Object",
      description: "編輯配對設定",
      schema: {
        $matchList: {
            $personalInfo: {
              $age: 0,
              $gender: 0,
              $isMarried: 0,
              $height: 0,
              $weight: 0,
              $socialCircle: 0,
              $activities: [0],
              $location: 0,
              $education: 0,
              $liveWithParents: 0,
              $religion: 0,
              $smoking: 0
            },
            $workInfo: {
              $occupation: 0,
              $industry: [0],
              $workLocation: 0,
              $expectedSalary: 0
            },
            $blacklist: {
              $occupation: 1,
              $industry: [1],
              $socialCircle: 1,
              $activities: [1],
              $smokingOptions: 1
            },
            $noticeInfo: {
              $email: "",
              $notice: false
      }
    }
      }
    }
   * #swagger.responses[201] = {
      description: "編輯配對設定成功",
      schema: {
        status: true,
        message: "編輯配對設定成功",
        data: {
                    "personalInfo": {
                      "age": 0,
                      "gender": 0,
                      "isMarried": 0,
                      "height": 0,
                      "weight": 0,
                      "socialCircle": 0,
                      "activities": [
                        0
                      ],
                      "location": 0,
                      "education": 0,
                      "liveWithParents": 0,
                      "religion": 0,
                      "smoking": 0
                    },
                    "workInfo": {
                      "occupation": 0,
                      "industry": [
                        0
                      ],
                      "workLocation": 0,
                      "expectedSalary": 0
                    },
                    "_id": "665c3a32c06a9436c9bc2401",
                    "userId": "665c1a800aa26fb4fb4e9823",
                    "createdAt": "2024-06-02T09:24:02.313Z",
                    "updatedAt": "2024-06-02T09:24:02.313Z",
                    "__v": 0
    }
      } 
    }
   */
  next()
}

export const getMatchListSelfSettingSwagger = (_req: Request, _res: Response, next: NextFunction): void => {
  /**
   * #swagger.tags = ["matchList-配對設定"]
   * #swagger.description = "取得配對設定"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.responses[201] = {
      description: "取得配對設定成功",
      schema: {
        status: true,
        message: "取得配對設定成功",
        data: {
          matchList: {
              "personalInfo": {
                "age": 0,
                "gender": 0,
                "isMarried": 0,
                "height": 0,
                "weight": 0,
                "socialCircle": 0,
                "activities": [
                  0
                ],
                "location": 0,
                "education": 0,
                "liveWithParents": 0,
                "religion": 0,
                "smoking": 0
              },
              "workInfo": {
                "occupation": 0,
                "industry": [
                  0
                ],
                "workLocation": 0,
                "expectedSalary": 0
              },
              "_id": "665c3a32c06a9436c9bc2401",
              "userId": "665c1a800aa26fb4fb4e9823",
              "createdAt": "2024-06-02T09:24:02.313Z",
              "updatedAt": "2024-06-02T09:24:02.313Z",
              "__v": 0
    }
      }
    }
      } 
    }
   */
  next()
}