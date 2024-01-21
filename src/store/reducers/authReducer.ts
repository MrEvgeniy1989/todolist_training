import {Dispatch} from "redux";
import {setAppStatusAC, setIsInitializedAC} from "./appReducer";
import {authApi, LoginType} from "../../api/authApi";
import {ResultCode} from "../enums";
import axios from "axios";
import {ErrorType} from "../types";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";

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
            handleServerAppError(dispatch, response.data.messages)
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response?.data ? e.response?.data.messages[0] : e.message
            handleServerNetworkError(dispatch, error)
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
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
            handleServerAppError(dispatch, response.data.messages)
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response?.data ? e.response?.data.messages[0] : e.message
            handleServerNetworkError(dispatch, error)
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
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
            handleServerAppError(dispatch, response.data.messages)
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response?.data ? e.response?.data.messages[0] : e.message
            handleServerNetworkError(dispatch, error)
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}