import React from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { makeStyles, createStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import RoomIcon from "@mui/icons-material/Room";
import AddLocationSharpIcon from "@mui/icons-material/AddLocationSharp";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Theme, useTheme } from "@mui/material/styles";

import defaultConfig from "../api/jwtDefaultConfig";
import { resetSearch, setSearch, setUser } from "../reducers/globalSlice";
import { useAppDispatch } from "../hooks/reduxHook";
import { useJwtHook } from "../hooks/useJwtHook";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      height: 45,
    },
  })
);

const initValue = {
  lat: 10.8458083,
  lng: 106.7945438,
};

export default function Search() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const UserData = useJwtHook.getUserStorage();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchValue, setSearchValue] = React.useState("");
  const [currentValue, setCurrentValue] = React.useState(true);
  const [openNow, setOpenNow] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<any[]>([]);
  const [resultLength, setResultLength] = React.useState(0);
  const [searchEnabled, setsearchEnabled] = React.useState(false);
  const [currentPosition, setCurrentPosition] = React.useState(initValue);

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [name, setName] = React.useState("");
  const [lat, setLat] = React.useState(0);
  const [lng, setLng] = React.useState(0);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchResult.length) : 0;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  React.useEffect(() => {
    getCurrentLocation();
  }, [navigator, setCurrentPosition]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleResetValue = () => {
    setsearchEnabled(false);
    setSearchValue("");
    setSearchResult([]);
    setSuccess(false);
    setError(false);
    dispatch(resetSearch());
  };

  const handleChangeCurrentValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentValue(event.target.checked);
  };

  // Confirm search
  const handleConfirmSearch = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(searchValue);
    console.log(currentPosition);
    console.log(openNow);
    axios
      .post(`${defaultConfig.baseUrl}rapidapi/textsearch`, {
        keyword: searchValue,
        lat: currentPosition.lat,
        lng: currentPosition.lng,
        isOpenNow: openNow,
      })
      .then((res) => {
        setsearchEnabled(true);
        setSearchResult(res.data);
        setSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  const showCurrent = (data: any) => {
    console.log(data);
    dispatch(
      setSearch({
        enabled: true,
        lat: data.geometry.location.lat,
        lng: data.geometry.location.lng,
        value: JSON.stringify(data),
      })
    );
  };

  const hanleaddFavorite = () => {
    useJwtHook
      .createFavoriteById(UserData?.id, {
        name,
        lat,
        lng,
        address,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setSuccess(true);
        dispatch(setUser(res.data));
      }).catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  const handleOpenAddDialog = (data: any) => {
    setName(data.name);
    setLat(data.geometry.location.lat);
    setLng(data.geometry.location.lng);
    setAddress(data.formatted_address);
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setName("");
    setLat(0);
    setLng(0);
    setAddress("");
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flex: "0 1 10vw", display: "inline" }}>
        {success && (
          <Alert severity="success" onClose={() => setSuccess(false)}>
            <AlertTitle>Success</AlertTitle>
            Your search has been completed.
          </Alert>
        )}
        {error && (
          <Alert severity="error" onClose={() => setError(false)}>
            <AlertTitle>Error</AlertTitle>
            Your search has been failed.
          </Alert>
        )}
        <Container maxWidth="sm">
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12}>
              <TextField
                label="Search"
                id="outlined-search"
                variant="outlined"
                type="search"
                value={searchValue}
                onChange={handleInputChange}
                InputProps={{
                  className: classes.input,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                startIcon={<SearchIcon />}
                type="submit"
                variant="outlined"
                className={classes.input}
                onClick={handleConfirmSearch}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                startIcon={<SearchIcon />}
                type="reset"
                variant="outlined"
                className={classes.input}
                onClick={handleResetValue}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Checkbox
              onChange={handleChangeCurrentValue}
              value={currentValue}
            />
            <span>Use current Location?</span>
          </Grid>
          <Grid item xs={6}>
            <Checkbox
              onChange={(event) => {
                setOpenNow(event.target.checked);
              }}
              value={openNow}
            ></Checkbox>
            <span>Open now?</span>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ flex: "0 1 20vw", display: "inline" }}>
        {searchEnabled ? (
          <TableContainer component={Paper}>
            <Table aria-label="search table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? searchResult.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : searchResult
                ).map((row) => (
                  <TableRow key={row.reference}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell style={{ width: 250 }} align="right">
                      {row.formatted_address}
                    </TableCell>
                    <TableCell style={{ width: 120 }}>
                      <IconButton
                        aria-label="showMap"
                        size="small"
                        onClick={() => showCurrent(row)}
                      >
                        <RoomIcon />
                      </IconButton>
                      {/** Add */}
                      <IconButton
                        aria-label="addFavorite"
                        size="small"
                        onClick={() => handleOpenAddDialog(row)}
                      >
                        <AddIcon />
                      </IconButton>
                      <Dialog
                        open={openAddDialog}
                        onClose={handleCloseAddDialog}
                      >
                        <DialogTitle>Add Favorite</DialogTitle>
                        <DialogContent>
                          {success ? (
                            <Alert
                              severity="success"
                              onClick={() => {
                                setSuccess(false);
                              }}
                            >
                              Success
                            </Alert>
                          ) : (
                            <></>
                          )}
                          {error ? (
                            <Alert
                              severity="error"
                              onClick={() => {
                                setError(false);
                              }}
                            >
                              <AlertTitle>Error</AlertTitle>
                              Error while add favorite. Please try again.
                            </Alert>
                          ) : (
                            <></>
                          )}
                          <TextField
                            id="name"
                            label="Name"
                            fullWidth
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            variant="filled"
                          />
                          <TextField
                            id="address"
                            label="Address"
                            fullWidth
                            type="text"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            variant="filled"
                          />
                          <TextField
                            id="position"
                            label="Position"
                            fullWidth
                            type="text"
                            value={`${lat}, ${lng}`}
                            variant="filled"
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseAddDialog}>Cancel</Button>
                          <Button onClick={hanleaddFavorite}>Confirm</Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10]}
                    colSpan={3}
                    count={searchResult.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
