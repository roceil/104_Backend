import { Profile } from "@/models/profile"
import { type Types } from "mongoose"
const isUserProfileExist = async (userId: Types.ObjectId): Promise<boolean> => {
  const user = await Profile.findOne({ userId })
  if (user) {
    return true
  } else {
    return false
  }
}

export { isUserProfileExist }
