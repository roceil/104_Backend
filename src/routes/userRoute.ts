import { type RequestHandler, Router } from "express"
import { getUsers, getUserById, postUser, putUser, deleteUser } from "@/controllers/userController"
import handleErrorAsync from "@/middlewares/asyncErrorHandler"

const router = Router()

router.get("/", handleErrorAsync(getUsers) as RequestHandler)

router.get("/:id", handleErrorAsync(getUserById) as RequestHandler)

router.post("/", handleErrorAsync(postUser) as RequestHandler)

router.put("/:id", handleErrorAsync(putUser) as RequestHandler)

router.delete("/:id", handleErrorAsync(deleteUser) as RequestHandler)

export default router
