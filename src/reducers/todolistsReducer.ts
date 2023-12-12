import {FilterType, TodolistType} from "../App";

type ActionType =
    | addTodolistACType
    | deleteTodolistACType
    | changeTodolistTitleACType
    | changeFilterACType

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type changeFilterACType = ReturnType<typeof changeFilterAC>

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {
                todolistId: action.payload.todolistId,
                todolistTitle: action.payload.newTodolistTitle,
                filter: 'all'
            }
            return [newTodolist, ...state]
        case "DELETE-TODOLIST":
            return state.filter(todolist => todolist.todolistId !== action.payload.todolistId)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(todolist => todolist.todolistId === action.payload.todolistId ? {
                ...todolist,
                todolistTitle: action.payload.newTodolistTitle
            } : todolist)
        case "CHANGE-FILTER":
            return state.map(todolist => todolist.todolistId === action.payload.todolistId ? {...todolist, filter: action.payload.newFilterValue} : todolist)
        default:
            return state
    }
}

export const addTodolistAC = (todolistId: string, newTodolistTitle: string) => {
    return {type: 'ADD-TODOLIST', payload: {todolistId, newTodolistTitle}} as const
}
export const deleteTodolistAC = (todolistId: string) => {
    return {type: 'DELETE-TODOLIST', payload: {todolistId}} as const
}
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, newTodolistTitle}} as const
}
export const changeFilterAC = (todolistId: string, newFilterValue: FilterType) => {
    return {type: 'CHANGE-FILTER', payload: {todolistId, newFilterValue}} as const
}