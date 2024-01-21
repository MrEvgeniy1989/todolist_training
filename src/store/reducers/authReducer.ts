import {Dispatch} from "redux";
import {setAppStatusAC, setIsInitializedAC} from "./appReducer";
import {authApi, LoginType} from "../../api/authApi";
import {ResultCode} from "../enums";

type InitialStateType = typeof initialState
type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
type ActionType =
    | SetIsLoggedInType

const initialState = {
    isLoggedIn: false
}
export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value}
        }
        default: {
            return state
        }
    }
}

// ActionCreators
export const setIsLoggedInAC = (value: boolean) => ({type: 'SET-IS-LOGGED-IN', value} as const)

// Thunks
export const loginTC = (values: LoginType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await authApi.login(values)

        if (response.data.resultCode === ResultCode.Succeeded) {
            dispatch(setIsLoggedInAC(true))

            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppStatusAC('failed'))
        }
    } catch {
        dispatch(setAppStatusAC('failed'))
    }
}
export const logOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await authApi.logOut()

        if (response.data.resultCode === ResultCode.Succeeded) {
            dispatch(setIsLoggedInAC(false))

            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppStatusAC('failed'))
        }
    } catch {
        dispatch(setAppStatusAC('failed'))
    }
}
export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const response = await authApi.me()

        if (response.data.resultCode === ResultCode.Succeeded) {
            dispatch(setIsLoggedInAC(true))

            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppStatusAC('failed'))
        }
    } catch {
        dispatch(setAppStatusAC('failed'))
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}