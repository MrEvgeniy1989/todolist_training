import { RequestStatus } from "common/types/types"

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type Filter = "all" | "active" | "completed"
export type TodolistDomain = Todolist & {
  filter: Filter
  entityStatus: RequestStatus
}
