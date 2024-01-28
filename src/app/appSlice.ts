import { asyncThunkCreator, buildCreateSlice, PayloadAction } from "@reduxjs/toolkit"
import { RequestStatus } from "common/types/types"

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const slice = createAppSlice({
  name: "app",
  initialState: {
    isInitialized: true,
    appStatus: "idle" as RequestStatus,
    error: null as string | null,
  },
  reducers: (creators) => {
    return {
      setIsInitialized: creators.reducer((state, action: PayloadAction<{ isInitialized: boolean }>) => {
        state.isInitialized = action.payload.isInitialized
      }),
      setAppStatus: creators.reducer((state, action: PayloadAction<{ appStatus: RequestStatus }>) => {
        state.appStatus = action.payload.appStatus
      }),
      setAppError: creators.reducer((state, action: PayloadAction<{ error: string | null }>) => {
        state.error = action.payload.error
      }),
    }
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
