export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URI: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      GOOGLE_CLIENT_CALLBACK_URL: string
      FRONTEND_URL: string
    }
  }
}
