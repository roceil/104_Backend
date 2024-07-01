import { Schema, model, type Types } from "mongoose"
interface IPersonalInfo {
  username: string
  email: string
  password: string
  gender: string
  sex: string
  birthday: string
}

interface IChatRecord {
  receiverId: Types.ObjectId
  roomId: Types.ObjectId
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
  chatRecord: IChatRecord[]
  createdAt: Date
  updatedAt: Date
}

const chatRecordSchema = new Schema<IChatRecord>({
  receiverId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  roomId: { type: Schema.Types.ObjectId, required: true, ref: "chatRoom" }
})

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
      default: true
    },
    blockedUsers: {
      type: [Schema.Types.ObjectId],
      default: []
    },
    notifications: {
      type: [Schema.Types.ObjectId],
      default: []
    },
    chatRecord: { type: [chatRecordSchema], default: [] },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

userSchema.virtual("scoreByProfile", {
  ref: "profile",
  localField: "_id",
  foreignField: "userId",
  justOne: true
})

const User = model<IUserSchema>("user", userSchema)

export { User, type IUserSchema, type IPersonalInfo, type IChatRecord }
