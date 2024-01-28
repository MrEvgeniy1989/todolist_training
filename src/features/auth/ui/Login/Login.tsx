import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useFormik } from "formik"
import { LoginData } from "features/auth/api/authApi.types"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectIsLoggedIn } from "features/auth/model/authSelectors"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { authActions } from "features/auth/model/authSlice"
import { Navigate } from "react-router-dom"

type FormikErrorType = Partial<LoginData>

export const Login = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    } as LoginData,
    validate: (values) => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = "Email required!"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }

      if (!values.password) {
        errors.password = "Password required!"
      }

      return errors
    },
    onSubmit: (values) => dispatch(authActions.login({ loginData: values })),
  })

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
              <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel={"noreferrer noreferrer"}>
                {" "}
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")} />}
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
