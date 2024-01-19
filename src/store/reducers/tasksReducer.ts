import {DomainModelType, TasksStateType, TaskType, UpdateTaskModelType} from "../types";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./appReducer";
import {AddTodolistACType, DeleteTodolistACType, SetTodolistsACType} from "./todolistsReducer";
import {tasksApi} from "../../api/tasksApi";
import {ResultCode} from "../enums";
import {AppRootStateType} from "../store";

export type SetTasksACType = ReturnType<typeof setTasksAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
type ActionType =
    | SetTodolistsACType
    | SetTasksACType
    | UpdateTaskACType
    | DeleteTaskACType
    | AddTaskACType
    | AddTodolistACType
    | DeleteTodolistACType

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(todolist => copyState[todolist.id] = [])
            return copyState
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }
        case "DELETE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        }
        case "ADD-TASK": {
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? action.task : task)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case "DELETE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        default: {
            return state
        }
    }
}

// ActionTypes
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks} as const)
export const deleteTaskAC = (todolistId: string, taskId: string) => ({type: 'DELETE-TASK', todolistId, taskId} as const)
export const addTaskAC = (todolistId: string, task: TaskType) => ({type: 'ADD-TASK', todolistId, task} as const)
export const updateTaskAC = (todolistId: string, taskId: string, task: TaskType) => ({
    type: 'UPDATE-TASK',
    todolistId,
    taskId,
    task
} as const)

// Thunks
export const getTasks = (todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await tasksApi.getTasks(todolistId)
        dispatch(setTasksAC(todolistId, response.data.items))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        dispatch(setAppStatusAC('failed'))
    }
}
export const deleteTask = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await tasksApi.deleteTask(todolistId, taskId)
        if (response.data.resultCode === ResultCode.Succeeded) {
            dispatch(deleteTaskAC(todolistId, taskId))
        }
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        dispatch(setAppStatusAC('failed'))
    }
}
export const addTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await tasksApi.createTask(todolistId, title)
        if (response.data.resultCode === ResultCode.Succeeded) {
            dispatch(addTaskAC(todolistId, response.data.data.item))
        }
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        dispatch(setAppStatusAC('failed'))
    }
}
export const updateTask = (todolistId: string, taskId: string, domainModel: DomainModelType) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const task = getState().tasks[todolistId].find(task => task.id === taskId)

    if (!!task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }

        try {
            const response = await tasksApi.updateTask(todolistId, taskId, model)
            if (response.data.resultCode === ResultCode.Succeeded) {
                dispatch(updateTaskAC(todolistId, taskId, response.data.data.item))
            }
            dispatch(setAppStatusAC('succeeded'))
        } catch (error: any) {
            dispatch(setAppStatusAC('failed'))
        }
    }
}