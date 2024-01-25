import { createAppSlice } from "app/store"

const slice = createAppSlice({
  name: "tasks",
  initialState: [],
  reducers: {},
})

export const tasksReducer = slice.reducer
export const taskstsActions = slice.actions
