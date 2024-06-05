import { type RequestHandler, Router } from "express"
import { getUserById, getUserByAuth, postUser, putUser } from "@/controllers/profileController"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import { getProfileSwagger, getProfileByIdSwagger, postProfileSwagger, putProfileSwagger } from "@/middlewares/swaggerConfig/porfileSwagger"
import { searchFeaturedUser } from "@/controllers/searchController"
const router = Router()
router.get("/search-list/featured", isAuth, asyncErrorHandler(searchFeaturedUser) as RequestHandler)

export default router
