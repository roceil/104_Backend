import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData } from "@/types/login"
import HappinessExample from "@/models/happinessExample"
import appSuccessHandler from "@/utils/appSuccessHandler"
import appErrorHandler from "@/utils/appErrorHandler"
import checkMissingFields from "@/utils/checkMissingFields"

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

  appSuccessHandler(200, "成功取得幸福案例", example, res)
}

/**
 * 新增幸福案例
 */
export const addExample = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.user as LoginResData

  const { myName, partnerName, coverImage, title, content } = req.body

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
