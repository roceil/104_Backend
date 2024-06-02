import { Schema, model, mongo, type Document } from "mongoose"
import { type IUserId } from "../types/userInterface"

interface IMatchList extends Document {
  userId: IUserId
  personalInfo: {
    age: number
    gender: number
    isMarried: number
    height: number
    weight: number
    socialCircle: number
    activities: number[]
    location: number
    education: number
    liveWithParents: number
    religion: number
    smoking: number
  }
  workInfo: {
    occupation: number
    industry: number[]
    workLocation: number
    expectedSalary: number
  }
  blacklist: {
    occupation: number
    industry: number[]
    socialCircle: number
    activities: number[]
    smokingOptions: number
  }
  noticeInfo: {
    email: string
    notice: boolean
  }
  createdAt: Date
  updatedAt: Date
}

const options = [
  {
    type: "ageOptions",
    options: {
      0: "無指定",
      1: "20-22 歲",
      2: "23-25 歲",
      3: "26-28 歲",
      4: "29-31 歲",
      5: "32-34 歲",
      6: "35-37 歲",
      7: "38-40 歲",
      8: "41-43 歲",
      9: "44-46 歲",
      10: "47-50 歲",
      11: "50 歲以上"
    }
  },
  {
    type: "genderOptions",
    options: {
      0: "無指定",
      1: "男性",
      2: "女性",
      3: "其他",
      4: "不透露"
    }
  },
  {
    type: "heightOptions",
    options: {
      0: "無指定",
      1: "150cm 以下",
      2: "150-155cm",
      3: "155-160cm",
      4: "160-165cm",
      5: "165-170cm",
      6: "170-175cm",
      7: "175-180cm",
      8: "180-185cm",
      9: "185-190cm",
      10: "190cm 以上",
      11: "不透露"
    }
  },
  {
    type: "weightOptions",
    options: {
      0: "無指定",
      1: "50kg 以下",
      2: "50-55kg",
      3: "55-60kg",
      4: "60-65kg",
      5: "65-70kg",
      6: "70-75kg",
      7: "75-80kg",
      8: "80-85kg",
      9: "85-90kg",
      10: "90kg 以上",
      11: "不透露"
    }
  },
  {
    type: "isMarriedOptions",
    options: {
      0: "無指定",
      1: "已婚",
      2: "未婚",
      3: "離婚"
    }
  },
  {
    type: "locationOptions",
    options: {
      0: "無指定",
      1: "北部",
      2: "南部",
      3: "東部",
      4: "西部",
      5: "中部",
      6: "海外"
    }
  },
  {
    type: "educationOptions",
    options: {
      0: "無指定",
      1: "國小",
      2: "國中",
      3: "高中",
      4: "大學",
      5: "研究所",
      6: "博士後研究"
    }
  },
  {
    type: "liveWithParentsOptions",
    options: {
      0: "無指定",
      1: "與父母同住",
      2: "獨立居住",
      3: "其他"
    }
  },
  {
    type: "religionOptions",
    options: {
      0: "無指定",
      1: "基督教",
      2: "佛教",
      3: "道教",
      4: "伊斯蘭教",
      5: "天主教",
      6: "印度教",
      7: "錫克教",
      8: "猶太教",
      9: "其他"
    }
  },
  {
    type: "smokingOptions",
    options: {
      0: "無指定",
      1: "不抽菸",
      2: "偶爾抽菸",
      3: "經常抽菸",
      4: "電子菸"
    }
  },
  {
    type: "socialCircleOptions",
    options: {
      0: "無指定",
      1: "外籍人士",
      2: "本地人",
      3: "藝術",
      4: "音樂",
      5: "運動",
      6: "電影",
      7: "烹飪",
      8: "旅遊",
      9: "攝影",
      10: "閱讀",
      11: "其他"
    }
  },
  {
    type: "activitiesOptions",
    options: {
      0: "無指定",
      1: "健行",
      2: "園藝",
      3: "慈善",
      4: "其他"
    }
  },
  {
    type: "occupationOptions",
    options: {
      0: "無指定",
      1: "軍人",
      2: "警察",
      3: "消防員",
      4: "教育",
      5: "醫療",
      6: "自由業",
      7: "家庭主婦",
      8: "學生",
      9: "其他"
    }
  },
  {
    type: "industryOptions",
    options: {
      0: "無指定",
      1: "餐旅",
      2: "科技",
      3: "金融",
      4: "零售",
      5: "製造",
      6: "農業",
      7: "礦業",
      8: "營建業",
      9: "運輸業",
      10: "倉儲業",
      11: "資訊業",
      12: "其他"
    }
  },
  {
    type: "expectedSalary",
    options: {
      0: "無指定",
      1: "20-25k",
      2: "25-30k",
      3: "30-35k",
      4: "35-40k",
      5: "40-45k",
      6: "45-50k",
      7: "50k以上"
    }
  }
]

function getOptionKeys (type: string) {
  const option = options.find(option => option.type === type)
  return option ? Object.keys(option.options).map(Number) : []
}

console.log(getOptionKeys("ageOptions"))

const matchListSchema = new Schema<IMatchList>({
  userId: {
    type: mongo.ObjectId,
    required: [true, "需要使用者id"],
    ref: "User"
  },
  personalInfo: {
    age: { type: Number, enum: getOptionKeys("ageOptions"), default: 0 },
    gender: { type: Number, enum: getOptionKeys("genderOptions"), default: 0 },
    isMarried: { type: Number, enum: getOptionKeys("isMarriedOptions"), default: 0 },
    height: { type: Number, enum: getOptionKeys("heightOptions"), default: 0 },
    weight: { type: Number, enum: getOptionKeys("weightOptions"), default: 0 },
    socialCircle: { type: Number, enum: getOptionKeys("socialCircleOptions"), default: 0 },
    activites: [{ type: Number, enum: getOptionKeys("activitiesOptions"), default: 0 }],
    location: { type: Number, enum: getOptionKeys("locationOptions"), default: 0 },
    education: { type: Number, enum: getOptionKeys("educationOptions"), default: 0 },
    liveWithParents: { type: Number, enum: getOptionKeys("liveWithParentsOptions"), default: 0 },
    religion: { type: Number, enum: getOptionKeys("religionOptions"), default: 0 },
    smoking: { type: Number, enum: getOptionKeys("smokingOptions"), default: 0 }
  },
  workInfo: {
    occupation: { type: Number, enum: getOptionKeys("occupationOptions"), default: 0 },
    industry: [{ type: Number, enum: getOptionKeys("industryOptions"), default: 0 }],
    workLocation: { type: Number, enum: getOptionKeys("locationOptions"), default: 0 },
    expectedSalary: { type: Number, enum: getOptionKeys("expectedSalary"), default: 0 }
  },
  blacklist: {
    occupation: { type: Number, enum: getOptionKeys("occupationOptions"), default: 0 },
    industry: [{ type: Number, enum: getOptionKeys("industryOptions"), default: 0 }],
    socialCircle: { type: Number, enum: getOptionKeys("socialCircleOptions"), default: 0 },
    activites: [{ type: Number, enum: getOptionKeys("activitiesOptions"), default: 0 }],
    smokingOptions: { type: Number, enum: getOptionKeys("smokingOptions"), default: 0 }
  },
  noticeInfo: {
    email: { type: String, default: "" },
    notice: { type: Boolean, default: false }
  }
}, {
  timestamps: true,
  versionKey: false
})

const MatchList = model<IMatchList>("MatchList", matchListSchema)

export { MatchList, type IMatchList }
