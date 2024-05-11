import { Schema, model, mongo } from "mongoose"
import { generalSchemaSettings } from "@/services/mongo"

/**
 * 付款資訊 Schema
 */
const paymentSchema = new Schema({
  userId: {
    type: mongo.ObjectId,
    required: [true, "需要使用者id"]
  },
  planType: {
    type: String,
    enum: ["subscribe", "charge"],
    required: [true, "需要付款類型"]
  },
  originPrice: {
    type: Number,
    required: [true, "需要原價"]
  },
  discount: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: [true, "需要總價"]
  },
  status: {
    type: String,
    enum: ["pending", "success", "fail", "cancel"],
    default: "pending"
  },
  email: {
    type: String,
    required: [true, "需要email"]
  },
  eInvoiceType: {
    type: String,
    enum: [1, 2],
    required: [true, "需要電子發票類型"]
  },
  paymentType: {
    type: String,
    enum: ["creditCard", "ATM"],
    required: [true, "需要付款方式"]
  }
}, generalSchemaSettings
)

const Payment = model("payment", paymentSchema)

export { Payment }
