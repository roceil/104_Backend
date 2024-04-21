import { type RequestHandler, Router } from "express"
import healthyCheckController from "../controllers/healthyCheckController"


const router = Router()

router.get("/healthy-check", healthyCheckController.getHealthyCheck as RequestHandler)

export default router
