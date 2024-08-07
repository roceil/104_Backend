import { type RequestHandler, Router, type Handler } from "express"
import { getAllExamples, getExampleById, addExample, uploadExampleCoverImage, uploadExampleImages } from "@/controllers/happinessExampleController"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import { uploadSingleFile, uploadMultipleFiles } from "@/middlewares/uploadImage"
import { getAllExamplesSwagger, getExampleByIdSwagger, addExampleSwagger, uploadExampleCoverImageSwagger, uploadExampleImagesSwagger } from "@/middlewares/swaggerConfig/happinessExampleSwagger"

const router = Router()

router.get("/happiness-example", getAllExamplesSwagger, asyncErrorHandler(getAllExamples) as RequestHandler)

router.get("/happiness-example/:id", getExampleByIdSwagger, asyncErrorHandler(getExampleById) as RequestHandler)

router.post("/happiness-example", addExampleSwagger, isAuth as Handler, asyncErrorHandler(addExample) as RequestHandler)

router.post("/happiness-cover-image", uploadExampleCoverImageSwagger, isAuth as Handler, uploadSingleFile, asyncErrorHandler(uploadExampleCoverImage) as RequestHandler)

router.post("/happiness-multiple-image", uploadExampleImagesSwagger, isAuth as Handler, uploadMultipleFiles, asyncErrorHandler(uploadExampleImages) as RequestHandler)

export default router
