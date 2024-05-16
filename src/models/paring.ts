import { Schema, model, mongo } from "mongoose"
import { type IUserId } from "../types/userInterface"

interface IParing {
  userId: IUserId
  personalDetails: {
    age?: number
    searchGender?: "female" | "male" | "noLimit"
    height?: number[]
    weight?: number[]
    nobby?: string[]
    religion?: string[]
    family?: string[]
    marriage?: "never" | "divorced" | "widowed" | "separated"
    preference?: string[]
    hopes?: string[]
    assets?: "50萬以下" | "50-100萬" | "100-200萬" | "200-500萬" | "500-1000萬" | "1000-2000萬" | "2000-5000萬" | "5000萬以上"
  }
  workDetails: {
    industry?: string
    jobCateGory?: string
    salaryConditions?: string
    region?: string
    language?: string[]
  }
  excludes: {
    industryType?: string[]
    hobby?: string[]
    race?: string[]
  }
}

const paringSchema = new Schema<IParing>({
  userId: {
    type: mongo.ObjectId,
    required: [true, "需要使用者id"],
    ref: "user"
  },
  personalDetails: {
    type: {
      age: {
        type: Number
      },
      searchGender: {
        type: String,
        enum: ["female", "male", "noLimit"]
      },
      height: {
        type: [Number]
      },
      weight: {
        type: [Number]
      },
      nobby: {
        type: [String]
      },
      religion: {
        type: [String]
      },
      family: {
        type: [String]
      },
      marriage: {
        type: String,
        enum: ["never", "divorced", "widowed", "separated"]
      },
      preference: {
        type: [String]
      },
      hopes: {
        type: [String]
      },
      assets: {
        type: String,
        enum: ["50萬以下", "50-100萬", "100-200萬", "200-500萬", "500-1000萬", "1000-2000萬", "2000-5000萬", "5000萬以上"]
      }
    }
  },
  workDetails: {
    type: {
      industry: {
        type: String
      },
      jobCateGory: {
        type: String
      },
      salaryConditions: {
        type: String
      },
      region: {
        type: String
      },
      language: {
        type: [String]
      }
    }
  },
  excludes: {
    type: {
      industryType: {
        type: [String]
      },
      hobby: {
        type: [String]
      },
      race: {
        type: [String]
      }
    }
  }
}, {
  timestamps: true,
  versionKey: false
})

const Paring = model<IParing>("paring", paringSchema)
export { Paring, type IParing }
