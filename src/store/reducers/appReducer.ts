import {RequestStatusType} from "../types";

type InitialStateType = typeof initialState
type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
type SetErrorACType = ReturnType<typeof setErrorAC>
type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>
type ActionType =
    | SetAppStatusACType
    | SetErrorACType
    | SetIsInitializedACType

const initialState = {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null as string | null
}
export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-APP-STATUS': {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        case "APP/SET-IS-INITIALIZED": {
            return {...state, isInitialized: action.isInitialized}
        }
        default: {
            return state
        }
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-APP-STATUS', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)