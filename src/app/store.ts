import { asyncThunkCreator, buildCreateSlice, configureStore } from "@reduxjs/toolkit"
import { todolistsReducer } from "features/todolistList/model/todolistsSlice"
import { tasksReducer } from "features/todolistList/todolist/task/model/tasksSlice"
import { authReducer } from "features/auth/model/authSlice"
import { appReducer } from "app/appSlice"

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
  },
})

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})
