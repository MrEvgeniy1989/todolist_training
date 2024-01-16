import {ResultCode, TaskPriorities, TaskStatuses} from "./enums";

export type FilterType = 'all' | 'active' | 'completed'
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
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
    error: string | null
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
export type ResponseType<T = {}> = {
    resultCode: ResultCode
    messages: string[],
    data: T
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type DomainModelType = Partial<UpdateTaskModelType>
export type UserType = {
    id: number,
    email: string,
    login: string
}