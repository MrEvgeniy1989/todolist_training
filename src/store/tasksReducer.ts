import {addTodolistACType, deleteTodolistACType, todolistId1, todolistId2} from "./todolistsReducer";
import {v1} from "uuid";

export type TaskType = {
    taskId: string
    taskTitle: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

type deleteTaskACType = ReturnType<typeof deleteTasksAC>
type addTasksACType = ReturnType<typeof addTasksAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type ActionType =
    | deleteTaskACType
    | addTasksACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodolistACType
    | deleteTodolistACType

const initialTasksState: TasksStateType = {
    [todolistId1]: [
        {taskId: v1(), taskTitle: "HTML", isDone: true},
        {taskId: v1(), taskTitle: "CSS", isDone: true},
        {taskId: v1(), taskTitle: "JS", isDone: true},
        {taskId: v1(), taskTitle: "React", isDone: false},
        {taskId: v1(), taskTitle: "Redux", isDone: false}
    ],
    [todolistId2]: [
        {taskId: v1(), taskTitle: "Milk", isDone: true},
        {taskId: v1(), taskTitle: "Chocolate", isDone: false},
        {taskId: v1(), taskTitle: "Bread", isDone: true},
        {taskId: v1(), taskTitle: "Butter", isDone: true},
        {taskId: v1(), taskTitle: "Banana", isDone: false}
    ]
}

export const tasksReducer = (state: TasksStateType = initialTasksState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'DELETE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.taskId !== action.payload.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.payload.todolistId]: [{
                    taskId: v1(),
                    taskTitle: action.payload.taskTitle,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.taskId === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.newTaskStatus
                } : task)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.taskId === action.payload.taskId ? {
                    ...task,
                    taskTitle: action.payload.newTaskTitle
                } : task)
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistId]: []}
        case "DELETE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        default:
            return state
    }
}

export const deleteTasksAC = (todolistId: string, taskId: string) => ({
    type: 'DELETE-TASK',
    payload: {todolistId, taskId}
} as const)
export const addTasksAC = (todolistId: string, taskTitle: string) => ({
    type: 'ADD-TASK',
    payload: {todolistId, taskTitle}
} as const)
export const changeTaskStatusAC = (todolistId: string, taskId: string, newTaskStatus: boolean) => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {todolistId, taskId, newTaskStatus}
} as const)
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {todolistId, taskId, newTaskTitle}
} as const)