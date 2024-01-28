import axios from "axios"
import { appActions } from "app/appSlice"
import { Dispatch } from "redux"

export const handleServerNetworkError = (dispatch: Dispatch, err: unknown) => {
  let errorMessage = "Some error occurred"
  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(appActions.setAppError({ error: errorMessage }))
  dispatch(appActions.setAppStatus({ appStatus: "failed" }))
}
