import { Schema, model, type Document } from "mongoose"

interface MatchListOptionDocument extends Document {
  age: Array<{ value: number, label: string }>
  gender: Array<{ value: number, label: string }>
  height: Array<{ value: number, label: string }>
  weight: Array<{ value: number, label: string }>
  isMarried: Array<{ value: number, label: string }>
  location: Array<{ value: number, label: string }>
  education: Array<{ value: number, label: string }>
  liveWithParents: Array<{ value: number, label: string }>
  religion: Array<{ value: number, label: string }>
  smoking: Array<{ value: number, label: string }>
  socialCircle: Array<{ value: number, label: string }>
  activities: Array<{ value: number, label: string }>
  occupation: Array<{ value: number, label: string }>
  industry: Array<{ value: number, label: string }>
  expectedSalary: Array<{ value: number, label: string }>
  banSmoking: Array<{ value: number, label: string }>
  banOccupation: Array<{ value: number, label: string }>
  banIndustry: Array<{ value: number, label: string }>
  banExpectedSalary: Array<{ value: number, label: string }>
}

const matchListOptionSchema = new Schema<MatchListOptionDocument>({
  age: [{ value: Number, label: String }],
  gender: [{ value: Number, label: String }],
  height: [{ value: Number, label: String }],
  weight: [{ value: Number, label: String }],
  isMarried: [{ value: Number, label: String }],
  location: [{ value: Number, label: String }],
  education: [{ value: Number, label: String }],
  liveWithParents: [{ value: Number, label: String }],
  religion: [{ value: Number, label: String }],
  smoking: [{ value: Number, label: String }],
  socialCircle: [{ value: Number, label: String }],
  activities: [{ value: Number, label: String }],
  occupation: [{ value: Number, label: String }],
  industry: [{ value: Number, label: String }],
  expectedSalary: [{ value: Number, label: String }],
  banSmoking: [{ value: Number, label: String }],
  banOccupation: [{ value: Number, label: String }],
  banIndustry: [{ value: Number, label: String }],
  banExpectedSalary: [{ value: Number, label: String }]
})

const matchListOption = model("matchListOption", matchListOptionSchema)

// 初始化選項資料
const initOptions = async () => {
  const options = {
    age: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "20-22 歲" },
      { value: 2, label: "23-25 歲" },
      { value: 3, label: "26-28 歲" },
      { value: 4, label: "29-31 歲" },
      { value: 5, label: "32-34 歲" },
      { value: 6, label: "35-37 歲" },
      { value: 7, label: "38-40 歲" },
      { value: 8, label: "41-43 歲" },
      { value: 9, label: "44-46 歲" },
      { value: 10, label: "47-50 歲" },
      { value: 11, label: "50 歲以上" }
    ],
    gender: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "男性" },
      { value: 2, label: "女性" },
      { value: 3, label: "其他" },
      { value: 4, label: "不透露" }
    ],
    height: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "150cm 以下" },
      { value: 2, label: "150-155cm" },
      { value: 3, label: "155-160cm" },
      { value: 4, label: "160-165cm" },
      { value: 5, label: "165-170cm" },
      { value: 6, label: "170-175cm" },
      { value: 7, label: "175-180cm" },
      { value: 8, label: "180-185cm" },
      { value: 9, label: "185-190cm" },
      { value: 10, label: "190cm 以上" },
      { value: 11, label: "不透露" }
    ],
    weight: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "50kg 以下" },
      { value: 2, label: "50-55kg" },
      { value: 3, label: "55-60kg" },
      { value: 4, label: "60-65kg" },
      { value: 5, label: "65-70kg" },
      { value: 6, label: "70-75kg" },
      { value: 7, label: "75-80kg" },
      { value: 8, label: "80-85kg" },
      { value: 9, label: "85-90kg" },
      { value: 10, label: "90kg 以上" },
      { value: 11, label: "不透露" }
    ],
    isMarried: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "已婚" },
      { value: 2, label: "未婚" },
      { value: 3, label: "離婚" }
    ],
    location: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "北部" },
      { value: 2, label: "南部" },
      { value: 3, label: "東部" },
      { value: 4, label: "西部" },
      { value: 5, label: "中部" },
      { value: 6, label: "海外" }
    ],
    education: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "國小" },
      { value: 2, label: "國中" },
      { value: 3, label: "高中" },
      { value: 4, label: "大學" },
      { value: 5, label: "研究所" },
      { value: 6, label: "博士後研究" }
    ],
    liveWithParents: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "與父母同住" },
      { value: 2, label: "獨立居住" },
      { value: 3, label: "其他" }
    ],
    religion: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "基督教" },
      { value: 2, label: "佛教" },
      { value: 3, label: "道教" },
      { value: 4, label: "伊斯蘭教" },
      { value: 5, label: "天主教" },
      { value: 6, label: "印度教" },
      { value: 7, label: "錫克教" },
      { value: 8, label: "猶太教" },
      { value: 9, label: "其他" }
    ],
    smoking: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "不抽菸" },
      { value: 2, label: "偶爾抽菸" },
      { value: 3, label: "經常抽菸" },
      { value: 4, label: "電子菸" }
    ],
    socialCircle: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "外籍人士" },
      { value: 2, label: "本地人" },
      { value: 3, label: "藝術" },
      { value: 4, label: "音樂" },
      { value: 5, label: "運動" },
      { value: 6, label: "電影" },
      { value: 7, label: "烹飪" },
      { value: 8, label: "旅遊" },
      { value: 9, label: "攝影" },
      { value: 10, label: "閱讀" },
      { value: 11, label: "其他" }
    ],
    activities: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "健行" },
      { value: 2, label: "園藝" },
      { value: 3, label: "慈善" },
      { value: 4, label: "其他" }
    ],
    occupation: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "軍人" },
      { value: 2, label: "警察" },
      { value: 3, label: "消防員" },
      { value: 4, label: "教育" },
      { value: 5, label: "醫療" },
      { value: 6, label: "自由業" },
      { value: 7, label: "家庭主婦" },
      {
        value: 8, label: "學生"
      },
      { value: 9, label: "其他" }
    ],
    industry: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "餐旅" },
      { value: 2, label: "科技" },
      { value: 3, label: "金融" },
      { value: 4, label: "零售" },
      { value: 5, label: "製造" },
      { value: 6, label: "農業" },
      { value: 7, label: "礦業" },
      { value: 8, label: "營建業" },
      { value: 9, label: "運輸業" },
      { value: 10, label: "倉儲業" },
      { value: 11, label: "資訊業" },
      { value: 12, label: "其他" }
    ],
    expectedSalary: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "20-25k" },
      { value: 2, label: "25-30k" },
      { value: 3, label: "30-35k" },
      { value: 4, label: "35-40k" },
      { value: 5, label: "40-45k" },
      { value: 6, label: "45-50k" },
      { value: 7, label: "50k以上" }
    ],
    banSmoking: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "不抽菸" },
      { value: 2, label: "偶爾抽菸" },
      { value: 3, label: "經常抽菸" },
      { value: 4, label: "電子菸" }
    ],
    banOccupation: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "軍人" },
      { value: 2, label: "警察" },
      { value: 3, label: "消防員" },
      { value: 4, label: "教育" },
      { value: 5, label: "醫療" },
      { value: 6, label: "自由業" },
      { value: 7, label: "家庭主婦" },
      { value: 8, label: "學生" },
      { value: 9, label: "其他" }
    ],
    banIndustry: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "餐旅" },
      { value: 2, label: "科技" },
      { value: 3, label: "金融" },
      { value: 4, label: "零售" },
      { value: 5, label: "製造" },
      { value: 6, label: "農業" },
      { value: 7, label: "礦業" },
      { value: 8, label: "營建業" },
      { value: 9, label: "運輸業" },
      { value: 10, label: "倉儲業" },
      { value: 11, label: "資訊業" },
      { value: 12, label: "其他" }
    ],
    banExpectedSalary: [
      { value: 0, label: "請選擇" },
      { value: 1, label: "20-25k" },
      { value: 2, label: "25-30k" },
      { value: 3, label: "30-35k" },
      { value: 4, label: "35-40k" },
      { value: 5, label: "40-45k" },
      { value: 6, label: "45-50k" },
      { value: 7, label: "50k以上" }
    ]
  }

  const existingOption = await matchListOption.findOne({})

  if (!existingOption) {
    await matchListOption.create(options)
  }
}

initOptions().catch((err) => {
  console.error("[server]：matchListOption schema error:", err)
})

export { matchListOption }
