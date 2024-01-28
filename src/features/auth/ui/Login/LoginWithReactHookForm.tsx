import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginData } from "features/auth/api/authApi.types"
import { authActions } from "features/auth/model/authSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectIsLoggedIn } from "features/auth/model/authSelectors"

export const LoginWithReactHookForm = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  })
  const onSubmit: SubmitHandler<LoginData> = (data) => dispatch(authActions.login({ loginData: data }))

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To log in get registered
              <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noopener noreferrer">
                {" "}
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...register("email", {
                  required: "Email required!",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address" },
                })}
              />
              {errors.email && <div style={{ color: "red" }}>{errors.email.message}</div>}

              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...register("password", { required: "Password required!" })}
              />
              {errors.password && <div style={{ color: "red" }}>{errors.password.message}</div>}

              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox defaultChecked {...register("rememberMe")} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
