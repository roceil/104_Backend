import dotenv from "dotenv"
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const port = process.env.PORT

const allowOrigin = [
  "https://104social-front-end.vercel.app",
  "https://104-backend.zeabur.app",
  "https://104-frontend.zeabur.app",
  "http://104-backend.zeabur.app",
  "https://104-dev.zeabur.app",
  "http://104-dev.zeabur.app",
  "http://localhost:3000",
  "http://localhost:3001"
]

// 如果 port 存在且是數字，則將相應的本地端口添加到 allowOrigin 中
if (port && !isNaN(Number(port))) {
  allowOrigin.push(`http://localhost:${port}`)
}

export default allowOrigin
