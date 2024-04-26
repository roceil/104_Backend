import { type CorsOptions } from "cors"
import allowOrigin from "./allowOrigins"

export const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    console.log(origin)
    if ((origin && allowOrigin.includes(origin)) ?? !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"), false)
    }
  },
  optionsSuccessStatus: 200
}
