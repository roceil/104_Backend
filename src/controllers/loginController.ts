import { type NextFunction, type Request, type Response } from "express"
import { type LoginResData, type LoginBody, type SignUpReqBody } from "@/types/login"
import bcrypt from "bcrypt"
import validator from "validator"
import { User } from "@/models/user"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
import checkMissingFields from "@/utils/checkMissingFields"
import validatePassword from "@/utils/validatePassword"
import sendEmail from "@/utils/sendEmail"
import generateJWT from "@/utils/generateJWT"

/**
 * 使用者註冊
 */
const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, email, password, confirmPassword, gender, birthday }: SignUpReqBody = req.body

  // 檢查必填欄位
  const missingFields = checkMissingFields({ username, email, password, confirmPassword, gender, birthday })
  if (missingFields.length > 0) {
    const missingFieldsMsg = `缺少必要欄位: ${missingFields.join(", ")}`
    appErrorHandler(400, missingFieldsMsg, next)
    return
  }

  // 檢查 email 格式
  if (!validator.isEmail(email)) {
    appErrorHandler(400, "email 格式錯誤", next)
    return
  }

  // 檢查密碼長度
  if (!validatePassword(password)) {
    appErrorHandler(400, "密碼格式為至少 1 碼英文及 7 碼數字", next)
    return
  }

  // 檢查密碼是否相同
  if (password !== confirmPassword) {
    appErrorHandler(400, "兩次密碼不一致", next)
    return
  }

  // 檢查帳號是否重複
  const isEmailExist = await User.findOne({ "personalInfo.email": email })
  if (isEmailExist) {
    appErrorHandler(400, "帳號已存在", next)
    return
  }

  // 密碼加密
  const hashPassword = await bcrypt.hash(password, 10)

  // 新增使用者
  await User.create({
    personalInfo: {
      username,
      email,
      password: hashPassword,
      gender,
      birthday
    }
  })

  let resUserData = null

  // Note: 開發環境下，回傳使用者資料
  if (process.env.NODE_ENV === "dev") {
    resUserData = await User.findOne({ "personalInfo.email": email }).select("-personalInfo.password")
  }

  appSuccessHandler(201, "用戶新增成功", resUserData, res)
}

/**
 * 使用者登入
 */
const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { account, password }: LoginBody = req.body

  // 檢查必填欄位
  const missingFields = checkMissingFields({ account, password })
  if (missingFields.length > 0) {
    const missingFieldsMsg = `缺少必要欄位: ${missingFields.join(", ")}`
    appErrorHandler(400, missingFieldsMsg, next)
    return
  }

  // 檢查 email 格式
  if (!validator.isEmail(account)) {
    appErrorHandler(400, "email 格式錯誤", next)
    return
  }

  // 檢查密碼長度
  if (!validatePassword(password)) {
    appErrorHandler(400, "密碼格式為至少 1 碼英文及 7 碼數字", next)
    return
  }

  // 檢查帳號是否存在
  const user = await User.findOne({ "personalInfo.email": account }).select("+personalInfo.password")
  if (!user) {
    appErrorHandler(400, "登入失敗，帳號不存在", next)
    return
  }

  // 檢查密碼是否正確 compare(輸入密碼, 加密後密碼)
  const isPasswordCorrect = await bcrypt.compare(password, user.personalInfo.password)

  if (!isPasswordCorrect) {
    appErrorHandler(400, "登入失敗，密碼錯誤", next)
    return
  }

  // JWT payload
  let jwtPayload: LoginResData = {
    userId: user._id,
    email: user.personalInfo.email,
    name: user.personalInfo.username,
    gender: user.personalInfo.gender,
    birthday: user.personalInfo.birthday
  }

  // 產生 token並加上 Bearer
  const token = `Bearer ${generateJWT(jwtPayload)}`

  // token 寫入 cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true
  })

  // Note: 開發環境下，將 token 寫入 response
  if (process.env.NODE_ENV === "dev") {
    jwtPayload = {
      ...jwtPayload,
      token
    }
  }

  appSuccessHandler(200, "登入成功", jwtPayload, res)
}

/**
 * 重設密碼
 */
const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userData = req.user as LoginResData
  const { newPassword, confirmNewPassword } = req.body as { newPassword: string, confirmNewPassword: string }

  // 檢查必填欄位
  const missingFields = checkMissingFields({ newPassword, confirmNewPassword })
  if (missingFields.length > 0) {
    const missingFieldsMsg = `缺少必要欄位: ${missingFields.join(", ")}`
    appErrorHandler(400, missingFieldsMsg, next)
    return
  }

  // 檢查密碼長度
  if (!validatePassword(newPassword)) {
    appErrorHandler(400, "密碼格式為至少 1 碼英文及 7 碼數字", next)
    return
  }

  // 檢查密碼是否相同
  if (newPassword !== confirmNewPassword) {
    appErrorHandler(400, "兩次密碼不一致", next)
    return
  }

  // 取得使用者資料
  const userQueryResult = await User.findById(userData.userId, "personalInfo.password")
  const userPasswordInDB = userQueryResult?.personalInfo.password

  // 檢查使用者是否存在
  if (!userPasswordInDB) {
    appErrorHandler(400, "用戶不存在", next)
    return
  }

  // 新密碼加密
  const hashPassword = await bcrypt.hash(newPassword, 10)

  // 更新密碼
  await User.findByIdAndUpdate(userData.userId, { "personalInfo.password": hashPassword })

  appSuccessHandler(200, "密碼更新成功", null, res)
}

/**
 * 忘記密碼
 */
const forgetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body as { email: string }

  // 檢查必填欄位
  const missingFields = checkMissingFields({ email })
  if (missingFields.length > 0) {
    const missingFieldsMsg = `缺少必要欄位: ${missingFields.join(", ")}`
    appErrorHandler(400, missingFieldsMsg, next)
    return
  }

  // 檢查 email 格式
  if (!validator.isEmail(email)) {
    appErrorHandler(400, "email 格式錯誤", next)
    return
  }

  // 檢查帳號是否存在
  const user = await User.findOne({ "personalInfo.email": email })
  if (!user) {
    appErrorHandler(400, "帳號不存在", next)
    return
  }

  // 寄出重設密碼信件
  await sendEmail(email)

  appSuccessHandler(200, "郵件寄送成功", null, res)
}

/**
 * 驗證 token 後回傳使用者資料
 */
const verifyToken = async (req: Request, res: Response): Promise<void> => {
  const userData = req.user as LoginResData

  appSuccessHandler(200, "驗證成功", userData, res)
}

const loginController = {
  signUp,
  login,
  resetPassword,
  forgetPassword,
  verifyToken
}

export default loginController
