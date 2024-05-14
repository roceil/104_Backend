import { type RequestHandler, Router } from "express"
import healthyCheckController from "@/controllers/healthyCheckController"
const router = Router()

router.get("/healthy-check",
  /**
   * #swagger.tags = ["healthy-check-系統健康度檢查"]
   */
  healthyCheckController.getHealthyCheck as RequestHandler)

export default router
