import { Box } from "@mui/material";
import React from "react";
import MyMap from "../components/MyMap";

const Default: React.FC<any> = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <Box sx={{ flex: "0 1 70vw" }}>
        <MyMap />
      </Box>
      <Box sx={{ flex: "0 1 30vw" }}>
        <></>
      </Box>
    </Box>
  );
};

export default Default;
