import { configureStore } from "@reduxjs/toolkit"
import { todolistsReducer } from "features/todolistList/model/todolistsSlice"
import { tasksReducer } from "features/todolistList/todolist/task/model/tasksSlice"
import { authReducer } from "features/auth/model/authSlice"
import { appReducer } from "app/appSlice"

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
  },
})
