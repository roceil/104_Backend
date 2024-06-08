import { Schema, model, mongo } from "mongoose"
import { type IUserId } from "../types/userInterface"

interface IPhotoDetails {
  photo: string
  isShow: boolean
}

interface IIntroDetails {
  intro: string
  isShow: boolean
}

interface INickNameDetails {
  nickName: string
  isShow: boolean
}

interface IPhoneDetails {
  phone: string
  isShow: boolean
}

interface ICompanyDetails {
  company: string
  isShow: boolean
}

interface IIncomeDetails {
  income: string
  isShow: boolean
}

interface ILineDetails {
  lineId: string
  isShow: boolean
}

interface IJobDetails {
  job: string
  isShow: boolean
}

interface IExposureSettings {
  rating: number
  isShow: boolean
  isMatch: boolean
}

interface IUserStatus {
  rating: number
  isMatch: boolean
  point: number
}

interface IPersonalInfo {
  userId: IUserId
  photoDetails: IPhotoDetails
  introDetails: IIntroDetails
  nickNameDetails: INickNameDetails
  phoneDetails: IPhoneDetails
  companyDetails: ICompanyDetails
  incomeDetails: IIncomeDetails
  lineDetails: ILineDetails
  jobDetails: IJobDetails
  tags: string[]
  userStatus: IUserStatus
  exposureSettings: IExposureSettings
  unlockComment: string[]
}

const profileSchema = new Schema<IPersonalInfo>({
  userId: {
    type: mongo.ObjectId,
    required: [true, "需要使用者id"],
    ref: "user"
  },
  photoDetails: {
    type: {
      photo: {
        type: String,
        default: ""
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    default: {} // 確保這裡有預設值
  },
  introDetails: {
    type: {
      intro: {
        type: String,
        default: ""
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    default: {} // 確保這裡有預設值
  },
  nickNameDetails: {
    type: {
      nickName: {
        type: String,
        default: ""
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    default: {} // 確保這裡有預設值
  },
  phoneDetails: {
    type: {
      phone: {
        type: String,
        default: ""
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    default: {} // 確保這裡有預設值
  },
  companyDetails: {
    type: {
      company: {
        type: String,
        default: ""
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    default: {} // 確保這裡有預設值
  },
  incomeDetails: {
    type: {
      income: {
        type: String,
        default: ""
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    default: {} // 確保這裡有預設值
  },
  lineDetails: {
    type: {
      lineId: {
        type: String,
        default: ""
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    default: {} // 確保這裡有預設值
  },
  jobDetails: {
    type: {
      job: {
        type: String,
        default: ""
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    default: {} // 確保這裡有預設值
  },
  tags: {
    type: [String],
    default: []
  },
  unlockComment: {
    type: [String],
    default: []
  },
  exposureSettings: {
    type: {
      rating: {
        type: Number,
        default: 0
      },
      isShow: {
        type: Boolean,
        default: false
      },
      isMatch: {
        type: Boolean,
        default: false
      }
    },
    default: {} // 確保這裡有預設值
  },
  userStatus: {
    type: {
      rating: {
        type: Number,
        default: 0
      },
      isMatch: {
        type: Boolean,
        default: false
      },
      point: {
        type: Number,
        default: 0
      }
    },
    default: {} // 確保這裡有預設值
  }
}, {
  timestamps: true,
  versionKey: false
})

profileSchema.virtual("userInfo", {
  ref: "user",
  localField: "userId",
  foreignField: "_id",
  justOne: true
})

const Profile = model<IPersonalInfo>("profile", profileSchema)

export { Profile, type IPersonalInfo }
