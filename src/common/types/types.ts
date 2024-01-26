import { ResultCode } from "common/enums/enums"

export type AppResponseType<T = {}> = {
  data: T
  resultCode: ResultCode
  messages: string[]
}
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
