import {ErrorType, FilterType, RequestStatusType, TodolistDomainType, TodolistType} from "../types";
import {Dispatch} from "redux";
import {todolistsApi} from "../../api/todolistsApi";
import {setAppStatusAC} from "./appReducer";
import {getTasks} from "./tasksReducer";
import axios from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {ResultCode} from "../enums";

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
type ActionType =
    | SetTodolistsACType
    | UpdateTodolistTitleACType
    | ChangeTodolistFilterACType
    | AddTodolistACType
    | DeleteTodolistACType
    | ChangeTodolistEntityStatusACType

const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(todolist => ({...todolist, filter: 'all', entityStatus: 'idle'}))
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                filter: action.filter
            } : todolist)
        }
        case "UPDATE-TODOLIST-TITLE": {
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                title: action.newTitle
            } : todolist)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
            return [newTodolist, ...state]
        }
        case "DELETE-TODOLIST": {
            return state.filter(todolist => todolist.id !== action.todolistId)
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                entityStatus: action.entityStatus
            } : todolist)
        }
        default: {
            return state
        }
    }
}

// ActionCreators
const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
const deleteTodolistAC = (todolistId: string) => ({type: 'DELETE-TODOLIST', todolistId} as const)
const updateTodolistTitleAC = (todolistId: string, newTitle: string) => ({
    type: 'UPDATE-TODOLIST-TITLE',
    todolistId,
    newTitle
} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter
} as const)
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    todolistId,
    entityStatus
} as const)

// Thunks
export const getTodolists = () => async (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await todolistsApi.getTodolists()
        const todolists = response.data
        dispatch(setTodolistsAC(todolists))
        dispatch(setAppStatusAC('succeeded'))
        todolists.forEach(todolist => {
            dispatch(getTasks(todolist.id))
        })
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response?.data ? e.response?.data.messages[0] : e.message
            handleServerNetworkError(dispatch, error)
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
    }

}
export const addTodolistTC = (title: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await todolistsApi.createTodolist(title)
        if (response.data.resultCode === ResultCode.Succeeded) {
            dispatch(addTodolistAC(response.data.data.item))
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
export const deleteTodolist = (todolistId: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))

    try {
        const response = await todolistsApi.deleteTodolist(todolistId)
        if (response.data.resultCode === ResultCode.Succeeded) {
            dispatch(deleteTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, response.data.messages)
        }
    } catch (e) {
        dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response?.data ? e.response?.data.messages[0] : e.message
            handleServerNetworkError(dispatch, error)
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
    }

}
export const updateTodolistTitle = (todolistId: string, newTitle: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await todolistsApi.updateTodolist(todolistId, newTitle)
        if (response.data.resultCode === ResultCode.Succeeded) {
            dispatch(updateTodolistTitleAC(todolistId, newTitle))
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