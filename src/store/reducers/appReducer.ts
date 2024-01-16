import {RequestStatusType} from "../types";

type InitialStateType = typeof initialState
type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
type SetErrorACType = ReturnType<typeof setErrorAC>
type ActionType =
    | SetAppStatusACType
    | SetErrorACType

const initialState = {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null as string | null
}
export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-APP-STATUS': {
            return {...state, status: action.status}
        }
        case "SET-ERROR": {
            return {...state, error: action.error}
        }
        default: {
            return state
        }
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET-APP-STATUS', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)