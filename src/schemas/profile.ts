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

const incomeDetailsSchema = z.object({
  income: z.string().default(""),
  isShow: z.boolean().default(false)
}).strict()

const lineDetailsSchema = z.object({
  lineId: z.string().default(""),
  isShow: z.boolean().default(false)
}).strict()

const exposureSettingsSchema = z.object({
  rating: z.string().default(""),
  isShow: z.boolean().default(false),
  isMatch: z.boolean().default(false)
}).strict()

const personalInfoSchema = z.object({
  userId: z.string(),
  photoDetails: photoDetailsSchema,
  introDetails: introDetailsSchema,
  nickNameDetails: nickNameDetailsSchema,
  incomeDetails: incomeDetailsSchema,
  lineDetails: lineDetailsSchema,
  tags: z.array(z.string()).default([]),
  exposureSettings: exposureSettingsSchema
}).strict()

// 定義一個允許部分更新的模式
export const partialPersonalInfoSchema = personalInfoSchema.partial()
