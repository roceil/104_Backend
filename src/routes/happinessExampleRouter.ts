import { type RequestHandler, Router, type Handler } from "express"
import { getAllExamples, getExampleById, addExample } from "@/controllers/happinessExampleController"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
// import multer from "multer"

const router = Router()
// const upload = multer()

router.get("/happiness-example", asyncErrorHandler(getAllExamples) as RequestHandler)

router.get("/happiness-example/:id", asyncErrorHandler(getExampleById) as RequestHandler)

router.post("/happiness-example", isAuth as Handler, asyncErrorHandler(addExample) as RequestHandler)

export default router
