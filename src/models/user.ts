import { Schema, model, type Types } from "mongoose"
interface IPersonalInfo {
  username: string
  email: string
  gender: string
  birthday: string
}

interface IUserSchema {
  _id: Types.ObjectId
  personalInfo: IPersonalInfo
  preferences: object // 資料代訂，不確定型別
  isSubscribe: boolean
  points: number
  resetPasswordToken: string
  isActive: boolean
  blockedUsers: Types.ObjectId[]
  notifications: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUserSchema>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is required"]
    },
    personalInfo: {
      type: {
        username: {
          type: String,
          required: [true, "username is required"]
        },
        email: {
          type: String,
          required: [true, "email is required"]
        },
        gender: {
          type: String,
          required: [true, "gender is required"]
        },
        birthday: {
          type: String,
          required: [true, "birthday is required"]
        }
      }
    },
    preferences: {},
    isSubscribe: {
      type: Boolean,
      default: false
    },
    points: {
      type: Number,
      default: 0
    },
    resetPasswordToken: {
      type: String,
      default: "",
      required: [true, "resetPasswordToken is required"]
    },
    isActive: {
      type: Boolean,
      default: true,
      required: [true, "isActive is required"]
    },
    blockedUsers: {
      type: [Schema.Types.ObjectId],
      default: []
    },
    notifications: {
      type: [Schema.Types.ObjectId],
      default: []
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: [true, "createdAt is required"]
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      required: [true, "updatedAt is required"]
    }
  },
  { versionKey: false }
)

const User = model<IUserSchema>("user", userSchema)

export default User
