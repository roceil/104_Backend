import { type RequestHandler, Router } from "express"

import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"

import { keywordSearch, searchFeaturedUser, tagSearch } from "@/controllers/searchController"
const router = Router()
router.get("/search-list/featured", isAuth, asyncErrorHandler(searchFeaturedUser) as RequestHandler)
router.get("/search-list/keyword", isAuth, asyncErrorHandler(keywordSearch) as RequestHandler)
router.get("/search-list/tags", isAuth, asyncErrorHandler(tagSearch) as RequestHandler)
export default router
