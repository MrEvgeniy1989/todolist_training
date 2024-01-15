import {instance} from "./api";
import {TasksType} from "../store/types";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<TasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: any) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}