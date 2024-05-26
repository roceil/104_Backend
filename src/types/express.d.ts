import { type Jwt } from "jsonwebtoken"

// to make the file a module and avoid the TypeScript error
export {}

declare global {
  namespace Express {
    export interface Request {
      user: Jwt.payload
      token: string
    }
  }
}
