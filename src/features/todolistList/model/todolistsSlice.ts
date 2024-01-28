import { appActions, createAppSlice } from "app/appSlice"
import { Filter, Todolist, TodolistDomain } from "features/todolistList/api/todolistApi.types"
import { todolistApi } from "features/todolistList/api/todolistApi"
import { tasksActions } from "features/todolistList/todolist/task/model/tasksSlice"
import { PayloadAction } from "@reduxjs/toolkit"
import { ResultCode } from "common/enums/enums"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { clearData } from "common/actions/commonActions"

const slice = createAppSlice({
  name: "todolists",
  initialState: [] as TodolistDomain[],
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{ rejectValue: null }>()
    return {
      getTodolists: createAThunk<undefined, { todolists: Todolist[] }>(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ appStatus: "loading" }))
            const res = await todolistApi.getTodolists()
            dispatch(appActions.setAppStatus({ appStatus: "succeeded" }))
            const todolists = res.data
            todolists.forEach((todolist) => {
              dispatch(tasksActions.getTasks(todolist.id))
            })
            return { todolists }
          } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (_, action) => {
            return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "all", entityStatus: "idle" }))
          },
        },
      ),
      createTodolist: createAThunk<{ title: string }, { todolist: Todolist }>(
        async ({ title }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ appStatus: "loading" }))
            const res = await todolistApi.createTodolist(title)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(appActions.setAppStatus({ appStatus: "succeeded" }))
              const todolist = res.data.data.item
              return { todolist }
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
          fulfilled: (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
          },
        },
      ),
      deleteTodolist: createAThunk<{ todolistId: string }, { todolistId: string }>(
        async ({ todolistId }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ appStatus: "loading" }))
            const res = await todolistApi.deleteTodolist(todolistId)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(appActions.setAppStatus({ appStatus: "succeeded" }))
              return { todolistId }
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
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
            if (index !== -1) {
              state.splice(index, 1)
            }
          },
        },
      ),
      changeTodolistTitle: createAThunk<{ todolistId: string; title: string }, { todolistId: string; title: string }>(
        async ({ todolistId, title }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ appStatus: "loading" }))
            const res = await todolistApi.changeTodolistTitle(todolistId, title)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(appActions.setAppStatus({ appStatus: "succeeded" }))
              return { todolistId, title }
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
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
            if (index !== -1) {
              state[index].title = action.payload.title
            }
          },
        },
      ),
      changeTodolistFilter: creators.reducer((state, action: PayloadAction<{ todolistId: string; filter: Filter }>) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
        if (index !== -1) {
          state[index].filter = action.payload.filter
        }
      }),
    }
  },
  extraReducers: (builder) => {
    builder.addCase(clearData, () => {
      return []
    })
  },
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
