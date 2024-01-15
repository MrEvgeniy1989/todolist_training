import {RequestStatusType} from "../types";

type InitialStateType = typeof initialState
type setAppStatusACType = ReturnType<typeof setAppStatusAC>
type ActionType =
    | setAppStatusACType

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
        default: {
            return state
        }
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET-APP-STATUS', status} as const)