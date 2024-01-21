import {DomainModelType, ErrorType, RequestStatusType, TasksStateType, TaskType, UpdateTaskModelType} from "../types";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./appReducer";
import {AddTodolistACType, DeleteTodolistACType, SetTodolistsACType} from "./todolistsReducer";
import {tasksApi} from "../../api/tasksApi";
import {ResultCode} from "../enums";
import {AppRootStateType} from "../store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import axios from "axios";

export type SetTasksACType = ReturnType<typeof setTasksAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskEntityStatusACType = ReturnType<typeof changeTaskEntityStatusAC>
type ActionType =
    | SetTodolistsACType
    | SetTasksACType
    | UpdateTaskACType
    | DeleteTaskACType
    | AddTaskACType
    | AddTodolistACType
    | DeleteTodolistACType
    | ChangeTaskEntityStatusACType

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(todolist => copyState[todolist.id] = [])
            return copyState
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks.map(task => ({...task, entityStatus: 'idle'}))}
        }
        case "DELETE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.todolistId]: [{...action.task, entityStatus: 'idle'}, ...state[action.todolistId]]
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...action.task,
                    entityStatus: 'idle'
                } : task)
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
        case "CHANGE-TASK-ENTITY-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    entityStatus: action.newEntityStatus
                } : task)
            }
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
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, newEntityStatus: RequestStatusType) => ({
    type: 'CHANGE-TASK-ENTITY-STATUS',
    todolistId,
    taskId,
    newEntityStatus
} as const)

// Thunks
export const getTasks = (todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await tasksApi.getTasks(todolistId)
        dispatch(setTasksAC(todolistId, response.data.items))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response?.data ? e.response?.data.messages[0] : e.message
            handleServerNetworkError(dispatch, error)
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
    }
}
export const deleteTask = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))

    try {
        const response = await tasksApi.deleteTask(todolistId, taskId)
        if (response.data.resultCode === ResultCode.Succeeded) {
            dispatch(deleteTaskAC(todolistId, taskId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, response.data.messages)
        }
    } catch (e) {
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'))
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response?.data ? e.response?.data.messages[0] : e.message
            handleServerNetworkError(dispatch, error)
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
    }
}
export const addTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await tasksApi.createTask(todolistId, title)
        if (response.data.resultCode === ResultCode.Succeeded) {
            dispatch(addTaskAC(todolistId, response.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, response.data.messages)
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response?.data ? e.response?.data.messages[0] : e.message
            handleServerNetworkError(dispatch, error)
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
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
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, response.data.messages)
            }
        } catch (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                const error = e.response?.data ? e.response?.data.messages[0] : e.message
                handleServerNetworkError(dispatch, error)
            } else {
                handleServerNetworkError(dispatch, (e as Error).message)
            }
        }
    }
}