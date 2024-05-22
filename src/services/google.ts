import { type Request, type Response, type NextFunction } from "express"
import bcrypt from "bcrypt"
import passport from "passport"
import { Strategy as GoogleStrategy, type Profile, type VerifyCallback } from "passport-google-oauth20"
import { User } from "@/models/user"
import generateJWT from "@/utils/generateJWT"
import appErrorHandler from "@/utils/appErrorHandler"
import { type LoginResData } from "@/types/login"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
interface GoogleProfile {
  sub: string
  name: string
  given_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}

/**
 * Google 登入策略
 */
const setupGoogleStrategy = (): void => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL
  },
  (_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback) => {
    // 取得使用者資料
    const googleProfile: GoogleProfile = profile._json as GoogleProfile

    // 傳遞使用者資料
    done(null, googleProfile)
  }
  ))
}

/**
 * Google 登入驗證
 */
const googleAuthenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  passport.authenticate("google", {
    scope: ["profile", "email",
      "https://www.googleapis.com/auth/user.birthday.read"
    ]
  })(req, res, next)
}

/**
 * Google 登入 Callback
 */
const googleCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  passport.authenticate("google", { session: false }, async (err, user, _info) => {
    if (err) {
      appErrorHandler(500, "Google 驗證失敗", next)
    }
    if (!user) {
      appErrorHandler(401, "取得使用者資訊失敗", next)
    }

    let userResData

    // 檢查使用者是否存在
    const userExist = await User.findOne({ "personalInfo.email": user.email })

    // 若使用者存在，則回傳使用者資料
    if (userExist) {
      userResData = userExist
    }

    // 若使用者不存在，則建立使用者
    const hashPassword = await bcrypt.hash(user.email as string, 10)
    if (!userExist) {
      const newUser = new User({
        personalInfo: {
          username: user.name,
          email: user.email,
          password: hashPassword
        }
      })

      await newUser.save()
      userResData = newUser
    }

    // 產生 token
    const jwtPayload: LoginResData = {
      userId: userResData?._id,
      email: userResData?.personalInfo.email,
      name: userResData?.personalInfo.username,
      gender: userResData?.personalInfo.gender,
      birthday: userResData?.personalInfo.birthday
    }

    const token = generateJWT(jwtPayload)

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: true, // 确保在 HTTPS 中使用
    //   sameSite: "none" // 可选，增强 CSRF 保护
    // })

    // 跳轉回首頁
    res.redirect(`${process.env.FRONTEND_URL}/login/${token}`)
  })(req, res)
}

/**
 * 測試 google 寫入 cookie
 */
const googleWriteCookie = async (req: Request, res: Response): Promise<void> => {
  const token = req.params.id

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  })

  res.end()
}

/**
 * 寄送帳號啟用信件
 */
const sendAccountVerifyEmail = async (email: string, token: string): Promise<void> => {
  const frontEndUrl = process.env.FRONTEND_URL
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_MAIL_USER,
      pass: process.env.GOOGLE_MAIL_PASSWORD
    }
  })

  await transporter.verify()

  const mailOptions = {
    from: `"【104】帳號管理中心" <${process.env.GOOGLE_MAIL_USER}>`,
    to: email,
    subject: "【104】帳號啟用信件",
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Email Template</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            background-color: #fff2f2;
            padding: 20px;
            margin: 0 auto;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            color: #52525b;
          }
          .button {
            background: linear-gradient(96.66deg, #fe839a 9.67%, #4a72ff 112.21%);
            display: block; /* Change to block */
            width: fit-content;
            padding: 10px 20px;
            margin: 20px auto; /* Auto margins for centering */
            color: white !important;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            border-radius: 99999px;
          }
          .button:hover {
            transform: scale(1.05);
          }
          table {
            width: 100%;
          }
          .centered-content {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>
            <img
            // TODO: 這裡的圖片連結要更換成 github 上的連結
              src="https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/logo.png"
              alt="logo"
            />
          </h1>
          <p>
            這是一封<strong>帳號啟用</strong>的確認信件，如果需要啟用帳號，請點擊下方按鈕立即啟用！
          </p>
          <p>如果不記得有申請此帳號，請忽略此信件。</p>
          <table>
            <tr>
              <td class="centered-content">
                <img
                // TODO: 這裡的圖片連結要更換成 github 上的連結
                  src="https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/decorate.png"
                  alt="裝飾用圖片"
                />
              </td>
            </tr>
          </table>
          <a
            href="${frontEndUrl}/active_account/${token}"
            class="button"
            >立即啟用</a
          >
        </div>
      </body>
    </html>
    `
  }

  transporter.sendMail(mailOptions, (err, _info) => {
    if (err) {
      throw new Error(err.message)
    }
  })
}

/**
 * 寄送重設密碼信件
 */
const sendResetPasswordEmail = async (email: string, token: string): Promise<void> => {
  const frontEndUrl = process.env.FRONTEND_URL
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_MAIL_USER,
      pass: process.env.GOOGLE_MAIL_PASSWORD
    }
  })

  await transporter.verify()

  const mailOptions = {
    from: `"【104】帳號管理中心" <${process.env.GOOGLE_MAIL_USER}>`,
    to: email,
    subject: "【104】重設密碼功能信件",
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Email Template</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            background-color: #fff2f2;
            padding: 20px;
            margin: 0 auto;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            color: #52525b;
          }
          .button {
            background: linear-gradient(96.66deg, #fe839a 9.67%, #4a72ff 112.21%);
            display: block; /* Change to block */
            width: fit-content;
            padding: 10px 20px;
            margin: 20px auto; /* Auto margins for centering */
            color: white !important;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            border-radius: 99999px;
          }
          .button:hover {
            transform: scale(1.05);
          }
          table {
            width: 100%;
          }
          .centered-content {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>
            <img
            // TODO: 這裡的圖片連結要更換成 github 上的連結
              src="https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/logo.png"
              alt="logo"
            />
          </h1>
          <p>
            這是一封<strong>重設密碼</strong>的確認信件，如果需要重設密碼，請點擊下方按鈕立即跳轉！
          </p>
          <p>如果不記得有申請重設密碼，請忽略此信件。</p>
          <table>
            <tr>
              <td class="centered-content">
                <img
                // TODO: 這裡的圖片連結要更換成 github 上的連結
                  src="https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/decorate.png"
                  alt="裝飾用圖片"
                />
              </td>
            </tr>
          </table>
          <a
            href="${frontEndUrl}/reset_password/${token}"
            class="button"
            >重設密碼</a
          >
        </div>
      </body>
    </html>
    `
  }

  transporter.sendMail(mailOptions, (err, _info) => {
    if (err) {
      throw new Error(err.message)
    }
  })
}

const googleService = {
  setupGoogleStrategy,
  googleAuthenticate,
  googleCallback,
  sendAccountVerifyEmail,
  sendResetPasswordEmail,
  googleWriteCookie
}

export default googleService
