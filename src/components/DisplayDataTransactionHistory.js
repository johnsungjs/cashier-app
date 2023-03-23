import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";

const DisplayDataTransactionHistory = ({ dataFromApi }) => {
  // const simplifiedDetail = dataFromApi.map((e) => {
  //   return e.transactionDetail;
  // });
; //ini jadi array [3] yg isinya object2 yang ada di dataFromApi.transactionDetail

  return (
    <div style={{ width: "90%" }}>
      {/* <Typography>Transaction Header</Typography> */}
      <div>
        {dataFromApi.map((e) => (
          <Accordion key={e.transactionHeader.uuid} sx={{border: "2px solid grey", borderRadius: "10px"}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'>
              <div className='flex-col' style={{ width: "100%" }}>
                <div className='flex-row'>
                  <Typography sx={{ flex: 1 }}>Transaction Date</Typography>
                  <Typography sx={{ flex: 1 }}>Payment</Typography>
                  <Typography sx={{ flex: 1 }}>Payment Method</Typography>
                </div>
                <div className='flex-row'>
                  <Typography sx={{ flex: 1 }}>
                    {moment(e.transactionHeader.transactionDate).format(
                      "DD-MMM-YYYY"
                    )}
                  </Typography>
                  <Typography sx={{ flex: 1 }}>
                    Rp
                    {e.transactionHeader.payment
                      .toString()
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                  </Typography>
                  <Typography sx={{ flex: 1 }}>
                    {e.transactionHeader.paymentMethod.paymentMethod}
                  </Typography>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div
                className='flex-col'
                style={{
                  width: "auto",
                  background: "lightgrey",
                  borderRadius: "10px",
                  padding: "20px",
                }}>
                <div className='flex-row'>
                  <Typography sx={{ flex: 1 }}>No</Typography>
                  <Typography sx={{ flex: 3 }}>Item Name</Typography>
                  <Typography sx={{ flex: 3 }}>Item Price</Typography>
                  <Typography sx={{ flex: 3 }}>Amount</Typography>
                </div>

                {/* bisa juga simplifiedDetail[index].map */}
                {e.transactionDetail.map((e, i) => (
                  <div className='flex-row' key={i}>
                    <Typography sx={{ flex: 1 }}>{i + 1}</Typography>
                    <Typography sx={{ flex: 3 }}>{e.itemName}</Typography>
                    <Typography sx={{ flex: 3 }}>{e.itemPrice}</Typography>
                    <Typography sx={{ flex: 3 }}>{e.amount}</Typography>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default DisplayDataTransactionHistory;
