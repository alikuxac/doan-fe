import React from 'react';
import { useJwtHook } from '../hooks/useJwtHook';
import { FavoriteInterface } from './MyMap';
import { useTheme } from "@mui/material/styles";
import { useAppDispatch } from '../hooks/reduxHook';
import { setCurrent } from "../reducers/mapSlice";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import RoomIcon from "@mui/icons-material/Room";


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
    const [favoriteList, setFavoriteList] = React.useState<FavoriteInterface[]>([]);
    const [editDialogBoolean, setEditDialogBoolean] = React.useState(false);
    const [deleteDialogBoolean, setDeleteDialogBoolean] = React.useState(false);

    //Favorite Info
    const [favoriteName, setFavoriteName] = React.useState("");
    const [favoriteAddress, setFavoriteAddress] = React.useState("");
    const [favoriteLat, setFavoriteLat] = React.useState(0);
    const [favoriteLng, setFavoriteLng] = React.useState(0);
    const [favoriteCreatedAt, setFavoriteCreatedAt] = React.useState(0);

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - favoriteList.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    const getData = async () => {
        const FavoriteDataString = useJwtHook.getUserFavorite();
        if (FavoriteDataString) {
            setFavoriteList(JSON.parse(FavoriteDataString));
        } else {
            const UserData = useJwtHook.getUserStorage();
            useJwtHook.getFavorite(UserData?.id).then((res) => {
                setFavoriteList(res.data.favorites);
                useJwtHook.setUserFavorite(res.data.favorites);
            });
        }
    }

    React.useEffect(() => {
        getData();
    }, [setFavoriteList]);

    // Handle
    const showCurrent = (data: FavoriteInterface) => {
      dispatch(setCurrent({ lat: data.lat, lng: data.lng }));
    };

    // Handle dialog
    const handleOpenEditDialog = () => {
      setEditDialogBoolean(true);
    };

    const handleCloseEditDialog = () => {
      setEditDialogBoolean(false);
    };

    const handleOpenDeleteDialog = () => {
      setDeleteDialogBoolean(true);
    };

    const handleCloseDeleteDialog = () => {
      setDeleteDialogBoolean(false);
    }

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
                  <IconButton aria-label='show' onClick={() => showCurrent(row)}>
                    <RoomIcon />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={handleOpenEditDialog}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={handleOpenDeleteDialog}>
                    <DeleteIcon />
                  </IconButton>
                  <Dialog
                    open={editDialogBoolean}
                    onClose={handleCloseEditDialog}
                  ></Dialog>
                  <Dialog
                    open={deleteDialogBoolean}
                    onClose={handleCloseDeleteDialog}
                  ></Dialog>
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
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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