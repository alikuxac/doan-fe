import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHook";
import { useJwtHook } from "../hooks/useJwtHook";
import { login } from "../reducers/globalSlice";

const Login: React.FC<any> = () => {
  const { handleSubmit, control } = useForm();

  const dispatch = useAppDispatch();

  const handleLogin = async (data: any) => {
    const { email, password } = data;

    try {
      const response = await useJwtHook.login(email, password);

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
        <CardHeader title="Login" />
        <CardContent>
          <form
            onSubmit={handleSubmit(handleLogin)}
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
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Email"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field, fieldState, formState }) => (
                <TextField
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Password"
                  type="password"
                />
              )}
            />
            <Button type="submit" variant="contained">
              Login
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
            <Link to={"/auth/forgot"} style={{ textDecoration: "none" }}>
              Forgot password
            </Link>
          </div>
          <span></span>
          <div>
            Don't have an account?{" "}
            <Link to={"/auth/register"} style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </div>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Login;
