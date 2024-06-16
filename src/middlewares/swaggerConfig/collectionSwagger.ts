import { type NextFunction, type Request, type Response } from "express"
export function getCollectionsByUserIdSwagger (_req: Request, _res: Response, next: NextFunction): void {
// {
//   "status": true,
//   "message": "查詢成功",
//   "data": [
//     {
//       "_id": "666a8564a9249066cc79d1fb",
//       "userId": "665fe01431e8f0630d407037",
//       "collectedUserId": [
//         "6654431dedb728aae4b1f24b"
//       ],
//       "createdAt": "2024-06-13T05:36:36.125Z",
//       "updatedAt": "2024-06-13T05:36:36.125Z",
//       "user": [
//         {
//           "_id": "665fe01431e8f0630d455445",
//           "personalInfo": {
//             "username": "Eason",
//             "email": "a12155544422@hotmail.com",
//             "gender": null,
//             "birthday": null,
//             "_id": "665fe01431e8f0630d407038"
//           },
//           "isSubscribe": false,
//           "points": 29955,
//           "resetPasswordToken": "",
//           "isActive": true,
//           "blockedUsers": [],
//           "notifications": [],
//           "createdAt": "2024-06-05T03:48:36.621Z",
//           "updatedAt": "2024-06-12T14:21:27.962Z"
//         }
//       ],
//       "collectedUsers": [
//         {
//           "_id": "6654431dedb728aae4b1f24b",
//           "personalInfo": {
//             "username": "fxc98231",
//             "email": "fxc98231@doolk.com",
//             "gender": null,
//             "birthday": null,
//             "_id": "6654431dedb728aae4b1f24c"
//           },
//           "isSubscribe": false,
//           "points": 0,
//           "resetPasswordToken": "",
//           "isActive": true,
//           "blockedUsers": [],
//           "notifications": [],
//           "createdAt": "2024-05-27T08:23:57.014Z",
//           "updatedAt": "2024-05-27T08:25:22.572Z"
//         }
//       ],
//       "id": "666a8564a9249066cc79d1fb"
//     }
//   ]
// }
  /**
   * #swagger.tags = ["收藏"]
   * #swagger.description = "取得所有收藏"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.responses[200] = {
  description: '取得所有收藏成功',
  schema: {
    status: true,
    message: "取得所有收藏成功",
    data: [
      {
        _id: "60b5e7b5d2d9e1b6c8e1b3b0",
        userId: "60b5e7b5d2d9e1b6c8e1b3b0",
        collectedUserId: ["6654431dedb728aae4b1f24b"],
        createdAt: "2024-06-13T05:36:36.125Z",
        updatedAt: "2024-06-13T05:36:36.125Z",
        user: [
          {
            _id: "665fe01431e8f0630d407037",
            personalInfo: {
              username: "Eason",
              email: "a1221gsdf@hotmail.com",
              gender: null,
              birthday: null,
              _id: "665fe01431e8f0630d407038"
            },
            isSubscribe: false,
            points: 29955,
            resetPasswordToken: "",
            isActive: true,
            blockedUsers: [],
            notifications: [],
            createdAt: "2024-06-05T03:48:36.621Z",
            updatedAt: "2024-06-12T14:21:27.962Z"
          }
        ],
        id: "666a8564a9249066cc79d1fb"
      }
    ]
  }
}
   */
  next()
}

export function addCollectionSwagger (_req: Request, _res: Response, next: NextFunction): void {
  // {
  //   "status": true,
  //   "message": "收藏成功",
  //   "data": {
  //     "_id": "666a8564a9249066cc79d1fb",
  //     "userId": "665fe01431e8f0630d407037",
  //     "collectedUserId": [
  //       "6654431dedb728aae4b1f24b",
  //       "665c2f502ab2d6460452171c"
  //     ],
  //     "createdAt": "2024-06-13T05:36:36.125Z",
  //     "updatedAt": "2024-06-13T05:55:01.382Z",
  //     "id": "666a8564a9249066cc79d1fb"
  //   }
  // }
  /**
   * #swagger.tags = ["收藏"]
   * #swagger.description = "新增收藏"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters["body"] = {
        in: "body",
        name: "body",
        required: true,
        schema: {
          $collectedUserId: "60b5e7b5d2d9e1b6c8e1b3b0"
        }
    }
   * #swagger.responses[201] = {
      description: '新增收藏成功',
      schema: {
          status: true,
          message: "新增收藏成功",
          data: {
            _id: "60b5e7b5d2d9e1b6c8e1b3b0",
            userId: "60b5e7b5d2d9e1b6c8e1b3b0",
            collectedUserId: ["60b5e7b5d2d9e1b6c8e1b3b0"],
            createdAt: "2024-06-13T05:36:36.125Z",
            updatedAt: "2024-06-13T05:55:01.382Z",
            id: "60b5e7b5d2d9e1b6c8e1b3b0"
          }
      }
    }
   */
  next()
}
export function deleteCollectionByIdSwagger (_req: Request, _res: Response, next: NextFunction): void {
  // {
  //   "status": true,
  //   "message": "取消收藏成功",
  //   "data": {
  //     "_id": "666a8c5e25dcc9982e565a0d",
  //     "userId": "665fe01431e8f0630d407037",
  //     "collectedUserId": [],
  //     "createdAt": "2024-06-13T06:06:22.897Z",
  //     "updatedAt": "2024-06-13T06:10:41.225Z",
  //     "id": "666a8c5e25dcc9982e565a0d"
  //   }
  // }
  /**
   * #swagger.tags = ["收藏"]
   * #swagger.description = "刪除收藏"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters["body"] = {
        in: "body",
        name: "body",
        required: true,
        schema: {
          $collectedUserId: "60b5e7b5d2d9e1b6c8e1b3b0"
        }
    }
   * #swagger.responses[200] = {
      description: '刪除收藏',
      schema: {
          status: true,
          message: "取消收藏成功",
          data: {
            _id: "60b5e7b5d2d9e1b6c8e1b3b0",
            userId: "60b5e7b5d2d9e1b6c8e1b3b0",
            collectedUserId: [],
            createdAt: "2024-06-13T06:06:22.897Z",
            updatedAt: "2024-06-13T06:06:22.897Z",
            id: "60b5e7b5d2d9e1b6c8e1b3b0"
          }
      }
    }
   */
  next()
}
