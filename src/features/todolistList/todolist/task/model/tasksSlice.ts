import { appActions, createAppSlice } from "app/appSlice"
import { taskApi } from "features/todolistList/todolist/task/api/taskApi"
import { TaskType } from "features/todolistList/todolist/task/api/taskApi.types"
import { TasksState } from "features/todolistList/todolist/task/types"

const slice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{ rejectValue: null }>()
    return {
      getTasks: createAThunk<string, { todolistId: string; tasks: TaskType[] }>(
        async (todolistId, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ appStatus: "loading" }))
            const res = await taskApi.getTasks(todolistId)
            const tasks = res.data.items
            dispatch(appActions.setAppStatus({ appStatus: "succeeded" }))
            return { todolistId, tasks }
          } catch (e) {
            dispatch(appActions.setAppStatus({ appStatus: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          },
        },
      ),
    }
  },
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
