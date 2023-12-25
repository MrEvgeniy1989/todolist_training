import {api, FilterType, TodolistDomainType, TodolistType} from "../api/api";
import {Dispatch} from "redux";

type ActionType =
    | setTodolistACType
    | addTodolistACType
    | deleteTodolistACType
    | updateTodolistTitleACType
    | updateTodolistFilterACType

export type setTodolistACType = ReturnType<typeof setTodolistsAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type updateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export type updateTodolistFilterACType = ReturnType<typeof updateTodolistFilterAC>

export const todolistsReducer = (state: TodolistDomainType[] = [], action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(todolist => ({...todolist, filter: 'all'}))
        }
        case "ADD-TODOLIST": {
            return [{...action.todolist, filter: 'all'}, ...state]
        }
        case "DELETE-TODOLIST": {
            return state.filter(todolist => todolist.id !== action.todolistId)
        }
        case "UPDATE-TODOLIST-TITLE": {
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                title: action.title
            } : todolist)
        }
        case "UPDATE-TODOLIST-FILTER": {
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                filter: action.filter
            } : todolist)
        }
        default: {
            return state
        }
    }
}

// ActionCreators
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const deleteTodolistAC = (todolistId: string) => ({type: 'DELETE-TODOLIST', todolistId} as const)
export const updateTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'UPDATE-TODOLIST-TITLE',
    todolistId,
    title
} as const)
export const updateTodolistFilterAC = (todolistId: string, filter: FilterType) => ({
    type: 'UPDATE-TODOLIST-FILTER',
    todolistId,
    filter
} as const)

// Thunks
export const setTodolistsTC = () => (dispatch: Dispatch) => {
    api.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    api.addTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    api.deleteTodolist(todolistId)
        .then(res => {
            dispatch(deleteTodolistAC(todolistId))
        })
}
export const updateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    api.updateTodolistTitle(todolistId, title)
        .then(res => {
            dispatch(updateTodolistTitleAC(todolistId, title))
        })
}