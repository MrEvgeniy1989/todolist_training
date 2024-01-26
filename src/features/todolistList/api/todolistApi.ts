import { instance } from "common/api/instance"
import { Todolist } from "features/todolistList/api/todolistApi.types"
import { AppResponseType } from "common/types/types"
import { AxiosResponse } from "axios"

export const todolistApi = {
  getTodolists() {
    return instance.get<Todolist[]>(`/todo-lists`)
  },
  createTodolist(title: string) {
    return instance.post<
      AppResponseType<{ item: Todolist }>,
      AxiosResponse<AppResponseType<{ item: Todolist }>>,
      { title: string }
    >(`/todo-lists`, { title })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<AppResponseType>(`/todo-lists/${todolistId}`)
  },
  changeTodolistTitle(todolistId: string, title: string) {
    return instance.put<AppResponseType, AxiosResponse<AppResponseType>, { title: string }>(
      `/todo-lists/${todolistId}`,
      { title },
    )
  },
}
