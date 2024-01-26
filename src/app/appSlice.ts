import { asyncThunkCreator, buildCreateSlice, PayloadAction } from "@reduxjs/toolkit"
import { RequestStatus } from "common/types/types"

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const slice = createAppSlice({
  name: "app",
  initialState: {
    isInitialised: true,
    appStatus: "idle" as RequestStatus,
    error: null as string | null,
  },
  reducers: (creators) => {
    return {
      setisInitialised: (state, action: PayloadAction<{ isInitialised: boolean }>) => {
        state.isInitialised = action.payload.isInitialised
      },
      setAppStatus: (state, action: PayloadAction<{ appStatus: RequestStatus }>) => {
        state.appStatus = action.payload.appStatus
      },
      setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
        state.error = action.payload.error
      },
    }
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
