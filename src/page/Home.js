import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TableDataItem from "../components/TableDataItem";
import { Button, Divider, TextField } from "@mui/material";
import axios from "axios";
import AddItem from "../modals/AddItem";
import { linkApi } from "../service/linkApi";
import PayItem from "../modals/PayItem";

const Home = () => {
  const [dataFromApi, setDataFromApi] = useState([]);
  const [unitTypeFromApi, setUnitTypeFromApi] = useState([]);

  const childToParent = (childData) => {
    // setDataClicked(childData);
    handleAddItem(childData);
  };

  const childToParentRemove = (childData) => {
    handleRemoveItem(childData);
  };

  useEffect(() => {
    axios
      .get(`${linkApi}api/getallitem`)
      .then((res) => {
        setDataFromApi(res.data.data);
        // console.log("Success get all data", res);
      })
      .catch((err) => {
        console.log("Error get all data", err);
      });

    axios
      .get(`${linkApi}api/unittype`)
      .then((res) => setUnitTypeFromApi(res.data.data))
      .catch((err) => console.log("Error get Unit Type", err));
  }, []);

  const [dataTransaction, setDataTransaction] = useState([]);

  const [subtotal, setSubtotal] = useState(
    dataTransaction.reduce((e, { itemPrice }) => e + itemPrice, 0)
  );

  const handleAddItem = (childData) => {
    if (dataTransaction.find((e) => e.uuid === childData.uuid)) {
      let objIndex = dataTransaction.findIndex(
        (obj) => obj.uuid === childData.uuid
      );
      dataTransaction[objIndex].itemAmount += 1;
      setDataTransaction(dataTransaction);
    } else {
      setDataTransaction([
        ...dataTransaction,
        {
          uuid: childData.uuid,
          itemName: childData.itemName,
          itemPrice: childData.itemPrice,
          itemAmount: 1,
        },
      ]);
    }
    setSubtotal(subtotal + childData.itemPrice);
  };

  console.log(dataTransaction)

  const handleRemoveItem = (childData) => {
    if (dataTransaction.find((e) => e.uuid === childData.uuid)) {
      let objIndex = dataTransaction.findIndex(
        (obj) => obj.uuid === childData.uuid
      );
      dataTransaction[objIndex].itemAmount -= 1;
      setDataTransaction(dataTransaction);
    } else {
      setDataTransaction([
        ...dataTransaction,
        {
          uuid: childData.uuid,
          itemName: childData.itemName,
          itemPrice: childData.itemPrice,
          itemAmount: 1,
        },
      ]);
    }
    setSubtotal(subtotal - childData.itemPrice);
  };

  const handleDeleteItem = (e, priceDrop, itemAmount) => {
    // console.log("delete this with UUID: ", e);
    setDataTransaction(dataTransaction.filter((f) => f.uuid !== e));
    setSubtotal(subtotal - priceDrop * itemAmount);
  };

  const ShoppingCart = () => {
    return (
      <>
        {dataTransaction.map((e, index) => {
          return (
            <div
              key={index}
              className='flex-row'
              style={{ justifyContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  m: 1,
                  width: "100%",
                  height: 30,
                  backgroundColor: "white",
                  boxShadow: "1px 1px 2px 2px #d8d8d8",
                  borderRadius: 2,
                }}>
                <div style={{ flex: 4 }}>{e.itemName}</div>
                <div style={{ flex: 1 }}>
                  <div className='flex-row'>{e.itemAmount}</div>
                </div>
                <div style={{ flex: 3 }}>
                  Rp
                  {e.itemPrice
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                </div>
                <div style={{ flex: 1 }}>
                  <IconButton
                    color='primary'
                    aria-label='upload picture'
                    component='label'
                    onClick={() =>
                      handleDeleteItem(e.uuid, e.itemPrice, e.itemAmount)
                    }>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Box>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className='flex-row-resp'>
        <TableDataItem
          data={dataFromApi}
          dataClicked={childToParent}
          removeDataClicked={childToParentRemove}
          dataUnitType={unitTypeFromApi}
        />
        <Paper sx={{ p: 2, m: 1, flex: 4 }}>
          <Paper
            sx={{
              p: 2,
              m: 1,
              textAlign: "center",
              boxShadow: 0,
              fontWeight: "bold",
            }}>
            Transaction List
          </Paper>
          <div className='flex-col' style={{ justifyContent: "center" }}>
            <ShoppingCart />
          </div>
          <Divider sx={{ m: 1 }} />
          <div
            className='flex-row'
            style={{
              margin: "10px",
              padding: "20px",
              justifyContent: "space-between",
              fontWeight: "bold",
              background: "lightgreen",
              borderRadius: "5px",
            }}>
            <div>Subtotal</div>
            <div>
              Rp{subtotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
            </div>
          </div>
          <div className='flex-row'>
            <div style={{ width: "10px" }}></div>
            <PayItem
              dataUnitType={unitTypeFromApi}
              dataTransaction={dataTransaction}
              subtotal={subtotal}
            />
            <Button
              onClick={() => {
                setDataTransaction([]);
                setSubtotal(0);
              }}>
              RESET
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Home;
