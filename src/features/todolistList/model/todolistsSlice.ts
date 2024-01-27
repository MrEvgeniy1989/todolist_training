import { appActions, createAppSlice } from "app/appSlice"
import { Filter, Todolist, TodolistDomain } from "features/todolistList/api/todolistApi.types"
import { todolistApi } from "features/todolistList/api/todolistApi"
import { tasksActions } from "features/todolistList/todolist/task/model/tasksSlice"
import { PayloadAction } from "@reduxjs/toolkit"

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
            dispatch(appActions.setAppStatus({ appStatus: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (_, action) => {
            return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "all", entityStatus: "idle" }))
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
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
