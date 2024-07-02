import mongoose, { Schema, type Document } from "mongoose"

export interface IOrder extends Document {
  MerchantID: string
  RespondType: string
  TimeStamp: number
  Version: string
  MerchantOrderNo: number
  amt: number
  itemDesc: string
  userId: string
  email: string
  aesEncrypt?: string
  shaEncrypt?: string
  PaymentMethod?: string
  ProdDesc?: string
  periodAmt?: number
  periodType?: string
  periodPoint?: string
  PeriodStartType?: string
  periodTimes?: number
  notifyURL?: string
  PayerEmail?: string
}

const OrderSchema = new Schema<IOrder>(
  {
    MerchantID: {
      type: String,
      required: true
    },
    RespondType: {
      type: String,
      required: true
    },
    TimeStamp: {
      type: Number,
      required: true
    },
    Version: {
      type: String,
      required: true
    },
    MerchantOrderNo: {
      type: Number,
      required: true,
      unique: true
    },
    amt: {
      type: Number,
      required: true
    },
    itemDesc: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    aesEncrypt: {
      type: String
    },
    shaEncrypt: {
      type: String
    },
    PaymentMethod: {
      type: String,
      default: null
    }
  }, {
    timestamps: true,
    versionKey: false
  })

const Order = mongoose.model<IOrder>("Order", OrderSchema)

export default Order
