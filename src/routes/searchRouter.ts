import { type RequestHandler, Router } from "express"

import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import { searchSwagger } from "@/middlewares/swaggerConfig/searchSwagger"

import { keywordSearch } from "@/controllers/searchController"

const router = Router()

router.post("/search-list", searchSwagger, isAuth, asyncErrorHandler(keywordSearch) as RequestHandler)

export default router
