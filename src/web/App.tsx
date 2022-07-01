import { CssBaseline, StyledEngineProvider } from "@mui/material";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loadable from "./components/Loadable";
import DefaultLayout from "./layouts/DefaultLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";

const Login = Loadable(lazy(() => import("./pages/Login")));
const Register = Loadable(lazy(() => import("./pages/Register")));
const ForgotPassword = Loadable(lazy(() => import("./pages/forgotPass/ForgotPassword")));
const ForgotPasswordConfirm = Loadable(lazy(() => import("./pages/forgotPass/Confirm")))
const Default = Loadable(lazy(() => import("./pages/Default")));
const UserSettings = Loadable(lazy(() => import("./pages/UserSettings")));

export const App = () => {
  return (
    <StyledEngineProvider>
      <CssBaseline />

      <DefaultLayout>
        <Routes>
          <Route
            path="/auth"
            element={<PublicLayout />}
            children={[
              <Route path="/auth/login" element={<Login />} />,
              <Route path="/auth/register" element={<Register />} />,
              <Route path="/auth/forgot" element={<ForgotPassword />} />,
              <Route
                path="/auth/passconfirm"
                element={<ForgotPasswordConfirm />}
              />,
            ]}
          />
          <Route
            path="/"
            element={<PrivateLayout />}
            children={[
              <Route path="/dashboard" element={<Default />} />,
              <Route path="/user-settings" element={<UserSettings />} />,
            ]}
          />
        </Routes>
      </DefaultLayout>
    </StyledEngineProvider>
  );
};
