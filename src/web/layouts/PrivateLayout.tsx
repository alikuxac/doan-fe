import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "../components/MainLayout/PrimarySearchAppBar";
import { useAppSelector } from "../hooks/reduxHook";
import { selectAuth } from "../reducers/authSlice";

const PrivateLayout: React.FC<any> = () => {
  const { isAuthenticated } = useAppSelector(selectAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated]);

  return (
    <Box>
      <PrimarySearchAppBar />
      <Outlet />
    </Box>
  );
};

export default PrivateLayout;
