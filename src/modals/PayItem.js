import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { linkApi, linkApiLocal } from "../service/linkApi";

const PayItem = ({ dataTransaction, subtotal }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentType, setPaymentType] = useState([]);
  const [inputPay, setInputPay] = useState("");
  const [inputPaymentType, setInputPaymentType] = useState("");

  useEffect(() => {
    axios
      .get(`${linkApi}api/paymentmethod`)
      .then((res) => {
        setPaymentType(res.data.data);
      })
      .catch((err) => {
        console.log("Error get paymentmethod", err);
      });
  }, []);

  const handleTransaction = (e) => {
    e.preventDefault();
    const transactionDetail = dataTransaction.map((e) => {
      return {
        itemId: e.uuid,
        amount: e.itemAmount,
      };
    });

    const payment = parseInt(inputPay.replace(/\./g, ""), 10);

    axios
      .post(`${linkApi}api/transaction`, {
        transactionHeader: {
          payment,
          paymentMethodId: inputPaymentType,
        },
        transactionDetail,
      })
      .then((res) => {
        console.log("Success Post New Transaction", res);
        handleClose();
      })
      .catch((err) => console.log("Error Post New Transaction", err));
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

  const handleChange = (event) => {
    setInputPaymentType(event.target.value);
  };

  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Pay Item</Button>
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
            <div style={{ fontSize: "20px" }}>Payment</div>
            <Paper sx={{ mt: 2 }}>
              <div
                className='flex-row'
                style={{
                  margin: "0",
                  padding: "20px",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  background: "lightgreen",
                  borderRadius: "5px",
                }}>
                <div>Subtotal</div>
                <div>
                  Rp
                  {subtotal
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                </div>
              </div>

              <div className='flex-row-sp-between' style={{ margin: "10px" }}>
                <div>Metode Pembayaran</div>
                <FormControl sx={{ width: "200px" }} size='small'>
                  <InputLabel id='demo-select-small'>Payment Method</InputLabel>
                  <Select
                    labelId='demo-select-small'
                    id='demo-select-small'
                    value={inputPaymentType}
                    defaultValue=''
                    label='Payment Method'
                    onChange={handleChange}>
                    {paymentType.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        {e.paymentMethod}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='flex-row-sp-between' style={{ margin: "10px" }}>
                <div> Jumlah Bayar</div>
                <TextField
                  value={inputPay}
                  onChange={(e) =>
                    setInputPay(addCommas(removeNonNumeric(e.target.value)))
                  }
                  size='small'
                />
              </div>
              <div
                className='flex-row'
                style={{
                  margin: "0",
                  padding: "20px",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  background: "lightgreen",
                  borderRadius: "5px",
                }}>
                <div>Kembalian</div>
                <div>
                  Rp
                  {(parseInt(inputPay.replace(/\./g, ""), 10) - subtotal)
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                </div>
              </div>
              <div className='flex-row' style={{ justifyContent: "right" }}>
                <Button
                  variant='contained'
                  sx={{ m: 1 }}
                  onClick={handleTransaction}>
                  Pay
                </Button>
                <Button sx={{ m: 1 }} onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PayItem;
