export function checkPageSizeAndPageNumber (pageSize: string | undefined, pageNumber: string | undefined) {
  pageSize = pageSize ?? "10"
  pageNumber = pageNumber ?? "1"

  // 確保 pageSize 和 pageNumber 是合法的數字

  let parsedPageSize = parseInt(pageSize)
  let parsedPageNumber = parseInt(pageNumber)
  // 若不是數字與不對的數值，則設定預設值
  if (isNaN(parsedPageSize)) {
    parsedPageSize = 10
  }
  if (isNaN(parsedPageNumber)) {
    parsedPageNumber = 1
  }
  if (parsedPageSize <= 0) {
    parsedPageSize = 10
  }
  if (parsedPageNumber <= 0) {
    parsedPageNumber = 1
  }
  return { parsedPageNumber, parsedPageSize }
}
