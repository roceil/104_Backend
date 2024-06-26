import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { addCollection, deleteCollectionById, getCollectionsByUserIdAggregation } from "@/controllers/collectionController"
import isAuth from "@/middlewares/isAuth"
import { getCollectionsByUserIdSwagger, addCollectionSwagger, deleteCollectionByIdSwagger } from "@/middlewares/swaggerConfig/collectionSwagger"
const router = Router()

// router.get("/collections", isAuth, asyncErrorHandler(getCollections) as RequestHandler)

router.get("/user/collections", getCollectionsByUserIdSwagger, isAuth, asyncErrorHandler(getCollectionsByUserIdAggregation) as RequestHandler)

router.post("/collections", addCollectionSwagger, isAuth, asyncErrorHandler(addCollection) as RequestHandler)

router.delete("/collections/:id", deleteCollectionByIdSwagger, isAuth, asyncErrorHandler(deleteCollectionById) as RequestHandler)

export default router
