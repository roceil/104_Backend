import mongoose from "mongoose"

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DATABASE_URI as unknown as string)
    console.log("MongoDB 連線成功")
  } catch (error) {
    console.error("MongoDB 連線失敗 => ", error)
    process.exit(1)
  }
}

export default connectDB
