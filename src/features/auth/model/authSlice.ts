import { createAppSlice } from "app/store"

const slice = createAppSlice({
  name: "auth",
  initialState: [],
  reducers: {},
})

export const authReducer = slice.reducer
export const authActions = slice.actions
