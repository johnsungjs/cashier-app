import { Delete, Remove } from "@mui/icons-material";
import { Button, IconButton, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeletePaymentMethod from "../modals/DeletePaymentMethod";
import DeleteUnitType from "../modals/DeleteUnitType";
import { linkApi } from "../service/linkApi";

const Settings = () => {
  const [inputUser, setInputUser] = useState({});
  const [dataPaymentMethod, setDataPaymentMethod] = useState([]);
  const [dataUnitType, setDataUnitType] = useState([]);

  useEffect(() => {
    axios
      .get(`${linkApi}api/paymentmethod`)
      .then((res) => {
        setDataPaymentMethod(res.data.data);
        axios
          .get(`${linkApi}api/unittype`)
          .then((res) => setDataUnitType(res.data.data))
          .catch((err) => console.log("error get unit type", err));
      })
      .catch((err) => console.log("error get paymentmethod", err));
  }, []);

  const reset = () => {
    setInputUser({});
  };

  const handleInputChange = (e) => {
    setInputUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNewPaymentMethod = () => {
    axios
      .post(`${linkApi}api/paymentmethod`, {
        paymentMethodName: inputUser.paymentMethod,
      })
      .then(() => {
        alert("new payment method added");
        reset();
      })
      .catch((err) => console.log("failed to post new payment method", err));
  };

  const handleNewUnitType = () => {
    axios
      .post(`${linkApi}api/unittype`, {
        unitType: inputUser.unitType,
      })
      .then(() => {
        alert("new Unit Type added");
        reset();
      })
      .catch((err) => console.log("failed to post new payment method", err));
  };

  return (
    <div>
      <div className='flex-row' style={{justifyContent: "stretch"}}>
        <Paper sx={{ p: 2, m: 1, flex: 1, alignSelf: "stretch" }}>
          <div>Add New Payment Method</div>
          <TextField
            name='paymentMethod'
            value={inputUser.paymentMethod || ""}
            onChange={handleInputChange}
            variant='outlined'
            placeholder='insert New Payment Method'
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          />
          <Button variant='contained' onClick={handleNewPaymentMethod}>
            Add New
          </Button>
          <div style={{ marginTop: "20px" }}>Existing Payment Method</div>
          {dataPaymentMethod.map((e) => {
            return (
              <Paper
                sx={{ p: 2, mt: 1, mb: 1, justifyContent: "space-between" }}
                className='flex-row'
                key={e.id}>
                <div>{e.paymentMethod}</div>
                <DeletePaymentMethod methodClicked={e} />
              </Paper>
            );
          })}
        </Paper>
        <Paper sx={{ p: 2, m: 1, flex: 1, alignSelf: "stretch" }}>
          <div>Add New Unit Type</div>
          <TextField
            name='unitType'
            value={inputUser.unitType || ""}
            onChange={handleInputChange}
            variant='outlined'
            placeholder='insert New Unit Type'
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          />
          <Button variant='contained' onClick={handleNewUnitType}>
            Add New
          </Button>
          <div style={{ marginTop: "20px" }}>Existing Unit Type</div>
          {dataUnitType.map((e) => {
            return (
              <Paper
                sx={{ p: 2, mt: 1, mb: 1, justifyContent: "space-between" }}
                className='flex-row'
                key={e.id}>
                <div>{e.unitType}</div>
                <DeleteUnitType unitTypeClicked={e} />
              </Paper>
            );
          })}
        </Paper>
      </div>
    </div>
  );
};

export default Settings;
