import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1'
})

export const api = {
    getTodolists() {
        return instance.get<TodolistType[]>(`/todo-lists`)
    },
    addTodolist(title: string) {
        return instance.post<ResponsType<{ item: TodolistType }>, AxiosResponse<ResponsType<{ item: TodolistType }>>, {
            title: string
        }>(`/todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponsType>(`/todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponsType<{ item: TodolistType }>, AxiosResponse<ResponsType<{ item: TodolistType }>>, {
            title: string
        }>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<TasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponsType<{ item: TaskType }>, AxiosResponse<ResponsType<{ item: TaskType }>>, {
            title: string
        }>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponsType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, updateTaskModel: UpdateTaskModelType) {
        return instance.put<ResponsType<{ item: TaskType }>, AxiosResponse<ResponsType<{
            item: TaskType
        }>>, UpdateTaskModelType>(`/todo-lists/${todolistId}/tasks/${taskId}`, updateTaskModel)
    }
}

// Types
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}
export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

export enum TaskStatuses {
    New = 0,
    Completed = 1,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TasksType = {
    items: TaskType[],
    totalCount: number,
    error: string | null,
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type ResponsType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}