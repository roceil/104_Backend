import { type RequestHandler, Router } from "express"

import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"

import { keywordSearch } from "@/controllers/searchController"

import { searchSwagger } from "@/middlewares/swaggerConfig/searchSwagger"

const router = Router()
// router.get("/search-list/featured", isAuth, asyncErrorHandler(searchFeaturedUser) as RequestHandler)
router.post("/search-list/keyword", searchSwagger, isAuth, asyncErrorHandler(keywordSearch) as RequestHandler)
export default router
