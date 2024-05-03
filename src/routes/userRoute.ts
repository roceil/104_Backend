import { type RequestHandler, Router } from "express"
import { getUsers } from "../controllers/userController"
const router = Router()

router.get("/", getUsers as RequestHandler)

export default router
