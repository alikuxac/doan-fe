import React from "react";
import { useJwtHook } from "../hooks/useJwtHook";
import { FavoriteInterface } from "./MyMap";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
  setCurrent,
  setUser,
  selectUser,
} from "../reducers/globalSlice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RoomIcon from "@mui/icons-material/Room";
import InfoIcon from "@mui/icons-material/Info";

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

export default function Favorite() {
  const dispatch = useAppDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [favoriteList, setFavoriteList] = React.useState<FavoriteInterface[]>(
    []
  );
  const [showDialog, setShowDialog] = React.useState(false);
  const [editDialogBoolean, setEditDialogBoolean] = React.useState(false);
  const [deleteDialogBoolean, setDeleteDialogBoolean] = React.useState(false);

  //Favorite Info
  const [favoriteName, setFavoriteName] = React.useState("");
  const [favoriteAddress, setFavoriteAddress] = React.useState("");
  const [favoriteLat, setFavoriteLat] = React.useState(0);
  const [favoriteLng, setFavoriteLng] = React.useState(0);
  const [editfavoriteCreatedAt, setFavoriteCreatedAt] = React.useState(0);

  // Alert info
  const [editSuccessBoolean, setEditSuccessBoolean] = React.useState(false);
  const [deleteSuccessBoolean, setDeleteSuccessBoolean] = React.useState(false);
  const [editAlertBoolean, setEditAlertBoolean] = React.useState(false);
  const [deleteAlertBoolean, setDeleteAlertBoolean] = React.useState(false);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - favoriteList.length) : 0;

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

  const user = useAppSelector(selectUser);

  // React.useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     setUser(JSON.parse(user));
  //   }
  // }, []);

  React.useEffect(() => {
    if (user) {
      setFavoriteList(user.favorites);
    }
  }, [user]);

  // React.useEffect(() => {
  //   getData();
  // }, [setFavoriteList]);

  // Handle
  const showCurrent = (data: FavoriteInterface) => {
    const center = { lat: data.lat, lng: data.lng };
    dispatch(setCurrent(center));
  };

  const handleEditNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFavoriteName(event.target.value);
  };

  const handleEditAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFavoriteAddress(event.target.value);
  };

  const handleConfirmEdit = () => {
    const data = {
      name: favoriteName,
      address: favoriteAddress,
      lat: favoriteLat,
      lng: favoriteLng,
      createAt: editfavoriteCreatedAt,
    };
    console.log(data);
    useJwtHook
      .updateFavoriteById(user.id + "", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setEditSuccessBoolean(true);
        dispatch(setUser(res.data));
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        setEditAlertBoolean(true);
      });
  };

  const handleConfirmDelete = () => {
    useJwtHook
      .deleteFavoriteById(user.id, editfavoriteCreatedAt)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setDeleteSuccessBoolean(true);
        dispatch(setUser(res.data));
        window.location.reload();
      })
      .catch(() => {
        setDeleteAlertBoolean(true);
      });
  };

  // Handle dialog
  const handleOpenShowDialog = (data: FavoriteInterface) => {
    setFavoriteAddress(data.address);
    setFavoriteName(data.name);
    setFavoriteLat(data.lat);
    setFavoriteLng(data.lng);
    setFavoriteCreatedAt(data.createAt);
    setShowDialog(true);
  };
  const handleOpenEditDialog = (data: FavoriteInterface) => {
    setFavoriteAddress(data.address);
    setFavoriteName(data.name);
    setFavoriteLat(data.lat);
    setFavoriteLng(data.lng);
    setFavoriteCreatedAt(data.createAt);
    setEditDialogBoolean(true);
  };

  const handleCloseShowDialog = () => {
    setFavoriteAddress("");
    setFavoriteName("");
    setFavoriteLat(0);
    setFavoriteLng(0);
    setFavoriteCreatedAt(0);
    setShowDialog(false);
  };

  const handleCloseEditDialog = () => {
    setFavoriteAddress("");
    setFavoriteName("");
    setFavoriteLat(0);
    setFavoriteLng(0);
    setFavoriteCreatedAt(0);
    setEditDialogBoolean(false);
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogBoolean(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogBoolean(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? favoriteList.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : favoriteList
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.address}
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="showMap"
                  size="small"
                  onClick={() => showCurrent(row)}
                >
                  <RoomIcon />
                </IconButton>
                <IconButton
                  aria-label="info"
                  size="small"
                  onClick={() => handleOpenShowDialog(row)}
                >
                  <InfoIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => handleOpenEditDialog(row)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => handleOpenDeleteDialog()}
                >
                  <DeleteIcon />
                </IconButton>
                <Dialog open={showDialog} onClose={handleCloseShowDialog}>
                  <DialogTitle>Infomation</DialogTitle>
                  <DialogContent>
                    <TextField
                      id="name"
                      label="Name"
                      fullWidth
                      type="text"
                      value={favoriteName}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="address"
                      label="Address"
                      fullWidth
                      type="text"
                      value={favoriteAddress}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="position"
                      label="Position"
                      fullWidth
                      type="text"
                      value={`${favoriteLat}, ${favoriteLng}`}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseShowDialog}>Close</Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={editDialogBoolean}
                  onClose={handleCloseEditDialog}
                >
                  <DialogTitle>Edit Favorite Infomation</DialogTitle>
                  <DialogContent>
                    {editSuccessBoolean ? (
                      <Alert
                        severity="success"
                        onClick={() => {
                          setEditSuccessBoolean(false);
                        }}
                      >
                        Success
                      </Alert>
                    ) : (
                      <></>
                    )}
                    {editAlertBoolean ? (
                      <Alert
                        severity="error"
                        onClick={() => {
                          setEditAlertBoolean(false);
                        }}
                      >
                        <AlertTitle>Error</AlertTitle>
                        Error while edit favorite infomation. Please try again.
                      </Alert>
                    ) : (
                      <></>
                    )}
                    <TextField
                      id="name"
                      label="Name"
                      fullWidth
                      type="text"
                      value={favoriteName}
                      onChange={handleEditNameChange}
                      variant="filled"
                    />
                    <TextField
                      id="address"
                      label="Address"
                      fullWidth
                      type="text"
                      value={favoriteAddress}
                      onChange={handleEditAddressChange}
                      variant="filled"
                    />
                    <TextField
                      id="position"
                      label="Position"
                      fullWidth
                      type="text"
                      value={`${favoriteLat}, ${favoriteLng}`}
                      variant="filled"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleConfirmEdit}>Confirm</Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={deleteDialogBoolean}
                  onClose={handleCloseDeleteDialog}
                >
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    {/* Success */}
                    {deleteSuccessBoolean ? (
                      <Alert
                        severity="error"
                        onClick={() => {
                          setDeleteSuccessBoolean(false);
                        }}
                      >
                        Success
                      </Alert>
                    ) : (
                      <></>
                    )}
                    {/* Alert */}
                    {deleteAlertBoolean ? (
                      <Alert
                        severity="error"
                        onClick={() => {
                          setDeleteAlertBoolean(false);
                        }}
                      >
                        <AlertTitle>Error</AlertTitle>
                        Error while delete favorite infomation. Please try
                        again.
                      </Alert>
                    ) : (
                      <></>
                    )}
                    Are you sure to delete this favorite?
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={handleConfirmDelete}>Confirm</Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              colSpan={3}
              count={favoriteList.length}
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
  );
}
