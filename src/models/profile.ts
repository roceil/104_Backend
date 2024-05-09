import { Schema, model, mongo } from "mongoose"
import { type IUserId } from "../interface/userInterface"
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
interface IPersonalInfo {
  userId: IUserId
  photoDetails: IPhotoDetails
  introDetails: IIntroDetails
  nickNameDetails: INickNameDetails
  incomeDetails: IIncomeDetails
  lineDetails: ILineDetails
  tags: string[]
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true,
  versionKey: false
})
const Profile = model<IPersonalInfo>("profile", profileSchema)
export { Profile, type IPersonalInfo }
