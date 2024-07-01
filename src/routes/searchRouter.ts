import { type RequestHandler, Router } from "express"

import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import { searchSwagger, getEliteListSwagger, maybeYouLikeSwagger } from "@/middlewares/swaggerConfig/searchSwagger"

import { keywordSearch, getEliteList, maybeYouLikeSearch } from "@/controllers/searchController"

const router = Router()

router.post("/search-list", searchSwagger, isAuth, asyncErrorHandler(keywordSearch) as RequestHandler)
router.get("/elite-list", getEliteListSwagger, asyncErrorHandler(getEliteList) as RequestHandler)
router.get("/maybe-you-like", maybeYouLikeSwagger, isAuth, asyncErrorHandler(maybeYouLikeSearch) as RequestHandler)

export default router
