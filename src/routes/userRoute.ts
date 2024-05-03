import { type RequestHandler, Router } from "express"
import { getUsers, getUserById, postUser, putUser, deleteUser } from "../controllers/userController"
const router = Router()

router.get("/", getUsers as RequestHandler)
router.get("/:id", getUserById as RequestHandler)
router.post("/", postUser as RequestHandler)
router.put("/:id", putUser as RequestHandler)
router.delete("/:id", deleteUser as RequestHandler)
export default router
