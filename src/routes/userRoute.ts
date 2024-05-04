import { type RequestHandler, Router } from "express"
import { getUsers, getUserById, postUser, putUser, deleteUser } from "@/controllers/userController"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"

const router = Router()

router.get("/", asyncErrorHandler(getUsers) as RequestHandler)

router.get("/:id", asyncErrorHandler(getUserById) as RequestHandler)

router.post("/", asyncErrorHandler(postUser) as RequestHandler)

router.put("/:id", asyncErrorHandler(putUser) as RequestHandler)

router.delete("/:id", asyncErrorHandler(deleteUser) as RequestHandler)

export default router
