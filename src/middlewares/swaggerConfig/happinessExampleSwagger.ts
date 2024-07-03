import { type NextFunction, type Request, type Response } from "express"

export function getAllExamplesSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["happiness-example-幸福案例"]
   * #swagger.description = "取得所有幸福案例"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.responses[200] = {
      description: '成功取得所有幸福案例',
      schema: {
        status: true,
        message: "成功取得所有幸福案例",
        data: [
          {
            _id: "6450b1c14bfccc4b484b2d23",
            userId: "6450b1c14bfccc4b484b2d23",
            myName: "John",
            partnerName: "Jane",
            coverImage: "https://example.com/image.jpg",
            imgList: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
            title: "Our Happy Story",
            content: "This is our happy story...",
            createdAt: "2024-05-22T02:14:28.873Z",
            updatedAt: "2024-05-22T02:14:28.873Z"
          }
        ]
      }
    }
   * #swagger.responses[404] = {
      description: '無法取得幸福案例',
      schema: {
        status: false,
        message: "無法取得幸福案例，請稍後再試"
      }
    }
   */
  next()
}

export function getExampleByIdSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["happiness-example-幸福案例"]
   * #swagger.description = "取得單一幸福案例"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters['id'] = {
      in: 'path',
      description: '幸福案例ID',
      required: true,
      type: 'string'
    }
   * #swagger.responses[200] = {
      description: '成功取得幸福案例',
      schema: {
        status: true,
        message: "成功取得幸福案例",
        data: {
          mainExample: {
            _id: "6450b1c14bfccc4b484b2d23",
            userId: "6450b1c14bfccc4b484b2d23",
            myName: "John",
            partnerName: "Jane",
            coverImage: "https://example.com/image.jpg",
            imgList: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
            title: "Our Happy Story",
            content: "This is our happy story...",
            createdAt: "2024-05-22T02:14:28.873Z",
            updatedAt: "2024-05-22T02:14:28.873Z"
          },
          relatedExample: [
            {
              _id: "6450b1c14bfccc4b484b2d24",
              userId: "6450b1c14bfccc4b484b2d24",
              myName: "Alice",
              partnerName: "Bob",
              coverImage: "https://example.com/image2.jpg",
              imgList: ["https://example.com/image3.jpg", "https://example.com/image4.jpg"],
              title: "Another Happy Story",
              content: "This is another happy story...",
              createdAt: "2024-05-22T02:14:28.873Z",
              updatedAt: "2024-05-22T02:14:28.873Z"
            }
          ]
        }
      }
    }
   * #swagger.responses[404] = {
      description: '無法取得幸福案例',
      schema: {
        status: false,
        message: "無法取得幸福案例，請稍後再試"
      }
    }
   */
  next()
}

export function uploadExampleCoverImageSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["happiness-example-幸福案例"]
   * #swagger.description = "上傳幸福案例封面圖片"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.consumes = ['multipart/form-data']
   * #swagger.parameters['file'] = {
      in: 'formData',
      description: '封面圖片文件',
      required: true,
      type: 'file'
    }
   * #swagger.responses[200] = {
      description: '上傳成功',
      schema: {
        status: true,
        message: "上傳成功",
        data: {
          coverImage: "https://example.com/uploaded-image.jpg"
        }
      }
    }
   * #swagger.responses[400] = {
      description: '請上傳圖片',
      schema: {
        status: false,
        message: "請上傳圖片"
      }
    }
   * #swagger.responses[500] = {
      description: '上傳失敗',
      schema: {
        status: false,
        message: "上傳失敗，請稍後再試"
      }
    }
   */
  next()
}

export function uploadExampleImagesSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["happiness-example-幸福案例"]
   * #swagger.description = "上傳幸福案例多張圖片"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.consumes = ['multipart/form-data']
   * #swagger.parameters['files'] = {
      in: 'formData',
      description: '多張圖片文件',
      required: true,
      type: 'array',
      items: {
        type: 'file'
      }
    }
   * #swagger.responses[200] = {
      description: '上傳成功',
      schema: {
        status: true,
        message: "上傳成功",
        data: {
          images: [
            "https://example.com/uploaded-image1.jpg",
            "https://example.com/uploaded-image2.jpg"
          ]
        }
      }
    }
   * #swagger.responses[400] = {
      description: '請上傳圖片',
      schema: {
        status: false,
        message: "請上傳圖片"
      }
    }
   * #swagger.responses[500] = {
      description: '上傳失敗',
      schema: {
        status: false,
        message: "上傳失敗，請稍後再試"
      }
    }
   */
  next()
}

export function addExampleSwagger (_req: Request, _res: Response, next: NextFunction): void {
  /**
   * #swagger.tags = ["happiness-example-幸福案例"]
   * #swagger.description = "新增幸福案例"
   * #swagger.security = [{
      "apiKeyAuth":[]
    }]
   * #swagger.parameters['body'] = {
      in: 'body',
      description: '幸福案例資料',
      required: true,
      schema: {
        type: 'object',
        required: ['myName', 'partnerName', 'coverImage', 'title', 'content'],
        properties: {
          myName: {
            type: 'string'
          },
          partnerName: {
            type: 'string'
          },
          coverImage: {
            type: 'string'
          },
          imgList: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          title: {
            type: 'string'
          },
          content: {
            type: 'string'
          }
        }
      }
    }
   * #swagger.responses[200] = {
      description: '成功新增幸福案例',
      schema: {
        status: true,
        message: "成功新增幸福案例",
        data: {
          _id: "6450b1c14bfccc4b484b2d23",
          userId: "6450b1c14bfccc4b484b2d23",
          myName: "John",
          partnerName: "Jane",
          coverImage: "https://example.com/image.jpg",
          imgList: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
          title: "Our Happy Story",
          content: "This is our happy story...",
          createdAt: "2024-05-22T02:14:28.873Z",
          updatedAt: "2024-05-22T02:14:28.873Z"
        }
      }
    }
   * #swagger.responses[400] = {
      description: '無法新增幸福案例',
      schema: {
        status: false,
        message: "無法新增幸福案例，請稍後再試"
      }
    }
   */
  next()
}
