import swaggerAutogen from "swagger-autogen"
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })
const host = `localhost:${process.env.PORT}` ?? "https://104-backend.zeabur.app"
const doc = {
  info: {
    title: "104_Backend",
    description: "the backend"
  },
  host,
  schemes: ["http", "https"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "cookie",
      name: "authorization",
      description: "請加上API Token"
    }
  }
}

const outputFile = "./swagger-output.json"
const endpointsFiles = ["./app.ts"]
swaggerAutogen(outputFile, endpointsFiles, doc)
