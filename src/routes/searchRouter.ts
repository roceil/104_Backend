import { type RequestHandler, Router } from "express"

import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import { searchSwagger, getEliteListSwagger } from "@/middlewares/swaggerConfig/searchSwagger"

import { keywordSearch, getEliteList } from "@/controllers/searchController"

const router = Router()

router.post("/search-list", searchSwagger, isAuth, asyncErrorHandler(keywordSearch) as RequestHandler)
router.get("/elite-list", getEliteListSwagger, asyncErrorHandler(getEliteList) as RequestHandler)

export default router
