import { type RequestHandler, Router } from "express"
import { getUserById, getUserByAuth, postUser, putUser } from "@/controllers/profileController"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
import { getProfileSwagger, getProfileByIdSwagger, postProfileSwagger, putProfileSwagger } from "@/middlewares/swaggerConfig/porfileSwagger"
const router = Router()
router.get("/user-data", getProfileSwagger, isAuth, asyncErrorHandler(getUserByAuth) as RequestHandler)

router.get("/user-data/:id", getProfileByIdSwagger, isAuth, asyncErrorHandler(getUserById) as RequestHandler)

router.post("/user-data", postProfileSwagger, isAuth, asyncErrorHandler(postUser) as RequestHandler)

router.put("/user-data", putProfileSwagger, isAuth, asyncErrorHandler(putUser) as RequestHandler)

// router.delete("/:id", asyncErrorHandler(deleteUser) as RequestHandler)

export default router
