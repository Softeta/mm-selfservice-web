export type TErrorData = {
  Title?: string
}

export type TResponse = {
  status: number
  data: TErrorData
}

export type TErrorResponse = {
  message: string
  response: TResponse
}
