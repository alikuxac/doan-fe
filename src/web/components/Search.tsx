import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles, createStyles } from '@mui/styles'

import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      height: 45,
    },
  })
);

export default function Search() {

  const classes = useStyles();

  const [searchValue, setSearchValue] = React.useState("");
  const [currentValue, setCurrentValue] = React.useState(true);

  const handleChaneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleResetValue = () => {
    setSearchValue("");
  };

  const handleChangeCurrentValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentValue(event.target.checked);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <div style={{ height: "50%" }}>
        <Container maxWidth="sm" >
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={6}>
              <TextField
                label="Search"
                id="outlined-search"
                variant="outlined"
                type="search"
                value={searchValue}
                onChange={handleChaneInput}
                InputProps={{
                  className: classes.input,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                startIcon={<SearchIcon />}
                type="submit"
                variant="outlined"
                className={classes.input}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Checkbox
              defaultChecked
              onChange={handleChangeCurrentValue}
              value={currentValue}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Sử dụng vị trí hiện tại?</Typography>
          </Grid>
        </Container>
      </div>
      <div style={{ height: "50%" }}>
        <Container style={{ height: "50%" }}>
          <h1>hi</h1>
        </Container>
      </div>
    </Box>
  );
}
