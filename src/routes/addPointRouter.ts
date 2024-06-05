import { type RequestHandler, Router } from "express"
import isAuth from "@/middlewares/isAuth"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { addPoint } from "@/controllers/addPointController"
import { addPointSwagger } from "@/middlewares/swaggerConfig/addPointSwagger"
const router = Router()
router.put("/add-point/:point", addPointSwagger, isAuth, asyncErrorHandler(addPoint) as RequestHandler)
export default router
