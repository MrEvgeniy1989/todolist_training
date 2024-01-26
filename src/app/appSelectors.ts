import { AppRootStateType } from "app/store"
import { RequestStatus } from "common/types/types"

export const selectIsInitialised = (state: AppRootStateType): boolean => state.app.isInitialised
export const selectAppStatus = (state: AppRootStateType): RequestStatus => state.app.appStatus
export const selectError = (state: AppRootStateType): null | string => state.app.error
