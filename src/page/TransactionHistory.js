import { Button, Paper, TextField, Typography } from "@mui/material";
import moment from "moment/moment";
import React, { useState } from "react";
import { linkApi } from "../service/linkApi";
import axios from "axios";
import DisplayDataTransactionHistory from "../components/DisplayDataTransactionHistory";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TransactionHistory = () => {
  const [inputDate, setInputDate] = useState({});
  const [dataTransactionHistory, setDataTransactionHistory] = useState([]);

  const handleDateChange = (e) => {
    setInputDate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const browseTransactionHistory = () => {
    axios
      .post(`${linkApi}api/gettransaction`, {
        startDate: inputDate.startDate,
        endDate: inputDate.endDate,
      })
      .then((res) => setDataTransactionHistory(res.data.data))
      .catch((err) => console.log("error get data transaction history", err));
  };

  return (
    <div>
      <Paper
        sx={{
          p: 2,
          m: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant='h6'
          id='tableTitle'
          component='div'>
          Transaction History
        </Typography>
        <div style={{height: "20px"}}></div>
        <div className='flex-col' style={{ width: "50%" }}>
          <div
            className='flex-row'
            style={{ justifyContent: "space-between", padding: "10px" }}>
            <div>Start Date</div>
            <div>
              <TextField
                name='startDate'
                id='date'
                label='Start Date'
                type='date'
                value={inputDate.startDate || ""}
                onChange={handleDateChange}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          <div
            className='flex-row'
            style={{ justifyContent: "space-between", padding: "10px" }}>
            <div>End Date</div>
            <div>
              <TextField
                name='endDate'
                id='date'
                label='End Date'
                type='date'
                value={inputDate.endDate || ""}
                onChange={handleDateChange}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
        </div>
        <div style={{height: "10px"}}></div>
        <Button variant='contained' onClick={browseTransactionHistory}>
          Browse Transaction History
        </Button>
        <div style={{height: "20px"}}></div>
        <DisplayDataTransactionHistory dataFromApi={dataTransactionHistory} />
      </Paper>
    </div>
  );
};

export default TransactionHistory;
