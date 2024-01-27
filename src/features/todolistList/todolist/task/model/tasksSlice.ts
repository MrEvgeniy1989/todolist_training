import { appActions, createAppSlice } from "app/appSlice"
import { taskApi } from "features/todolistList/todolist/task/api/taskApi"
import {
  TaskDomainModelForUpdate,
  TaskModelForUpdate,
  TaskType,
} from "features/todolistList/todolist/task/api/taskApi.types"
import { TasksState } from "features/todolistList/todolist/task/types"
import { ResultCode } from "common/enums/enums"
import { AppRootStateType } from "app/store"

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
      addTask: createAThunk<{ todolistId: string; title: string }, { todolistId: string; task: TaskType }>(
        async ({ todolistId, title }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ appStatus: "loading" }))
            const res = await taskApi.createTask(todolistId, title)
            if (res.data.resultCode === ResultCode.Success) {
              const task = res.data.data.item
              dispatch(appActions.setAppStatus({ appStatus: "succeeded" }))
              return { todolistId, task }
            } else {
              dispatch(appActions.setAppStatus({ appStatus: "failed" }))
              return rejectWithValue(null)
            }
          } catch (e) {
            dispatch(appActions.setAppStatus({ appStatus: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = [action.payload.task, ...state[action.payload.todolistId]]
          },
        },
      ),
      deleteTask: createAThunk<{ todolistId: string; taskId: string }, { todolistId: string; taskId: string }>(
        async ({ todolistId, taskId }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ appStatus: "loading" }))
            const res = await taskApi.deleteTask(todolistId, taskId)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(appActions.setAppStatus({ appStatus: "succeeded" }))
              return { todolistId, taskId }
            } else {
              dispatch(appActions.setAppStatus({ appStatus: "failed" }))
              return rejectWithValue(null)
            }
          } catch (e) {
            dispatch(appActions.setAppStatus({ appStatus: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
              state[action.payload.todolistId].splice(index, 1)
            }
          },
        },
      ),
      updateTask: createAThunk<
        { todolistId: string; taskId: string; updateModel: TaskDomainModelForUpdate },
        { task: TaskType }
      >(
        async ({ todolistId, taskId, updateModel }, { dispatch, rejectWithValue, getState }) => {
          try {
            const task = (getState() as AppRootStateType).tasks[todolistId].find((task) => task.id === taskId)

            if (!task) {
              return rejectWithValue(null)
            }

            const model: TaskModelForUpdate = {
              title: task.title,
              description: task.description,
              status: task.status,
              priority: task.priority,
              startDate: task.startDate,
              deadline: task.deadline,
              ...updateModel,
            }

            dispatch(appActions.setAppStatus({ appStatus: "loading" }))
            const res = await taskApi.updateTask(todolistId, taskId, model)
            if (res.data.resultCode === ResultCode.Success) {
              const task = res.data.data.item
              dispatch(appActions.setAppStatus({ appStatus: "succeeded" }))
              return { task }
            } else {
              dispatch(appActions.setAppStatus({ appStatus: "failed" }))
              return rejectWithValue(null)
            }
          } catch (e) {
            dispatch(appActions.setAppStatus({ appStatus: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state[action.payload.task.todoListId].findIndex((task) => task.id === action.payload.task.id)
            if (index !== -1) {
              state[action.payload.task.todoListId][index] = action.payload.task
            }
          },
        },
      ),
    }
  },
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
