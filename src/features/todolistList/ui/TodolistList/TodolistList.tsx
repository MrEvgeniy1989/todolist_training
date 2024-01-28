import React, { useEffect } from "react"
import { Todolist } from "features/todolistList/todolist/ui/Todolist/Todolist"
import { Grid, Paper } from "@mui/material"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectTodolists } from "features/todolistList/model/todolistsSelector"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { todolistsActions } from "features/todolistList/model/todolistsSlice"
import { selectIsLoggedIn } from "features/auth/model/authSelectors"
import { Navigate } from "react-router-dom"

export const TodolistList = () => {
  const todolists = useAppSelector(selectTodolists)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(todolistsActions.getTodolists())
  }, [dispatch, isLoggedIn])

  const onClickAddTodolistHandler = (title: string) => dispatch(todolistsActions.createTodolist({ title }))

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <div>
      <Grid container style={{ margin: "20px" }}>
        <AddItemForm callback={onClickAddTodolistHandler} />
      </Grid>
      <Grid container>
        {todolists.map((todolist) => {
          return (
            <Grid item style={{ margin: "20px" }} key={todolist.id}>
              <Paper elevation={24} style={{ padding: "20px" }}>
                <Todolist todolist={todolist} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
