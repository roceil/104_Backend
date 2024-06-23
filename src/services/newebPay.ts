import { type Request, type Response, type NextFunction } from "express"
import crypto from "crypto"
import appSuccessHandler from "../utils/appSuccessHandler"
import appErrorHandler from "../utils/appErrorHandler"
import Order, { type IOrder } from "@/models/order"
import { Profile } from "@/models/profile"

const {
  MERCHANT_ID,
  HASH_KEY,
  HASH_IV,
  VERSION,
  NOTIFY_URL,
  RETURN_URL
} = process.env

const RespondType = "JSON"

export const createOrder = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const data = req.body

  // 使用 Unix Timestamp 作為訂單編號（金流也需要加入時間戳記）
  const TimeStamp = Math.round(new Date().getTime() / 1000)

  // 訂單資訊
  const orderData = {
    ...data,
    MerchantID: MERCHANT_ID,
    RespondType,
    TimeStamp,
    Version: VERSION,
    MerchantOrderNo: TimeStamp
  }

  // 進行訂單加密
  const aesEncrypt = createSesEncrypt(orderData)

  // 使用 HASH 再次 SHA 加密字串，作為驗證使用
  const shaEncrypt = createShaEncrypt(aesEncrypt)

  const order = new Order({
    ...orderData,
    aesEncrypt,
    shaEncrypt
  })

  await order.save()

  appSuccessHandler(200, "訂單資訊加密成功", order, res)
}

// 交易成功：Return （可直接解密，將資料呈現在畫面上）
export const returnOrder = async (req: Request, res: Response, _next: NextFunction) => {
  console.log("req.body return data", req.body)
  appSuccessHandler(200, "測試", null, res)
}

// 確認交易：Notify
export const notifyOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log("req.body notify data", req.body)
  const response = req.body

  // 解密交易內容
  const data = createSesDecrypt(response.TradeInfo)
  console.log("解密後 Data:", data)

  // 取得交易內容，並查詢本地端資料庫是否有相符的訂單
  const order = await Order.findOne({ MerchantOrderNo: data?.Result?.MerchantOrderNo })

  if (!order) {
    console.log("找不到訂單")
    appErrorHandler(404, "找不到訂單", next); return
  }

  // 使用 HASH 再次 SHA 加密字串，確保比對一致（確保不正確的請求觸發交易成功）
  const thisShaEncrypt = createShaEncrypt(response.TradeInfo)
  if (thisShaEncrypt !== response.TradeSha) {
    console.log("付款失敗：TradeSha 不一致")
    appErrorHandler(400, "付款失敗：TradeSha 不一致", next); return
  }

  // 從 itemDesc 中提取實際要增加的點數
  const pointsToAddMatch = order.itemDesc.match(/(\d+)點/)
  const pointsToAdd = pointsToAddMatch ? parseInt(pointsToAddMatch[1], 10) : 0

  // 交易完成，將成功資訊儲存於資料庫
  console.log("付款完成，訂單：", order)

  // 進行交易成功後的處理
  const updateData = await Profile.findOneAndUpdate(
    { userId: order.userId },
    { $inc: { "userStatus.point": pointsToAdd } }, // 使用 $inc 操作符累加點數
    { new: true }
  )

  console.log("updateData:", updateData?.userStatus)

  appSuccessHandler(200, "交易成功", updateData, res)
}

// 字串組合
function genDataChain (order: IOrder) {
  return `MerchantID=${MERCHANT_ID}&TimeStamp=${order.TimeStamp}&Version=${VERSION}&RespondType=${RespondType}&MerchantOrderNo=${order.MerchantOrderNo}&Amt=${order.amt}&NotifyURL=${encodeURIComponent(NOTIFY_URL)}&ReturnURL=${encodeURIComponent(RETURN_URL)}&ItemDesc=${encodeURIComponent(order.itemDesc)}&Email=${encodeURIComponent(order.email)}`
}

function createSesEncrypt (TradeInfo: IOrder) {
  const encrypt = crypto.createCipheriv("aes-256-cbc", HASH_KEY, HASH_IV)
  const enc = encrypt.update(genDataChain(TradeInfo), "utf8", "hex")
  return enc + encrypt.final("hex")
}

function createShaEncrypt (aesEncrypt: string) {
  const sha = crypto.createHash("sha256")
  const plainText = `HashKey=${HASH_KEY}&${aesEncrypt}&HashIV=${HASH_IV}`

  return sha.update(plainText).digest("hex").toUpperCase()
}

// 將 aes 解密
function createSesDecrypt (TradeInfo: string) {
  const decrypt = crypto.createDecipheriv("aes-256-cbc", HASH_KEY, HASH_IV)
  decrypt.setAutoPadding(false)
  const text = decrypt.update(TradeInfo, "hex", "utf8")
  const plainText = text + decrypt.final("utf8")

  const cleanText = plainText.split("").filter(char => char.charCodeAt(0) > 31).join("")
  return JSON.parse(cleanText)
}
