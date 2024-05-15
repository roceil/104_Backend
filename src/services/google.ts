import { type Request, type Response, type NextFunction } from "express"
import bcrypt from "bcrypt"
import passport from "passport"
import { Strategy as GoogleStrategy, type Profile, type VerifyCallback } from "passport-google-oauth20"
import { User } from "@/models/user"
import appErrorHandler from "@/utils/appErrorHandler"
import appSuccessHandler from "@/utils/appSuccessHandler"
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
    clientID: process.env.GOOGLE_CLIENT_ID as unknown as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as unknown as string,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL as unknown as string
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

    // TODO:要如何處理沒有取得生日跟性別的情況

    // 若使用者不存在，則建立使用者
    const hashPassword = await bcrypt.hash(user.email as string, 10)
    if (!userExist) {
      const newUser = new User({
        personalInfo: {
          username: user.name,
          email: user.email,
          password: hashPassword,
          gender: "male",
          birthday: "1991-01-01"
        }
      })

      await newUser.save()
      userResData = newUser
    }

    // TODO:要如何處理 token 寫入 cookie

    appSuccessHandler(200, "Google 登入成功", userResData, res)
  })(req, res)
}

const googleService = {
  setupGoogleStrategy,
  googleAuthenticate,
  googleCallback
}

export default googleService
