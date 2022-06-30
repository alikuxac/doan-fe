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
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHook";
import { useJwtHook } from "../hooks/useJwtHook";
import { login } from "../reducers/globalSlice";

const Register = () => {
  const { handleSubmit, control } = useForm();

  const dispatch = useAppDispatch();

  const handleRegister = async (data: any) => {
    const { email, password, fullname } = data;
    console.log(data);
    try {
      const response = await useJwtHook.register(email, password, fullname);

      const { accessToken, user } = response.data;
      useJwtHook.setToken(accessToken);
      useJwtHook.setUserStorage(user);

      dispatch(login({ user, token: accessToken, isAuthenticated: true }));
    } catch (err: any) {}
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
      <Card sx={{ padding: "0 120px" }}>
        <CardHeader title="Register" />
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
            <Controller
              name="fullname"
              control={control}
              defaultValue=""
              rules={{
                required: "Fullname is required",
              }}
              render={({ field, fieldState, formState }) => (
                <TextField
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Full Name"
                  error={fieldState.error ? true : false}
                  helperText={fieldState.error && fieldState.error.message}
                />
              )}
            />
            <Button type="submit" variant="contained">
              Register
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
