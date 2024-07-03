import { type NextFunction, type Request, type Response } from "express"
import { v4 as uuidv4 } from "uuid"
import * as admin from "firebase-admin"
import { getStorage } from "firebase-admin/storage"
import { config, compressImage } from "@/services/firebase"
import { type LoginResData } from "@/types/login"
import HappinessExample from "@/models/happinessExample"
import appSuccessHandler from "@/utils/appSuccessHandler"
import appErrorHandler from "@/utils/appErrorHandler"
import checkMissingFields from "@/utils/checkMissingFields"

// 初始化 Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(config as admin.ServiceAccount),
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
  })
}

/**
 * 上傳圖片到 Firebase
 */
const uploadToFirebase = async (buffer: Buffer, fileName: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const bucket = getStorage().bucket()
    const blob = bucket.file(`happinessExample/${fileName}`)
    const blobStream = blob.createWriteStream()

    blobStream.on("finish", () => {
      blob.getSignedUrl({
        action: "read",
        expires: "12-31-2500"
      }, (err, url) => {
        if (err) {
          reject(err || new Error("獲取簽名網址失敗"))
        } else {
          resolve(url as unknown as string)
        }
      })
    })

    blobStream.on("error", (err) => {
      reject(err)
    })

    blobStream.end(buffer)
  })
}

/**
 * 取得所有幸福案例
 */
export const getAllExamples = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const AllExamples = await HappinessExample.find()

  if (!AllExamples) {
    appErrorHandler(404, "無法取得幸福案例，請稍後再試", next)
    return
  }

  if (AllExamples.length === 0) {
    appSuccessHandler(200, "目前沒有任何幸福案例", AllExamples, res)
    return
  }

  appSuccessHandler(200, "成功取得所有幸福案例", AllExamples, res)
}

/**
 * 取得單一幸福案例
 */
export const getExampleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params

  if (!id) {
    appErrorHandler(400, "缺少幸福案例 ID", next)
    return
  }

  const example = await HappinessExample.findById(id)

  if (!example) {
    appErrorHandler(404, "無法取得幸福案例，請稍後再試", next)
    return
  }

  // 隨機取得其他幸福案例
  const otherExamples = await HappinessExample.aggregate([
    { $match: { _id: { $ne: id } } },
    { $sample: { size: 3 } }
  ])

  const resData = {
    mainExample: example,
    relatedExample: otherExamples
  }

  appSuccessHandler(200, "成功取得幸福案例", resData, res)
}

/**
 * 上傳幸福案例封面圖片
 */
export const uploadExampleCoverImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // const { userId } = req.user as LoginResData

  const { file } = req

  if (!file) {
    appErrorHandler(400, "請上傳圖片", next)
    return
  }

  // 壓縮圖片
  const compressedImage = await compressImage(file.buffer)

  // 生成唯一檔案名稱
  const fileName = `${uuidv4()}.${file.originalname.split(".").pop()}`

  // 上傳圖片到 Firebase
  const url = await uploadToFirebase(compressedImage, fileName)

  if (!url) {
    appErrorHandler(500, "上傳失敗，請稍後再試", next)
    return
  }

  const resData = {
    coverImage: url
  }

  appSuccessHandler(200, "上傳成功", resData, res)
}

/**
 * 上傳幸福案例封面圖片
 */
export const uploadExampleImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { files } = req

  if (!files || !Array.isArray(files) || files.length === 0) {
    appErrorHandler(400, "請上傳圖片", next)
    return
  }

  const uploadPromises = files.map(async (file: Express.Multer.File) => {
    // 壓縮圖片
    const compressedImage = await compressImage(file.buffer)

    // 生成唯一檔案名稱
    const fileName = `${uuidv4()}.${file.originalname.split(".").pop()}`

    // 上傳圖片到 Firebase
    const url = await uploadToFirebase(compressedImage, fileName)

    if (!url) {
      appErrorHandler(500, "上傳失敗，請稍後再試", next)
      return
    }

    return url
  })

  const urls = await Promise.all(uploadPromises)

  const resData = {
    images: urls
  }

  appSuccessHandler(200, "上傳成功", resData, res)
}

/**
 * 新增幸福案例
 */
export const addExample = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData

  const { myName, partnerName, coverImage, imgList = [], title, content } = req.body

  const missingFields = checkMissingFields({ myName, partnerName, coverImage, title, content })

  if (missingFields.length > 0) {
    const missingFieldsMsg = `缺少必要欄位: ${missingFields.join(", ")}`
    appErrorHandler(400, missingFieldsMsg, next)
    return
  }

  const newExample = new HappinessExample({
    userId,
    myName,
    partnerName,
    coverImage,
    imgList,
    title,
    content
  })

  const savedExample = await newExample.save()

  if (!savedExample) {
    appErrorHandler(400, "無法新增幸福案例，請稍後再試", next)
    return
  }

  appSuccessHandler(200, "成功新增幸福案例", savedExample, res)
}
