import {api, TaskPriorities, TaskStatuses, TaskType, UpdateTaskDomainModelType, UpdateTaskModelType} from "../api/api";
import {
    addTodolistACType,
    deleteTodolistACType,
    setTodolistACType,
    setTodolistsAC,
    updateTodolistTitleAC
} from "./todolistsReducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type ActionType =
    | setTodolistACType
    | addTodolistACType
    | deleteTodolistACType
    | setTasksACType
    | addTaskACType
    | deleteTaskACType
    | updateTaskACType

type setTasksACType = ReturnType<typeof setTasksAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type deleteTaskACType = ReturnType<typeof deleteTaskAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const tasksReducer = (state: TasksStateType = {}, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            let copyState = {...state}
            action.todolists.forEach(todolist => copyState[todolist.id] = [])
            return copyState
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case "DELETE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }
        case "ADD-TASK": {
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
        }
        case "DELETE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        }
        case "UPDATE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.task.id ? {...action.task} : task)}
        }
        default: {
            return state
        }
    }
}

// ActionsType
const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks} as const)
const addTaskAC = (todolistId: string, task: TaskType) => ({type: 'ADD-TASK', todolistId, task} as const)
const deleteTaskAC = (todolistId: string, taskId: string) => ({type: 'DELETE-TASK', todolistId, taskId} as const)
const updateTaskAC = (todolistId: string, task: TaskType) => ({type: 'UPDATE-TASK', todolistId, task} as const)

// Thunks
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    api.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    api.addTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(todolistId, res.data.data.item))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    api.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(deleteTaskAC(todolistId, taskId))
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskDomainModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(task => task.id === taskId)

    if (task) {
        const model: UpdateTaskModelType = {
            title: task?.title,
            description: task?.description,
            status: task?.status,
            priority: task?.priority,
            startDate: task?.startDate,
            deadline: task?.deadline,
            ...domainModel
        }

        api.updateTask(todolistId, taskId, model)
            .then(res => {
                dispatch(updateTaskAC(todolistId, res.data.data.item))
            })
    }
}