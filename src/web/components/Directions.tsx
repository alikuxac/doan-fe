import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { useAppDispatch } from "../hooks/reduxHook";
import { setDirections } from "../reducers/globalSlice";

import { Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import SwapVertSharpIcon from "@mui/icons-material/SwapVertSharp";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const initValue = {
  lat: 10.8458083,
  lng: 106.7945438,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      height: 45,
    },
  })
);

const Directions: React.FC<any> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // Redux current position value
  const [currentPosition, setCurrentPosition] = React.useState(initValue);

  // Origin and destination inputs
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  // Set Mode
  const [mode, setMode] = React.useState("DRIVING");

  // Get current location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        navigator.clipboard.writeText(
          `${position.coords.latitude},${position.coords.longitude}`
        );
      });
    }
  };

  // Get current location on click
  const handleCopyOrigin = () => {
    navigator.clipboard.writeText(origin);
  };

  const handleCopyDestination = () => {
    navigator.clipboard.writeText(origin);
  };

  // Get Mode of Travel
  const handleMode = (event: SelectChangeEvent<string>) => {
    setMode(event.target.value);
  };

  // Swap origin and destination
  const handleSwap = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // Reset inputs
  const handleReset = () => {
    setOrigin("");
    setDestination("");
    setCurrentPosition(initValue);
    setMode("DRIVING");
    dispatch(
      setDirections({
        enabled: false,
        origin: "",
        destination: "",
        mode: "DRIVING",
      })
    );
  };

  const handleSubmit = () => {
    dispatch(
      setDirections({
        enabled: true,
        origin: {
          value: origin,
        },
        destination: { value: destination },
        mode,
      })
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              label="Origin"
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
            />
            <IconButton onClick={handleCopyOrigin}>
              <ContentCopyIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <IconButton onClick={handleSwap}>
              <SwapVertSharpIcon />
            </IconButton>
            <IconButton onClick={handleCurrentLocation}>
              <MyLocationIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              label="Destination"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
            <IconButton onClick={handleCopyDestination}>
              <ContentCopyIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Mode of Travel</Typography>
          </Grid>
          <Grid item xs={12}>
            <Select
              value={mode}
              onChange={handleMode}
              inputProps={{
                name: "mode",
                id: "mode",
              }}
            >
              <MenuItem value="DRIVING">Driving</MenuItem>
              <MenuItem value="WALKING">Walking</MenuItem>
              <MenuItem value="BICYCLING">Bicycling</MenuItem>
              <MenuItem value="TRANSIT">Transit</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleReset}>Reset</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Directions;
