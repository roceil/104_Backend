import { Schema, model, mongo, type Types } from "mongoose"
import { type IUserId } from "../interface/userInterface"
interface ICollecetion {
  userId: IUserId
  collectedUserId: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}
const collecetionSchema = new Schema<ICollecetion>({
  userId: {
    type: mongo.ObjectId,
    required: [true, "需要使用者id"],
    ref: "user"
  },
  collectedUserId: {
    type: [mongo.ObjectId],
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
}, {
  timestamps: true,
  versionKey: false
})
const Collection = model<ICollecetion>("collection", collecetionSchema)

export { Collection, type ICollecetion }
