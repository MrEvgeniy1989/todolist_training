import { appActions } from "app/appSlice"
import axios from "axios"
import { Dispatch } from "redux"

export const handleServerNetworkError = (dispatch: Dispatch, err: unknown): void => {
  let errorMessage = "Some error occurred"

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(appActions.setAppError({ error: errorMessage }))
}
