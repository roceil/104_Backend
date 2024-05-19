import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { getDefaultParams, postDefaultParams } from "@/controllers/defaultParamsController"
import { getDefaultParamsSwagger } from "@/middlewares/swaggerConfig/defaultParamsSwagger"
import { ignoreSwagger } from "@/middlewares/swaggerConfig/ignoreSwagger"

const router = Router()
router.get("/user-params", getDefaultParamsSwagger, asyncErrorHandler(getDefaultParams) as RequestHandler)
router.post("/user-params", ignoreSwagger, asyncErrorHandler(postDefaultParams) as RequestHandler)
export default router
