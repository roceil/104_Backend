interface IInvitations {
  _id: string
  userId: string
  invitedUserId: string
  message: IMessage
  isFinishDating: boolean
  status: string
  date: string
  createdAt: string
  updatedAt: string
  profileByInvitedUser: IProfileByInvitedUser
  matchListSelfSettingByInvitedUser: IMatchListSelfSetting
  isUnlock: boolean
  isCollected: boolean
}

interface IMessage {
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

interface IProfileByInvitedUser {
  photoDetails?: IPhotoDetails
  introDetails?: IIntroDetails
  nickNameDetails: INickNameDetails
  lineDetails?: ILineDetails
  tags: string[]
  exposureSettings?: IExposureSettings
  userStatus?: IUserStatus
  companyDetails?: ICompanyDetails
  incomeDetails?: IIncomeDetails
  jobDetails?: IJobDetails
  phoneDetails?: IPhoneDetails
}

interface IPhotoDetails {
  photo: string
  isShow: boolean
}

interface IIntroDetails {
  intro: string
  isShow: boolean
}

interface INickNameDetails {
  nickName: string
  isShow: boolean
}

interface ILineDetails {
  lineId: string
  isShow: boolean
}

interface IExposureSettings {
  rating: number
  isShow: boolean
  isMatch: boolean
}

interface IUserStatus {
  rating?: number
  isMatch?: boolean
  point?: number
  commentScore: number
  commentCount: number
  _id?: string
}

interface ICompanyDetails {
  company: string
  isShow: boolean
}

interface IIncomeDetails {
  income: string
  isShow: boolean
}

interface IJobDetails {
  job: string
  isShow: boolean
}

interface IPhoneDetails {
  phone: string
  isShow: boolean
  _id?: string
}

interface IMatchListSelfSetting {
  message?: string
  searchDataBase?: string[]
  personalInfo?: IPersonalInfo
  workInfo?: IWorkInfo
}

interface IPersonalInfo {
  age: number
  gender: number
  isMarried: number
  height: number
  weight: number
  socialCircle: number
  activities: number[]
  location: number
  education: number
  liveWithParents: number
  religion: number
  smoking: number
}

interface IWorkInfo {
  occupation: number
  industry: number[]
  expectedSalary: number
}
export { type IInvitations }
