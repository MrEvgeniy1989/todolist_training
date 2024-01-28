import { Dispatch } from "redux"
import { AppResponseType } from "common/types/types"
import { appActions } from "app/appSlice"

export const handleServerAppError = <T>(dispatch: Dispatch, data: AppResponseType<T>) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }))
  } else {
    dispatch(dispatch(appActions.setAppError({ error: `Обратитесь в службу поддержки.` })))
  }
  dispatch(appActions.setAppStatus({ appStatus: "failed" }))
}
