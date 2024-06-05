import { type RequestHandler, Router } from "express"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import { getCollections, getCollectionsByUserId, addCollection, deleteCollectionById } from "@/controllers/collectionController"
import isAuth from "@/middlewares/isAuth"

const router = Router()

router.get("/collections", isAuth, asyncErrorHandler(getCollections) as RequestHandler)

router.get("/user/collections", isAuth, asyncErrorHandler(getCollectionsByUserId) as RequestHandler)

router.post("/collections", isAuth, asyncErrorHandler(addCollection) as RequestHandler)

router.delete("/collections", isAuth, asyncErrorHandler(deleteCollectionById) as RequestHandler)

export default router
