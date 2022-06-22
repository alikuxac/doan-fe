import { Box } from "@mui/material";
import React from "react";
import MyMap from "../components/MyMap";
import SearchLayout from "../components/Search";
import FavoriteLayout from "../components/Favorite";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";

import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapIcon from "@mui/icons-material/Map";

const Default: React.FC<any> = () => {
  const [value, setValue] = React.useState("search");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <Box sx={{ flex: "0 1 75vw" }}>
        <MyMap />
      </Box>
      <Box sx={{ flex: "0 1 25vw" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="Search" value="search" icon={<SearchIcon />} />
              <Tab label="Favorite" value="favorite" icon={<FavoriteIcon />} />
              <Tab label="Directions" value="directions" icon={<MapIcon />} />
            </TabList>
          </Box>
          <TabPanel value="search">
            <SearchLayout />
          </TabPanel>
          <TabPanel value="favorite">
            <FavoriteLayout />
          </TabPanel>
          <TabPanel value="directions">Hello</TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Default;
