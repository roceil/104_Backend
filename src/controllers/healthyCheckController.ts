import { type Request, type Response } from "express"

/**
 * 系統健康度檢查 API
 */
const getHealthyCheck = async (req: Request, res: Response): Promise<void> => {
  res.send("Server is alive!")
}

const healthyCheckController = {
  getHealthyCheck
}

export default healthyCheckController
