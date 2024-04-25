import { type Request, type Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface User {
  password: string
  name: string
}

// 使用索引簽名，表示每個 string 鍵都將映射到一個 User 類型的對象
const user: Record<string, User> = {
  "test123@gmail.com": {
    password: "test123",
    name: "test"
  }
}

interface SignUpBody {
  account: string
  password: string
  confirmPassword: string
}

const signUp = async (req: Request, res: Response): Promise<void> => {
  const resObj = {
    status: "",
    message: "",
    data: {}
  }

  const { account, password, confirmPassword }: SignUpBody = req.body

  // 檢查密碼是否相同
  if (password !== confirmPassword) {
    resObj.status = "error"
    resObj.message = "兩次密碼不一致"

    res.status(400).json(resObj)
    return
  }

  // 檢查帳號是否重複
  if (account in user) {
    resObj.status = "error"
    resObj.message = "帳號已存在"

    res.status(400).json(resObj)
    return
  }

  // 密碼加密
  const hashPassword = await bcrypt.hash(password, 10)

  // 儲存帳號密碼
  user[account] = {
    password: hashPassword,
    name: account
  }

  resObj.status = "success"
  resObj.message = "註冊成功"
  resObj.data = user

  res.status(200).json(resObj)
}

interface LoginBody {
  account: string
  password: string
}

const login = async (req: Request, res: Response): Promise<void> => {
  const resObj = {
    status: "",
    message: "",
    data: {}
  }

  const { account, password }: LoginBody = req.body

  // 檢查帳號是否存在
  if (!(account in user)) {
    resObj.status = "error"
    resObj.message = "帳號不存在"

    res.status(400).json(resObj)
    return
  }

  // 檢查密碼是否正確 compare(輸入密碼, 加密後密碼)
  const isPasswordCorrect = await bcrypt.compare(password, user[account].password)

  if (!isPasswordCorrect) {
    resObj.status = "error"
    resObj.message = "登入失敗，密碼錯誤"

    res.status(400).json(resObj)
    return
  }

  // 取得當前會員資料
  const currentUser = {
    email: account,
    name: user[account].name
  }

  const key = process.env.JWT_SECRET

  if (!key) {
    resObj.status = "error"
    resObj.message = "伺服器錯誤"

    console.error("缺少 JWT_SECRET")
    res.status(500).json(resObj)
    return
  }

  // 產生 token
  const token = jwt.sign(currentUser, key, { expiresIn: "1h" })

  resObj.status = "success"
  resObj.message = "登入成功"
  resObj.data = {
    token
  }

  res.status(200).json(resObj)
}

const verifyToken = (req: Request, res: Response): void => {
  const resObj = {
    status: "",
    message: "",
    data: {}
  }

  const token = req.headers.authorization

  if (!token) {
    resObj.status = "error"
    resObj.message = "請先登入"

    res.status(401).json(resObj)
    return
  }

  const key = process.env.JWT_SECRET

  if (!key) {
    resObj.status = "error"
    resObj.message = "伺服器錯誤"

    console.error("缺少 JWT_SECRET")
    res.status(500).json(resObj)
    return
  }

  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      resObj.status = "error"
      resObj.message = "登入逾時，請重新登入"

      res.status(401).json(resObj)
      return
    }

    resObj.status = "success"
    resObj.message = "驗證成功"

    console.log("decoded", decoded)

    res.status(200).json(resObj)
  })
}

const loginController = {
  signUp,
  login,
  verifyToken
}

export default loginController
