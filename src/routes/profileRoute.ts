import { type RequestHandler, Router } from "express"
import { getUserById, getUserByAuth, postUser, putUser } from "@/controllers/profileController"
import asyncErrorHandler from "@/middlewares/asyncErrorHandler"
import isAuth from "@/middlewares/isAuth"
const router = Router()
router.get("/", isAuth, asyncErrorHandler(
  /**
 * #swagger.tags = ["Profile-會員資料"]
 * #swagger.description = "取得會員資料"
 * #swagger.security = [{
      "apiKeyAuth":[]
    }]
 * #swagger.responses[200] = {
            description: '註冊資訊',
            schema: {
                status: true,
                message: "查詢成功",
                data: {
                  _id: "6642c1504ff7d57fb94d9115",
                  userId: "6642bfaec60d4f7c475d8401",
                  nickNameDetails: {
                    nickName: "Eason",
                    isShow: false,
                    },
                  tags: [],
                  createdAt: "2024-05-14T01:41:36.960Z",
                  updatedAt: "2024-05-14T02:10:50.806Z"
                }
            }
        }
 */
  getUserByAuth) as RequestHandler)

router.get("/:id", isAuth, asyncErrorHandler(
/**
 * #swagger.tags = ["Profile-會員資料"]
 * #swagger.description = "取得會員資料"
 * #swagger.security = [{
      "apiKeyAuth":[]
    }]
 * #swagger.responses[200] = {
            description: '註冊資訊',
            schema: {
                status: true,
                message: "查詢成功",
                data: {
                  _id: "6642c1504ff7d57fb94d9115",
                  userId: "6642bfaec60d4f7c475d8401",
                  nickNameDetails: {
                    nickName: "Eason",
                    isShow: false,
                    },
                  tags: [],
                  createdAt: "2024-05-14T01:41:36.960Z",
                  updatedAt: "2024-05-14T02:10:50.806Z"
                }
            }
        }
 */
  getUserById) as RequestHandler)

router.post("/", isAuth, asyncErrorHandler(
  /**
   * #swagger.tags = ["Profile-會員資料"]
   * #swagger.description = "新增會員資料"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters["body"] = {
            in: "body",
            type: Object,
            required: true,
            description: "資料格式",
            schema: {
                $userId:"6642bfaec60d4f7c475d8401",
                nickNameDetails:{
                  nickName:"Jack",
                  isShow:true
                }
            }
    }
   * #swagger.responses[200] = {
            description: '註冊資訊',
            schema: {
                status: true,
                message: "用戶新增成功",
                data: {
                  _id: "6642bfaec60d4f7c475d8401",
                  personalInfo: {
                  email: "a444455555@hotmail.com",
                  username: "咚咚",
                  gender: null,
                  birthday: null,
                },
                isSubscribe: false,
                points: 0,
                resetPasswordToken: "",
                isActive: true,
                blockedUsers: [],
                notifications: [],
                createdAt: "2024-05-14T01:34:38.298Z",
                updatedAt: "2024-05-14T01:34:38.298Z"
                }
            }
        }
   */
  postUser) as RequestHandler)

router.put("/", isAuth, asyncErrorHandler(
  /**
   * #swagger.tags = ["Profile-會員資料"]
   * #swagger.description = "修改會員資料"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters["body"] = {
            in: "body",
            type: Object,
            required: true,
            description: "資料格式",
            schema: {
                $userId:"6642bfaec60d4f7c475d8401",
                nickNameDetails:{
                  nickName:"Jack",
                  isShow:true
                }
            }
    }
   * #swagger.responses[200] = {
            description: '修改使用者資訊',
            schema: {
                status: true,
                message: "修改資料成功",
                data: {
                  _id: "6642bfaec60d4f7c475d8401",
                  personalInfo: {
                  email: "a444455555@hotmail.com",
                  username: "咚咚",
                  gender: null,
                  birthday: null,
                },
                isSubscribe: false,
                points: 0,
                resetPasswordToken: "",
                isActive: true,
                blockedUsers: [],
                notifications: [],
                createdAt: "2024-05-14T01:34:38.298Z",
                updatedAt: "2024-05-14T01:34:38.298Z"
                }
            }
        }
   */
  putUser) as RequestHandler)

// router.delete("/:id", asyncErrorHandler(deleteUser) as RequestHandler)

export default router
