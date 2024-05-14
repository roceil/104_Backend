import { type Request, type Response } from "express"

const getHealthyCheck = async (req: Request, res: Response): Promise<void> => {
  res.send("Server is alive!")
}

const healthyCheckController = {
  getHealthyCheck
}

export default healthyCheckController
