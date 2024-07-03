import mongoose, { Schema, type Document } from "mongoose"

export interface IHappinessExample extends Document {
  userId: string
  myName: string
  partnerName: string
  coverImage: string
  imgList?: string[]
  title: string
  content: string
}

const HappinessExampleSchema = new Schema<IHappinessExample>({
  userId: {
    type: String,
    required: true
  },
  myName: {
    type: String,
    required: true
  },
  partnerName: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  imgList: {
    type: [String],
    default: []
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

const HappinessExample = mongoose.model("HappinessExample", HappinessExampleSchema)

export default HappinessExample
