import { Box } from "@mui/material";
import React from "react";
import axios from "axios";
import DefaultConfig from "../api/jwtDefaultConfig";
import { useJwtHook } from "../hooks/useJwtHook";
import MyMap from "../components/MyMap";
import SearchLayout from "../components/Search";
import FavoriteLayout from "../components/Favorite";
import DirectionLayout from "../components/Directions";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";

import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapIcon from "@mui/icons-material/Map";
import AddIcon from "@mui/icons-material/Add";

const Default: React.FC<any> = () => {
  const [value, setValue] = React.useState("search");
  const [open, setOpen] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);

  const [favoriteName, setFavoriteName] = React.useState("");
  const [favoriteAddress, setFavoriteAddress] = React.useState("");
  const [favoriteLat, setFavoriteLat] = React.useState("");
  const [favoriteLng, setFavoriteLng] = React.useState("");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    localStorage.setItem("tab", newValue);
  };

  const getValue = () => {
    var tabValue = localStorage.getItem("tab");
    if (tabValue === "add") {
      setValue("search");
      setOpen(false);
    } else {
      setValue(value);
      setOpen(false);
    }
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFavoriteName(event.target.value);
  };

  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFavoriteAddress(event.target.value);
  };

  const handleChangeLat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFavoriteLat(event.target.value);
  };

  const handleChangeLng = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFavoriteLng(event.target.value);
  };

  const handleCloseAddDialog = () => {
    setOpen(false);
    setFavoriteName("");
    setFavoriteAddress("");
    setFavoriteLat("");
    setFavoriteLng("");
    setValue('search');
  };

  React.useEffect(() => {
    getValue();
  }, [setValue]);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <Box sx={{ flex: "0 1 75vw", display: "inline" }}>
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
              <Tab
                label="Add"
                value="add"
                icon={<AddIcon />}
                onClick={() => {
                  setOpen(true);
                }}
              />
              <Tab label="Search" value="search" icon={<SearchIcon />} />
              <Tab label="Favorite" value="favorite" icon={<FavoriteIcon />} />
              <Tab label="Directions" value="directions" icon={<MapIcon />} />
            </TabList>
          </Box>
          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
              setValue("search");
            }}
            aria-labelledby="form-dialog-title"
            aria-describedby="form-dialog-description"
          >
            <DialogTitle id="form-dialog-title">Add a new place</DialogTitle>
            <DialogContent>
              {/* Success */}
              {successAlert ? (
                <Alert
                  severity="error"
                  onClick={() => {
                    setSuccessAlert(false);
                  }}
                >
                  Success
                </Alert>
              ) : (
                <></>
              )}
              {/* Alert */}
              {errorAlert ? (
                <Alert
                  severity="error"
                  onClick={() => {
                    setErrorAlert(false);
                  }}
                >
                  <AlertTitle>Error</AlertTitle>
                  Error while delete favorite infomation. Please try again.
                </Alert>
              ) : (
                <></>
              )}
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                onChange={handleChangeName}
              />
              <TextField
                margin="dense"
                id="address"
                label="Address"
                type="text"
                fullWidth
                onChange={handleChangeAddress}
              />
              <TextField
                margin="dense"
                id="lat"
                label="Latitude"
                type="text"
                fullWidth
                onChange={handleChangeLat}
              />
              <TextField
                margin="dense"
                id="lng"
                label="Longtitude"
                type="text"
                fullWidth
                onChange={handleChangeLng}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleCloseAddDialog();
                }}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={() => {}} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
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
