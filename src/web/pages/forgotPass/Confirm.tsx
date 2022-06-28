import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useJwtHook } from "../../hooks/useJwtHook";
import { selectEmail, resetEmail } from "../../reducers/emailSlice";
import { useAppSelector } from "../../hooks/reduxHook";
import { useAppDispatch } from "../../hooks/reduxHook";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Register = () => {
  const { handleSubmit, control } = useForm();
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);

  const dispatch = useAppDispatch();
  const email = useAppSelector(selectEmail);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (email === '') {
        navigate("/auth/login");
    }
  }, [email]);

  const handleConfirmResetPassword = async (data: any) => {
    const { password, passcode } = data;
    try {
        await useJwtHook.confirmResetPassword(passcode, password, email);
        setSuccessAlert(true);
        dispatch(resetEmail());
        navigate("/auth/login");
    } catch (err) {
        setErrorAlert(true);
    }

  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {successAlert && (
        <Alert
          severity="success"
          onClick={() => {
            setSuccessAlert(false);
          }}
        >
          <AlertTitle>Success</AlertTitle>
          We have sent you an email to reset your password.
        </Alert>
      )}
      {errorAlert && (
        <Alert
          severity="error"
          onClick={() => {
            setErrorAlert(false);
          }}
        >
          <AlertTitle>Error</AlertTitle>
          Error while sending email. Please try again.
        </Alert>
      )}
      <Card sx={{ padding: "0 120px" }}>
        <CardHeader title="Forget password" />
        <CardContent>
          <form
            onSubmit={handleSubmit(handleConfirmResetPassword)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field, fieldState, formState }) => (
                <TextField
                  value={email}
                  disabled
                  label="Email"
                  error={fieldState.error ? true : false}
                  helperText={fieldState.error && fieldState.error.message}
                />
              )}
            />
            <Controller
              name="passcode"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
              }}
              render={({ field, fieldState, formState }) => (
                <TextField
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Passcode"
                  type="text"
                  error={fieldState.error ? true : false}
                  helperText={fieldState.error && fieldState.error.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field, fieldState, formState }) => (
                <TextField
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Password"
                  type="password"
                  error={fieldState.error ? true : false}
                  helperText={fieldState.error && fieldState.error.message}
                />
              )}
            />
            <Button type="submit" variant="contained">
              Reset password
            </Button>
          </form>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            Have a account?{" "}
            <Link to={"/auth/login"} style={{ textDecoration: "none" }}>
              Login
            </Link>
          </div>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Register;
