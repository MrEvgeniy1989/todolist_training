import {setAppStatusAC, setErrorAC} from "../store/reducers/appReducer";
import {Dispatch} from "redux";

export const handleServerAppError = (dispatch: Dispatch, messages: string[]) => {
    if (messages.length) {
        dispatch(setErrorAC(messages[0]))
    } else {
        dispatch(setErrorAC('Обратитесь в службу поддержки!'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch, errorMessage: string) => {
    dispatch(setErrorAC(errorMessage))
    dispatch(setAppStatusAC('failed'))
}