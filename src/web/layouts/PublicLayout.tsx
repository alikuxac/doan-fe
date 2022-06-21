import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";
import { selectAuth } from "../reducers/authSlice";

const PublicLayout: React.FC<any> = () => {
  const { isAuthenticated } = useAppSelector(selectAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return <Outlet />;
};

export default PublicLayout;
