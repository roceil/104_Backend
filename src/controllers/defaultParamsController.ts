import { type NextFunction, type Request, type Response } from "express"
import { Params } from "@/models/defaultParams"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"

const getDefaultParams = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const params = await Params.find({}, { _id: 0 })
  if (!params || params.length === 0) {
    appErrorHandler(404, "No params found", next)
  } else {
    appSuccessHandler(200, "查詢成功", params, res)
  }
}

const postDefaultParams = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { hashTags } = req.body
  if (!hashTags) {
    appErrorHandler(400, "缺少 hashTags", next); return
  }
  const paramsPost = await Params.create(req.body)
  appSuccessHandler(201, "參數新增資料成功", paramsPost, res)
}

export { getDefaultParams, postDefaultParams }
