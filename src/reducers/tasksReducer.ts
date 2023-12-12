import {TasksType, TaskType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, deleteTodolistACType} from "./todolistsReducer";

type ActionType =
    | changeTaskTitleACType
    | changeTaskStatusACType
    | addTaskACType
    | deleteTaskACType
    | addTodolistACType
    | deleteTodolistACType

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type deleteTaskACType = ReturnType<typeof deleteTaskAC>

export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.taskId === action.payload.taskId ? {
                    ...task,
                    taskTitle: action.payload.newTaskTitle
                } : task)
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.taskId === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.newTaskStatus
                } : task)
            }
        case "ADD-TASK":
            const newTask: TaskType = {taskId: v1(), isDone: false, taskTitle: action.payload.newTaskTitle}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case "DELETE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.taskId !== action.payload.taskId)
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistId]: []}
        case "DELETE-TODOLIST":
            delete state[action.payload.todolistId]
            return {...state}
        default:
            return state
    }
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) => {
    return {type: "CHANGE-TASK-TITLE", payload: {todolistId, taskId, newTaskTitle}} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, newTaskStatus: boolean) => {
    return {type: "CHANGE-TASK-STATUS", payload: {todolistId, taskId, newTaskStatus}} as const
}
export const addTaskAC = (todolistId: string, newTaskTitle: string) => {
    return {type: "ADD-TASK", payload: {todolistId, newTaskTitle}} as const
}
export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {type: "DELETE-TASK", payload: {todolistId, taskId}} as const
}