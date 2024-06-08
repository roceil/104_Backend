import { z } from "zod"

const photoDetailsSchema = z.object({
  photo: z.string().default(""),
  isShow: z.boolean().default(false)
}).strict()

const introDetailsSchema = z.object({
  intro: z.string().default(""),
  isShow: z.boolean().default(false)
}).strict()

const nickNameDetailsSchema = z.object({
  nickName: z.string().default(""),
  isShow: z.boolean().default(false)
}).strict()

const phoneDetailsSchema = z.object({
  phone: z.string().default(""),
  isShow: z.boolean().default(false)
}).strict()

const companyDetailsSchema = z.object({
  company: z.string().default(""),
  isShow: z.boolean().default(false)
}).strict()

const incomeDetailsSchema = z.object({
  income: z.string().default(""),
  isShow: z.boolean().default(false)
}).strict()

const lineDetailsSchema = z.object({
  lineId: z.string().default(""),
  isShow: z.boolean().default(false)
}).strict()

const jobDetailsSchema = z.object({
  job: z.string().default(""),
  isShow: z.boolean().default(false)
}).strict()

const exposureSettingsSchema = z.object({
  rating: z.number().default(0),
  isShow: z.boolean().default(false),
  isMatch: z.boolean().default(false)
}).strict()

const userStatusSchema = z.object({
  rating: z.number().default(0),
  isMatch: z.boolean().default(false),
  point: z.number().default(0)
}).strict()

const personalInfoSchema = z.object({
  userId: z.string(),
  photoDetails: photoDetailsSchema,
  introDetails: introDetailsSchema,
  nickNameDetails: nickNameDetailsSchema,
  phoneDetails: phoneDetailsSchema,
  companyDetails: companyDetailsSchema,
  incomeDetails: incomeDetailsSchema,
  lineDetails: lineDetailsSchema,
  jobDetails: jobDetailsSchema,
  tags: z.array(z.string()).default([]),
  exposureSettings: exposureSettingsSchema,
  userStatus: userStatusSchema
}).strict()

// 定義一個允許部分更新的模式
export const partialPersonalInfoSchema = personalInfoSchema.partial()
