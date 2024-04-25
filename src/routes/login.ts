import { type RequestHandler, Router } from "express"
import loginController from "@/controllers/loginController"

const router = Router()

router.post("/sign-up", loginController.signUp as RequestHandler)

router.post("/login", loginController.login as RequestHandler)

router.get("/verify-token", loginController.verifyToken as RequestHandler)

export default router
