import { instance } from "common/api/instance"
import { TaskType, TaskModelForUpdate } from "features/todolistList/todolist/task/api/taskApi.types"
import { AppResponseType } from "common/types/types"
import { AxiosResponse } from "axios"

export const taskApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<
      AppResponseType<{ item: TaskType }>,
      AxiosResponse<AppResponseType<{ item: TaskType }>>,
      {
        title: string
      }
    >(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<AppResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: TaskModelForUpdate) {
    return instance.put<
      AppResponseType<{ item: TaskType }>,
      AxiosResponse<
        AppResponseType<{
          item: TaskType
        }>
      >,
      TaskModelForUpdate
    >(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

type GetTasksResponse = {
  items: TaskType[]
  totalCount: number
  error: string
}
