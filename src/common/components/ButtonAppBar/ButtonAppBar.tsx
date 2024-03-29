import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectorIsLoggedIn } from "features/auth/model/authSelectors"
import { authThunks } from "features/auth/model/authSlice"

export default function ButtonAppBar() {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectorIsLoggedIn)

  const onClickHandler = () => {
    dispatch(authThunks.logout())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={onClickHandler}>
              logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
