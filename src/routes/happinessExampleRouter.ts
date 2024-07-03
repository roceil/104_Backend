import { type RequestHandler, Router, type Handler } from "express"
import { getAllExamples, getExampleById, addExample, uploadExampleCoverImage, uploadExampleImages } from "@/controllers/happinessExampleController"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import { uploadSingleFile, uploadMultipleFiles } from "@/middlewares/uploadImage"

const router = Router()

router.get("/happiness-example", asyncErrorHandler(getAllExamples) as RequestHandler)

router.get("/happiness-example/:id", asyncErrorHandler(getExampleById) as RequestHandler)

router.post("/happiness-example", isAuth as Handler, asyncErrorHandler(addExample) as RequestHandler)

router.post("/happiness-cover-image", isAuth as Handler, uploadSingleFile, asyncErrorHandler(uploadExampleCoverImage) as RequestHandler)

router.post("/happiness-multiple-image", isAuth as Handler, uploadMultipleFiles, asyncErrorHandler(uploadExampleImages) as RequestHandler)

export default router
