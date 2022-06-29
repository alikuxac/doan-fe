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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHook";
import { useJwtHook } from "../../hooks/useJwtHook";
import { setEmail, resetEmail } from "../../reducers/emailSlice";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Register = () => {
  const { handleSubmit, control } = useForm();
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (data: any) => {
    const { email } = data;

    try {
      const response = await useJwtHook.resetPassword(email);
      console.log(response);
      if (response.status === 201) {
        setSuccessAlert(true);
        dispatch(setEmail(email));
        setTimeout(() => {
          navigate("/auth/passconfirm");
        }, 5000);
      } else {
        setErrorAlert(true);
      }
    } catch (err: any) {
      setErrorAlert(true);
    }
  };

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
            onSubmit={handleSubmit(handleRegister)}
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
              rules={{
                required: "Email is required",
                validate: (value) => {
                  return (
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
                    "Email is invalid"
                  );
                },
              }}
              render={({ field, fieldState, formState }) => (
                <TextField
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Email"
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
            <Link
              onClick={() => {
                dispatch(resetEmail());
              }}
              to={"/auth/login"}
              style={{ textDecoration: "none" }}
            >
              Login
            </Link>
          </div>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Register;
