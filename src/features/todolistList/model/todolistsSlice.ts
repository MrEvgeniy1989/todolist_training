import { createAppSlice } from "app/store"

const slice = createAppSlice({
  name: "todolists",
  initialState: [],
  reducers: {},
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
