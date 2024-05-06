import { type NextFunction, type Request, type Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User, type IPersonalInfo } from "@/models/user"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"

/**
 * 用戶註冊
 */
const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { personalInfo, confirmPassword } = req.body as { personalInfo: IPersonalInfo, confirmPassword: string }

  // 檢查必填欄位
  if (!personalInfo.username || !personalInfo.email || !personalInfo.password || !personalInfo.gender || !personalInfo.birthday) {
    appErrorHandler(400, "缺少必要欄位", next)
    return
  }

  // 檢查密碼是否相同
  if (personalInfo.password !== confirmPassword) {
    appErrorHandler(400, "兩次密碼不一致", next)
    return
  }

  // 檢查帳號是否重複
  const isEmailExist = await User.findOne({ email: personalInfo.email })
  if (isEmailExist) {
    appErrorHandler(400, "帳號已存在", next)
    return
  }

  // 密碼加密
  const hashPassword = await bcrypt.hash(personalInfo.password, 10)

  // 新增使用者
  await User.create({
    personalInfo: {
      ...personalInfo,
      password: hashPassword
    }
  })

  appSuccessHandler(201, "用戶新增成功", null, res)
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
  // resObj.data = {
  //   token
  // }

  // token 寫入 cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true
  })

  res.status(200).json(resObj)
}

const verifyToken = async (req: Request, res: Response): Promise<void> => {
  const resObj = {
    status: "",
    message: "",
    data: {}
  }

  const token = req.cookies.token as string

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
