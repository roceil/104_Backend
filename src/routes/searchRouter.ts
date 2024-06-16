import { type RequestHandler, Router } from "express"

import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"

import { keywordSearch, searchFeaturedUser } from "@/controllers/searchController"
const router = Router()
router.get("/search-list/featured", isAuth, asyncErrorHandler(searchFeaturedUser) as RequestHandler)
router.get("/search-list/keyword", isAuth, asyncErrorHandler(keywordSearch) as RequestHandler)
export default router
