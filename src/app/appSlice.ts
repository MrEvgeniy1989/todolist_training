import { createAppSlice } from "app/store"

const slice = createAppSlice({
  name: "app",
  initialState: [],
  reducers: {},
})

export const appReducer = slice.reducer
export const appActions = slice.actions
