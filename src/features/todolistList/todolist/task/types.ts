import { TaskType } from "features/todolistList/todolist/task/api/taskApi.types"

export type TasksState = {
  [todolistId: string]: TaskType[]
}
