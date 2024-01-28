import "app/App.css"
import { TodolistList } from "features/todolistList/ui/TodolistList/TodolistList"
import { ButtonAppBar } from "common/components/ButtonAppBar/ButtonAppBar"
import { Navigate, Route, Routes } from "react-router-dom"
import { selectAppStatus, selectIsInitialized } from "app/appSelectors"
import { useAppSelector } from "common/hooks/useAppSelector"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import Container from "@mui/material/Container"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { useEffect } from "react"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { authActions } from "features/auth/model/authSlice"
import { Login } from "features/auth/ui/Login/Login"

export const App = () => {
  const isInitialised = useAppSelector(selectIsInitialized)
  const appStatus = useAppSelector(selectAppStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authActions.me())
  }, [dispatch])

  if (!isInitialised) {
    return (
      <Box sx={{ display: "flex", height: "100vh", width: "100vw", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <div className="App">
      <ButtonAppBar />
      <ErrorSnackbar />
      {appStatus === "loading" && <LinearProgress color="secondary" />}
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistList />} />
          <Route path={"/login"} element={<Login />} />
          {/*<Route path={"/login"} element={<LoginWithReactHookForm />} />*/}
          <Route path={"/404"} element={<div>Error 404</div>} />
          <Route path={"*"} element={<Navigate to={"/404"} />} />
        </Routes>
      </Container>
    </div>
  )
}
