import {instance} from "./api";
import {ResponseType, TodolistType} from "../store/types";
import {AxiosResponse} from "axios";

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>(`/todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{
            item: TodolistType
        }>>, { title: string }>(`/todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string,title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, {
            title: string
        }>(`/todo-lists/${todolistId}`, {title})
    }
}