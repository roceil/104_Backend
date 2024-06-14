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
        "status": true,
        "message": "取得配對設定選項",
        "data": [
          {
            "_id": "66640491ecea631ba30e19dd",
            "age": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e19de"
              },
              {
                "value": 1,
                "label": "20-22 歲",
                "_id": "66640491ecea631ba30e19df"
              },
              {
                "value": 2,
                "label": "23-25 歲",
                "_id": "66640491ecea631ba30e19e0"
              },
              {
                "value": 3,
                "label": "26-28 歲",
                "_id": "66640491ecea631ba30e19e1"
              },
              {
                "value": 4,
                "label": "29-31 歲",
                "_id": "66640491ecea631ba30e19e2"
              },
              {
                "value": 5,
                "label": "32-34 歲",
                "_id": "66640491ecea631ba30e19e3"
              },
              {
                "value": 6,
                "label": "35-37 歲",
                "_id": "66640491ecea631ba30e19e4"
              },
              {
                "value": 7,
                "label": "38-40 歲",
                "_id": "66640491ecea631ba30e19e5"
              },
              {
                "value": 8,
                "label": "41-43 歲",
                "_id": "66640491ecea631ba30e19e6"
              },
              {
                "value": 9,
                "label": "44-46 歲",
                "_id": "66640491ecea631ba30e19e7"
              },
              {
                "value": 10,
                "label": "47-50 歲",
                "_id": "66640491ecea631ba30e19e8"
              },
              {
                "value": 11,
                "label": "50 歲以上",
                "_id": "66640491ecea631ba30e19e9"
              }
            ],
            "gender": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e19ea"
              },
              {
                "value": 1,
                "label": "男性",
                "_id": "66640491ecea631ba30e19eb"
              },
              {
                "value": 2,
                "label": "女性",
                "_id": "66640491ecea631ba30e19ec"
              },
              {
                "value": 3,
                "label": "其他",
                "_id": "66640491ecea631ba30e19ed"
              },
              {
                "value": 4,
                "label": "不透露",
                "_id": "66640491ecea631ba30e19ee"
              }
            ],
            "height": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e19ef"
              },
              {
                "value": 1,
                "label": "150cm 以下",
                "_id": "66640491ecea631ba30e19f0"
              },
              {
                "value": 2,
                "label": "150-155cm",
                "_id": "66640491ecea631ba30e19f1"
              },
              {
                "value": 3,
                "label": "155-160cm",
                "_id": "66640491ecea631ba30e19f2"
              },
              {
                "value": 4,
                "label": "160-165cm",
                "_id": "66640491ecea631ba30e19f3"
              },
              {
                "value": 5,
                "label": "165-170cm",
                "_id": "66640491ecea631ba30e19f4"
              },
              {
                "value": 6,
                "label": "170-175cm",
                "_id": "66640491ecea631ba30e19f5"
              },
              {
                "value": 7,
                "label": "175-180cm",
                "_id": "66640491ecea631ba30e19f6"
              },
              {
                "value": 8,
                "label": "180-185cm",
                "_id": "66640491ecea631ba30e19f7"
              },
              {
                "value": 9,
                "label": "185-190cm",
                "_id": "66640491ecea631ba30e19f8"
              },
              {
                "value": 10,
                "label": "190cm 以上",
                "_id": "66640491ecea631ba30e19f9"
              },
              {
                "value": 11,
                "label": "不透露",
                "_id": "66640491ecea631ba30e19fa"
              }
            ],
            "weight": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e19fb"
              },
              {
                "value": 1,
                "label": "50kg 以下",
                "_id": "66640491ecea631ba30e19fc"
              },
              {
                "value": 2,
                "label": "50-55kg",
                "_id": "66640491ecea631ba30e19fd"
              },
              {
                "value": 3,
                "label": "55-60kg",
                "_id": "66640491ecea631ba30e19fe"
              },
              {
                "value": 4,
                "label": "60-65kg",
                "_id": "66640491ecea631ba30e19ff"
              },
              {
                "value": 5,
                "label": "65-70kg",
                "_id": "66640491ecea631ba30e1a00"
              },
              {
                "value": 6,
                "label": "70-75kg",
                "_id": "66640491ecea631ba30e1a01"
              },
              {
                "value": 7,
                "label": "75-80kg",
                "_id": "66640491ecea631ba30e1a02"
              },
              {
                "value": 8,
                "label": "80-85kg",
                "_id": "66640491ecea631ba30e1a03"
              },
              {
                "value": 9,
                "label": "85-90kg",
                "_id": "66640491ecea631ba30e1a04"
              },
              {
                "value": 10,
                "label": "90kg 以上",
                "_id": "66640491ecea631ba30e1a05"
              },
              {
                "value": 11,
                "label": "不透露",
                "_id": "66640491ecea631ba30e1a06"
              }
            ],
            "isMarried": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a07"
              },
              {
                "value": 1,
                "label": "已婚",
                "_id": "66640491ecea631ba30e1a08"
              },
              {
                "value": 2,
                "label": "未婚",
                "_id": "66640491ecea631ba30e1a09"
              },
              {
                "value": 3,
                "label": "離婚",
                "_id": "66640491ecea631ba30e1a0a"
              }
            ],
            "location": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a0b"
              },
              {
                "value": 1,
                "label": "北部",
                "_id": "66640491ecea631ba30e1a0c"
              },
              {
                "value": 2,
                "label": "南部",
                "_id": "66640491ecea631ba30e1a0d"
              },
              {
                "value": 3,
                "label": "東部",
                "_id": "66640491ecea631ba30e1a0e"
              },
              {
                "value": 4,
                "label": "西部",
                "_id": "66640491ecea631ba30e1a0f"
              },
              {
                "value": 5,
                "label": "中部",
                "_id": "66640491ecea631ba30e1a10"
              },
              {
                "value": 6,
                "label": "海外",
                "_id": "66640491ecea631ba30e1a11"
              }
            ],
            "education": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a12"
              },
              {
                "value": 1,
                "label": "國小",
                "_id": "66640491ecea631ba30e1a13"
              },
              {
                "value": 2,
                "label": "國中",
                "_id": "66640491ecea631ba30e1a14"
              },
              {
                "value": 3,
                "label": "高中",
                "_id": "66640491ecea631ba30e1a15"
              },
              {
                "value": 4,
                "label": "大學",
                "_id": "66640491ecea631ba30e1a16"
              },
              {
                "value": 5,
                "label": "研究所",
                "_id": "66640491ecea631ba30e1a17"
              },
              {
                "value": 6,
                "label": "博士後研究",
                "_id": "66640491ecea631ba30e1a18"
              }
            ],
            "liveWithParents": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a19"
              },
              {
                "value": 1,
                "label": "與父母同住",
                "_id": "66640491ecea631ba30e1a1a"
              },
              {
                "value": 2,
                "label": "獨立居住",
                "_id": "66640491ecea631ba30e1a1b"
              },
              {
                "value": 3,
                "label": "其他",
                "_id": "66640491ecea631ba30e1a1c"
              }
            ],
            "religion": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a1d"
              },
              {
                "value": 1,
                "label": "基督教",
                "_id": "66640491ecea631ba30e1a1e"
              },
              {
                "value": 2,
                "label": "佛教",
                "_id": "66640491ecea631ba30e1a1f"
              },
              {
                "value": 3,
                "label": "道教",
                "_id": "66640491ecea631ba30e1a20"
              },
              {
                "value": 4,
                "label": "伊斯蘭教",
                "_id": "66640491ecea631ba30e1a21"
              },
              {
                "value": 5,
                "label": "天主教",
                "_id": "66640491ecea631ba30e1a22"
              },
              {
                "value": 6,
                "label": "印度教",
                "_id": "66640491ecea631ba30e1a23"
              },
              {
                "value": 7,
                "label": "錫克教",
                "_id": "66640491ecea631ba30e1a24"
              },
              {
                "value": 8,
                "label": "猶太教",
                "_id": "66640491ecea631ba30e1a25"
              },
              {
                "value": 9,
                "label": "其他",
                "_id": "66640491ecea631ba30e1a26"
              }
            ],
            "smoking": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a27"
              },
              {
                "value": 1,
                "label": "不抽菸",
                "_id": "66640491ecea631ba30e1a28"
              },
              {
                "value": 2,
                "label": "偶爾抽菸",
                "_id": "66640491ecea631ba30e1a29"
              },
              {
                "value": 3,
                "label": "經常抽菸",
                "_id": "66640491ecea631ba30e1a2a"
              },
              {
                "value": 4,
                "label": "電子菸",
                "_id": "66640491ecea631ba30e1a2b"
              }
            ],
            "socialCircle": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a2c"
              },
              {
                "value": 1,
                "label": "外籍人士",
                "_id": "66640491ecea631ba30e1a2d"
              },
              {
                "value": 2,
                "label": "本地人",
                "_id": "66640491ecea631ba30e1a2e"
              },
              {
                "value": 3,
                "label": "藝術",
                "_id": "66640491ecea631ba30e1a2f"
              },
              {
                "value": 4,
                "label": "音樂",
                "_id": "66640491ecea631ba30e1a30"
              },
              {
                "value": 5,
                "label": "運動",
                "_id": "66640491ecea631ba30e1a31"
              },
              {
                "value": 6,
                "label": "電影",
                "_id": "66640491ecea631ba30e1a32"
              },
              {
                "value": 7,
                "label": "烹飪",
                "_id": "66640491ecea631ba30e1a33"
              },
              {
                "value": 8,
                "label": "旅遊",
                "_id": "66640491ecea631ba30e1a34"
              },
              {
                "value": 9,
                "label": "攝影",
                "_id": "66640491ecea631ba30e1a35"
              },
              {
                "value": 10,
                "label": "閱讀",
                "_id": "66640491ecea631ba30e1a36"
              },
              {
                "value": 11,
                "label": "其他",
                "_id": "66640491ecea631ba30e1a37"
              }
            ],
            "activities": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a38"
              },
              {
                "value": 1,
                "label": "健行",
                "_id": "66640491ecea631ba30e1a39"
              },
              {
                "value": 2,
                "label": "園藝",
                "_id": "66640491ecea631ba30e1a3a"
              },
              {
                "value": 3,
                "label": "慈善",
                "_id": "66640491ecea631ba30e1a3b"
              },
              {
                "value": 4,
                "label": "其他",
                "_id": "66640491ecea631ba30e1a3c"
              }
            ],
            "occupation": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a3d"
              },
              {
                "value": 1,
                "label": "軍人",
                "_id": "66640491ecea631ba30e1a3e"
              },
              {
                "value": 2,
                "label": "警察",
                "_id": "66640491ecea631ba30e1a3f"
              },
              {
                "value": 3,
                "label": "消防員",
                "_id": "66640491ecea631ba30e1a40"
              },
              {
                "value": 4,
                "label": "教育",
                "_id": "66640491ecea631ba30e1a41"
              },
              {
                "value": 5,
                "label": "醫療",
                "_id": "66640491ecea631ba30e1a42"
              },
              {
                "value": 6,
                "label": "自由業",
                "_id": "66640491ecea631ba30e1a43"
              },
              {
                "value": 7,
                "label": "家庭主婦",
                "_id": "66640491ecea631ba30e1a44"
              },
              {
                "value": 8,
                "label": "學生",
                "_id": "66640491ecea631ba30e1a45"
              },
              {
                "value": 9,
                "label": "其他",
                "_id": "66640491ecea631ba30e1a46"
              }
            ],
            "industry": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a47"
              },
              {
                "value": 1,
                "label": "餐旅",
                "_id": "66640491ecea631ba30e1a48"
              },
              {
                "value": 2,
                "label": "科技",
                "_id": "66640491ecea631ba30e1a49"
              },
              {
                "value": 3,
                "label": "金融",
                "_id": "66640491ecea631ba30e1a4a"
              },
              {
                "value": 4,
                "label": "零售",
                "_id": "66640491ecea631ba30e1a4b"
              },
              {
                "value": 5,
                "label": "製造",
                "_id": "66640491ecea631ba30e1a4c"
              },
              {
                "value": 6,
                "label": "農業",
                "_id": "66640491ecea631ba30e1a4d"
              },
              {
                "value": 7,
                "label": "礦業",
                "_id": "66640491ecea631ba30e1a4e"
              },
              {
                "value": 8,
                "label": "營建業",
                "_id": "66640491ecea631ba30e1a4f"
              },
              {
                "value": 9,
                "label": "運輸業",
                "_id": "66640491ecea631ba30e1a50"
              },
              {
                "value": 10,
                "label": "倉儲業",
                "_id": "66640491ecea631ba30e1a51"
              },
              {
                "value": 11,
                "label": "資訊業",
                "_id": "66640491ecea631ba30e1a52"
              },
              {
                "value": 12,
                "label": "其他",
                "_id": "66640491ecea631ba30e1a53"
              }
            ],
            "expectedSalary": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a54"
              },
              {
                "value": 1,
                "label": "20-25k",
                "_id": "66640491ecea631ba30e1a55"
              },
              {
                "value": 2,
                "label": "25-30k",
                "_id": "66640491ecea631ba30e1a56"
              },
              {
                "value": 3,
                "label": "30-35k",
                "_id": "66640491ecea631ba30e1a57"
              },
              {
                "value": 4,
                "label": "35-40k",
                "_id": "66640491ecea631ba30e1a58"
              },
              {
                "value": 5,
                "label": "40-45k",
                "_id": "66640491ecea631ba30e1a59"
              },
              {
                "value": 6,
                "label": "45-50k",
                "_id": "66640491ecea631ba30e1a5a"
              },
              {
                "value": 7,
                "label": "50k以上",
                "_id": "66640491ecea631ba30e1a5b"
              }
            ],
            "banSmoking": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a5c"
              },
              {
                "value": 1,
                "label": "不抽菸",
                "_id": "66640491ecea631ba30e1a5d"
              },
              {
                "value": 2,
                "label": "偶爾抽菸",
                "_id": "66640491ecea631ba30e1a5e"
              },
              {
                "value": 3,
                "label": "經常抽菸",
                "_id": "66640491ecea631ba30e1a5f"
              },
              {
                "value": 4,
                "label": "電子菸",
                "_id": "66640491ecea631ba30e1a60"
              }
            ],
            "banOccupation": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a61"
              },
              {
                "value": 1,
                "label": "軍人",
                "_id": "66640491ecea631ba30e1a62"
              },
              {
                "value": 2,
                "label": "警察",
                "_id": "66640491ecea631ba30e1a63"
              },
              {
                "value": 3,
                "label": "消防員",
                "_id": "66640491ecea631ba30e1a64"
              },
              {
                "value": 4,
                "label": "教育",
                "_id": "66640491ecea631ba30e1a65"
              },
              {
                "value": 5,
                "label": "醫療",
                "_id": "66640491ecea631ba30e1a66"
              },
              {
                "value": 6,
                "label": "自由業",
                "_id": "66640491ecea631ba30e1a67"
              },
              {
                "value": 7,
                "label": "家庭主婦",
                "_id": "66640491ecea631ba30e1a68"
              },
              {
                "value": 8,
                "label": "學生",
                "_id": "66640491ecea631ba30e1a69"
              },
              {
                "value": 9,
                "label": "其他",
                "_id": "66640491ecea631ba30e1a6a"
              }
            ],
            "banIndustry": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a6b"
              },
              {
                "value": 1,
                "label": "餐旅",
                "_id": "66640491ecea631ba30e1a6c"
              },
              {
                "value": 2,
                "label": "科技",
                "_id": "66640491ecea631ba30e1a6d"
              },
              {
                "value": 3,
                "label": "金融",
                "_id": "66640491ecea631ba30e1a6e"
              },
              {
                "value": 4,
                "label": "零售",
                "_id": "66640491ecea631ba30e1a6f"
              },
              {
                "value": 5,
                "label": "製造",
                "_id": "66640491ecea631ba30e1a70"
              },
              {
                "value": 6,
                "label": "農業",
                "_id": "66640491ecea631ba30e1a71"
              },
              {
                "value": 7,
                "label": "礦業",
                "_id": "66640491ecea631ba30e1a72"
              },
              {
                "value": 8,
                "label": "營建業",
                "_id": "66640491ecea631ba30e1a73"
              },
              {
                "value": 9,
                "label": "運輸業",
                "_id": "66640491ecea631ba30e1a74"
              },
              {
                "value": 10,
                "label": "倉儲業",
                "_id": "66640491ecea631ba30e1a75"
              },
              {
                "value": 11,
                "label": "資訊業",
                "_id": "66640491ecea631ba30e1a76"
              },
              {
                "value": 12,
                "label": "其他",
                "_id": "66640491ecea631ba30e1a77"
              }
            ],
            "banExpectedSalary": [
              {
                "value": 0,
                "label": "無指定",
                "_id": "66640491ecea631ba30e1a78"
              },
              {
                "value": 1,
                "label": "20-25k",
                "_id": "66640491ecea631ba30e1a79"
              },
              {
                "value": 2,
                "label": "25-30k",
                "_id": "66640491ecea631ba30e1a7a"
              },
              {
                "value": 3,
                "label": "30-35k",
                "_id": "66640491ecea631ba30e1a7b"
              },
              {
                "value": 4,
                "label": "35-40k",
                "_id": "66640491ecea631ba30e1a7c"
              },
              {
                "value": 5,
                "label": "40-45k",
                "_id": "66640491ecea631ba30e1a7d"
              },
              {
                "value": 6,
                "label": "45-50k",
                "_id": "66640491ecea631ba30e1a7e"
              },
              {
                "value": 7,
                "label": "50k以上",
                "_id": "66640491ecea631ba30e1a7f"
              }
            ],
            "__v": 0
          }
        ]
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