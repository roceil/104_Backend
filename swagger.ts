import swaggerAutogen from "swagger-autogen"
import dotenv from "dotenv"
const host = process.env.PORT ?? "backend.zeabur.internal:8080"
dotenv.config({ path: ".env.local" })
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
