import { appActions, createAppSlice } from "app/appSlice"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { authApi } from "features/auth/api/authApi"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { LoginData } from "features/auth/api/authApi.types"
import { clearData } from "common/actions/commonActions"

const slice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{ rejectValue: null }>()
    return {
      me: createAThunk<undefined, boolean>(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ appStatus: "loading" }))
            const res = await authApi.me()
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(appActions.setAppStatus({ appStatus: "succeeded" }))
              return true
            } else {
              dispatch(appActions.setAppStatus({ appStatus: "failed" }))
              return rejectWithValue(null)
            }
          } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
          } finally {
            dispatch(appActions.setIsInitialized({ isInitialized: true }))
          }
        },
        {
          fulfilled: (state) => {
            state.isLoggedIn = true
          },
        },
      ),
      login: createAThunk<{ loginData: LoginData }, boolean>(
        async ({ loginData }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ appStatus: "loading" }))
            const res = await authApi.login(loginData)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(appActions.setAppStatus({ appStatus: "succeeded" }))
              return true
            } else {
              handleServerAppError(dispatch, res.data)
              return rejectWithValue(null)
            }
          } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state) => {
            state.isLoggedIn = true
          },
        },
      ),
      logout: createAThunk<undefined, boolean>(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ appStatus: "loading" }))
            const res = await authApi.logout()
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(clearData())
              dispatch(appActions.setAppStatus({ appStatus: "succeeded" }))
              return false
            } else {
              handleServerAppError(dispatch, res.data)
              return rejectWithValue(null)
            }
          } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state) => {
            state.isLoggedIn = false
          },
        },
      ),
    }
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
