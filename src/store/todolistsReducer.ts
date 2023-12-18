import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    todolistId: string
    todolistTitle: string
    filter: FilterType
}

export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ActionType =
    | deleteTodolistACType
    | changeTodolistFilterACType
    | addTodolistACType
    | changeTodolistTitleACType

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialTodolistsState: TodolistType[] = [
    {todolistId: todolistId1, todolistTitle: "Что изучить", filter: 'all'},
    {todolistId: todolistId2, todolistTitle: "Что купить", filter: 'all'},
]

export const todolistsReducer = (state: TodolistType[] = initialTodolistsState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            return state.filter(todolist => todolist.todolistId !== action.payload.todolistId)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.todolistId === action.payload.todolistId ? {...todolist, filter: action.payload.filter} : todolist)
        case "ADD-TODOLIST":
            return [{todolistId: action.payload.todolistId, todolistTitle: action.payload.todolistTitle, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(todolist => todolist.todolistId === action.payload.todolistId ? {...todolist, todolistTitle: action.payload.newTitle} : todolist)
        default:
            return state
    }
}

export const deleteTodolistAC = (todolistId: string) => ({type: 'DELETE-TODOLIST', payload: {todolistId}} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => ({type: 'CHANGE-TODOLIST-FILTER', payload: {todolistId, filter}} as const)
export const addTodolistAC = (todolistTitle: string) => ({type: 'ADD-TODOLIST', payload: {todolistTitle, todolistId: v1()}} as const)
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => ({type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, newTitle}} as const)