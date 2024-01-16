import {FilterType, TodolistDomainType, TodolistType} from "../types";
import {Dispatch} from "redux";
import {todolistsApi} from "../../api/todolistsApi";
import {setAppStatusAC} from "./appReducer";
import {getTasks} from "./tasksReducer";

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
type ActionType =
    | SetTodolistsACType
    | UpdateTodolistTitleACType
    | ChangeTodolistFilterACType

const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(todolist => ({...todolist, filter: 'all', entityStatus: 'idle'}))
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(todolist => todolist.id === action.todolistId ? {...todolist, filter: action.filter} : todolist)
        }
        case "UPDATE-TODOLIST-TITLE": {
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                title: action.newTitle
            } : todolist)
        }
        default: {
            return state
        }
    }
}

// ActionCreators
const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
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
    } catch (error: any) {
        dispatch(setAppStatusAC('failed'))
    }

}
export const updateTodolistTitle = (todolistId: string, newTitle: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await todolistsApi.updateTodolist(todolistId, newTitle)
        if (response.data.resultCode === 0) {
            dispatch(updateTodolistTitleAC(todolistId, newTitle))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppStatusAC('failed'))
        }
    } catch (error: any) {
        dispatch(setAppStatusAC('failed'))
    }

}