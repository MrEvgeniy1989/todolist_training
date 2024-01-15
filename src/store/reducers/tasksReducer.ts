import {TasksStateType, TaskType} from "../types";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./appReducer";
import {SetTodolistsACType} from "./todolistsReducer";
import {tasksApi} from "../../api/tasksApi";

export type setTasksACType = ReturnType<typeof setTasksAC>
type ActionType =
    | SetTodolistsACType
    | setTasksACType

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
        default: {
            return state
        }
    }
}

// ActionTypes
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks} as const)

// Thunks
export const getTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await tasksApi.getTasks(todolistId)
        dispatch(setTasksAC(todolistId, response.data.items))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        dispatch(setAppStatusAC('failed'))
    }
}