import { type RequestHandler, Router } from "express"
import isAuth from "@/middlewares/isAuth"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { reducePoint } from "@/controllers/reducePointController"
import { reducePointSwagger } from "@/middlewares/swaggerConfig/reducePointSwagger"
const router = Router()
router.put("/reduce-point/:point", reducePointSwagger, isAuth, asyncErrorHandler(reducePoint) as RequestHandler)
export default router
