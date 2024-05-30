type AnyObject = Record<string, unknown>

export function eraseProperty (obj: unknown, properties: string[], eraseProperties: string[]): void {
  if (typeof obj !== "object" || obj === null) {
    return
  }
  const objAsRecord = obj as AnyObject
  Object.keys(objAsRecord).forEach((key) => {
    if (properties.includes(key)) {
      if (typeof objAsRecord[key] === "object" && objAsRecord[key] !== null) {
        eraseProperties.forEach((eraseKey) => {
          if (Array.isArray(objAsRecord[key])) {
            (objAsRecord[key] as unknown[]).forEach((item, index) => {
              // 刪除在array中有eraseProperties的屬性
              Reflect.deleteProperty((objAsRecord[key] as AnyObject[])[index], eraseKey)
              // 再把array中的物件再次遞迴檢查
              eraseProperty((objAsRecord[key] as AnyObject[])[index], properties, eraseProperties)
            })
          } else {
            Reflect.deleteProperty(objAsRecord[key] as AnyObject, eraseKey)
          }
        })
      }
    } else {
      eraseProperty(objAsRecord[key], properties, eraseProperties)
    }
  })
}
