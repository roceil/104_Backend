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

interface IIncomeDetails {
  income: string
  isShow: boolean
}

interface ILineDetails {
  lineId: string
  isShow: boolean
}

interface IExposureSettings {
  rating: string
  isShow: boolean
  isMatch: boolean
}

interface IUserStatus {
  rating: string
  isMatch: boolean
  point: number
}

interface IPersonalInfo {
  userId: IUserId
  photoDetails: IPhotoDetails
  introDetails: IIntroDetails
  nickNameDetails: INickNameDetails
  incomeDetails: IIncomeDetails
  lineDetails: ILineDetails
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
        type: String,
        default: null
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
        type: String,
        default: null
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

const Profile = model<IPersonalInfo>("profile", profileSchema)

export { Profile, type IPersonalInfo }
