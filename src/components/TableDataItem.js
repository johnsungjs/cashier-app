import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import {
  Backdrop,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import {
  Add,
  Edit,
  EditOff,
  ReduceCapacity,
  Remove,
} from "@mui/icons-material";
import AddItem from "../modals/AddItem";
import axios from "axios";
import { linkApi } from "../service/linkApi";
import EditItem from "../modals/EditItem";

const TableDataItem = ({
  data,
  dataClicked,
  removeDataClicked,
  dataUnitType,
  unitTypeFromApi,
}) => {
  const [dataFromApi, setDataFromApi] = useState([]);
  const [dataToModalEdit, setDataToModalEdit] = useState({});

  useEffect(() => {
    axios
      .get(`${linkApi}api/unittype`)
      .then((res) => setDataFromApi(res.data.data))
      .catch((err) => console.log("Error get Unit Type", err));
  }, []);
  const [inputItemName, setInputItemName] = useState(dataToModalEdit.itemName);
  const [inputItemPrice, setInputItemPrice] = useState(
    dataToModalEdit.itemPrice
  );
  const [inputItemQuantity, setInputItemQuantity] = useState(
    dataToModalEdit.itemQty
  );
  const [inputItemInfo, setInputItemInfo] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = (row) => {
    setDataToModalEdit(row);
    setInputItemName(row.itemName);
    setInputItemPrice(row.itemPrice);
    setInputItemQuantity(row.itemQty);
    setInputItemInfo(row.itemName);
    setOpen(true);
  };
  const handleClose = () => {
    setDataToModalEdit({});
    setOpen(false);
  };

  const handleEditItem = (e) => {
    e.preventDefault();
    console.log("INI DATA UUID", dataToModalEdit.uuid);
    console.log("INI inputItemName", inputItemName);
    axios
      .put(`${linkApi}api/item`, {
        uuid: dataToModalEdit.uuid,
        itemName: inputItemName,
        itemPrice: inputItemPrice,
        itemQty: inputItemQuantity,
        unitTypeId: satuan,
      })
      .then((res) => {
        console.log("Success Post Edited Item", res);
        handleClose();
      })
      .catch((err) => console.log("Error Post Edited Item", err));
  };

  const handleDeleteItem = () => {
    axios
      .delete(`${linkApi}api/item`, {
        data: {
          uuid: dataToModalEdit.uuid,
          itemName: "",
          itemPrice: "",
          itemQty: "",
          unitTypeId: "",
        },
      })
      .then(() => console.log("success delete item"))
      .catch((err) => console.log("error delete item", err));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: "none",
    borderRadius: 5,
    p: 4,
  };

  const [satuan, setSatuan] = useState("");

  const handleChange = (event) => {
    setSatuan(event.target.value);
  };

  function createData(uuid, itemName, itemPrice, itemQty, unitTypeId) {
    return {
      uuid,
      itemName,
      itemPrice,
      itemQty,
      unitTypeId,
    };
  }

  //modified rows with imported data:
  const rows = data.map((e) =>
    createData(e.uuid, e.itemName, e.itemPrice, e.itemQty, e.unitTypeId)
  );

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: "no",
      numeric: false,
      disablePadding: true,
      label: "No",
    },
    // {
    //   id: "uuid",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "UUID",
    // },
    {
      id: "itemName",
      numeric: false,
      disablePadding: false,
      label: "Item Name",
    },
    {
      id: "itemPrice",
      numeric: true,
      disablePadding: false,
      label: "Item Price",
    },
    {
      id: "itemQty",
      numeric: true,
      disablePadding: false,
      label: "Quantity",
    },
    {
      id: "satuan",
      numeric: false,
      disablePadding: false,
      label: "satuan",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
    },
  ];

  function EnhancedTableHead(props) {
    const {
      // onSelectAllClick,
      order,
      orderBy,
      // numSelected,
      // rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding='checkbox'>
            {/* <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts"
              }}
            /> */}
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={"left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}>
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}>
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color='inherit'
            variant='subtitle1'
            component='div'>
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant='h6'
            id='tableTitle'
            component='div'>
            All Item
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title='Delete'>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title='Filter list'>
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("ruleId");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //logic for searchbar
  const [searchInput, setSearchInput] = useState("");
  const inputHandler = (e) => {
    //convert input to lowercase
    const lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  const filteredData = rows.filter((e) => {
    if (searchInput === "") {
      return e;
    } else {
      // const searchA = e.uuid.toLowerCase().includes(searchInput);
      const searchB = e.itemName.toLowerCase().includes(searchInput);
      const searchC = e.itemPrice
        .toString()
        .toLowerCase()
        .includes(searchInput);
      const searchD = e.itemQty.toString().toLowerCase().includes(searchInput);
      // const searchE = e.info.toLowerCase().includes(searchInput);
      if (searchB) {
        return searchB;
      } else if (searchC) {
        return searchC;
      } else if (searchD) {
        return searchD;
      }
      // else if (searchE) {
      //   return searchE;
      // }
    }
  });
  //--searchBar end
  return (
    <>
      <Paper sx={{ p: 2, m: 1, flex: 6 }}>
        <div
          className='mb-2'
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}>
          {/* searchbar  */}
          <div style={{ margin: "auto 0px" }}>
            <div className='search-container'>
              <input
                autoFocus={true}
                accessKey='z'
                type='text'
                placeholder='Search here'
                onChange={inputHandler}
                value={searchInput}
                className='searchBox'
              />
            </div>
          </div>
          {/* searchbar  */}
          <div>
            <AddItem dataUnitType={dataUnitType} />
          </div>
          <EditItem
            dataUnitType={unitTypeFromApi}
            openFromParent={open}
            dataToModalEdit={dataToModalEdit}
          />
        </div>
        <Box>
          <Paper>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 0 }}
                aria-labelledby='tableTitle'
                size={dense ? "small" : "medium"}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={filteredData.length}
                />
                <TableBody>
                  {/* kemungkinan disini rows diganti sama filteredData */}
                  {stableSort(filteredData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          // onClick={(event) => handleClick(event, row.a)}
                          role='checkbox'
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.uuid}
                          selected={isItemSelected}>
                          <TableCell padding='checkbox'>
                            {/* <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId
                            }}
                          /> */}
                          </TableCell>
                          <TableCell
                            component='th'
                            id={labelId}
                            scope='row'
                            padding='none'>
                            {index + 1 + page * rowsPerPage}
                          </TableCell>
                          {/* <TableCell align='left'>{row.uuid}</TableCell> */}
                          <TableCell align='left'>{row.itemName}</TableCell>
                          <TableCell align='left'>
                            Rp
                            {row.itemPrice
                              .toString()
                              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                          </TableCell>
                          <TableCell align='left'>{row.itemQty}</TableCell>
                          <TableCell align='left'>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}>
                              <section>
                                {
                                  dataFromApi.find(
                                    (e) => e.id === row.unitTypeId
                                  ).unitType
                                }
                              </section>
                            </div>
                          </TableCell>
                          <TableCell align='left'>
                            <IconButton
                              color='primary'
                              aria-label='upload picture'
                              component='label'
                              onClick={() => dataClicked(row)}>
                              <Add fontSize='small' />
                            </IconButton>
                            <IconButton
                              disabled={false}
                              color='primary'
                              aria-label='upload picture'
                              component='label'
                              onClick={() => removeDataClicked(row)}>
                              <Remove fontSize='small' />
                            </IconButton>
                            <IconButton
                              color='primary'
                              aria-label='upload picture'
                              component='label'
                              onClick={() => {
                                handleOpen(row);
                              }}>
                              <Edit fontSize='small' />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label='Dense padding'
          />
        </Box>
      </Paper>
      {/* modal here */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <div style={{ fontSize: "20px" }}>Edit Item</div>
            <Paper sx={{ mt: 2 }}>
              <div className='flex-row-sp-between' style={{ margin: "10px" }}>
                <div>Nama Barang</div>
                <TextField
                  value={inputItemName}
                  onChange={(e) => setInputItemName(e.target.value)}
                  size='small'
                />
              </div>
              <div className='flex-row-sp-between' style={{ margin: "10px" }}>
                <div>Harga Barang</div>
                <TextField
                  value={inputItemPrice}
                  onChange={(e) => setInputItemPrice(e.target.value)}
                  size='small'
                />
              </div>
              <div className='flex-row-sp-between' style={{ margin: "10px" }}>
                <div>Satuan Barang</div>
                <FormControl sx={{ width: "200px" }} size='small'>
                  <InputLabel id='demo-select-small'>Satuan</InputLabel>
                  <Select
                    labelId='demo-select-small'
                    id='demo-select-small'
                    value={satuan}
                    label='Satuan'
                    onChange={handleChange}>
                    {dataFromApi.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        {e.unitType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='flex-row-sp-between' style={{ margin: "10px" }}>
                <div>Kuantitas</div>
                <TextField
                  value={inputItemQuantity}
                  onChange={(e) => setInputItemQuantity(e.target.value)}
                  size='small'
                />
              </div>
              <div className='flex-row' style={{ justifyContent: "right" }}>
                <Button
                  variant='contained'
                  sx={{ m: 1 }}
                  onClick={handleEditItem}>
                  Save Changes
                </Button>
                <Button sx={{ m: 1 }} onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  color='warning'
                  sx={{ m: 1 }}
                  onClick={handleDeleteItem}>
                  Delete Item
                </Button>
              </div>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default TableDataItem;
