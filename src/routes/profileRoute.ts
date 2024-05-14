import { type RequestHandler, Router } from "express"
import { getUserById, postUser, putUser } from "@/controllers/profileController"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
const router = Router()

router.get("/:id", isAuth, asyncErrorHandler(getUserById) as RequestHandler)

router.post("/", isAuth, asyncErrorHandler(postUser) as RequestHandler)

router.put("/", isAuth, asyncErrorHandler(putUser) as RequestHandler)

// router.delete("/:id", asyncErrorHandler(deleteUser) as RequestHandler)

export default router
