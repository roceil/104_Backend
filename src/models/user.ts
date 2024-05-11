import { Schema, model, type Types } from "mongoose"
interface IPersonalInfo {
  username: string
  email: string
  password: string
  gender: string
  sex: string
  birthday: string
}
interface IUserSchema {
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
        password: {
          type: String,
          select: false,
          required: [true, "password is required"]
        },
        gender: {
          type: String,
          enum: ["female", "male"],
          default: null
        },
        birthday: {
          type: String,
          default: null
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
      default: ""
    },
    isActive: {
      type: Boolean,
      default: true // NOTE: 這邊預設值是 true，但是在實際應用中，可能需要改成 false
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
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false, timestamps: true }
)

const User = model<IUserSchema>("user", userSchema)

export { User, type IUserSchema, type IPersonalInfo }
