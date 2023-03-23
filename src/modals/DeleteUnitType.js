import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import axios from "axios";
import { linkApi } from "../service/linkApi";
import { Delete } from "@mui/icons-material";

const DeleteUnitType = ({ unitTypeClicked }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteUnitType = () => {
    axios
      .delete(`${linkApi}api/unittype`, {
        data: {
          id: unitTypeClicked.id,
          unitTypeName: "",
        },
      })
      .then(() => {
        handleClose();
        alert(
          `Succesfully Delete Unit Type ${unitTypeClicked.unitType}`
        );
      })
      .catch((err) => console.log("failed delete unit type", err));
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

  return (
    <div>
      <IconButton
        color='primary'
        aria-label='upload picture'
        component='label'
        onClick={handleOpen}>
        <Delete fontSize='small' />
      </IconButton>
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
            <div style={{ fontSize: "20px" }}>Delete Confirmation</div>
            <div style={{ marginTop: "20px" }}>
              <div style={{ fontSize: "18px", marginBottom: "10px" }}>
                Are you sure you want to delete unit type{" "}
                <b>
                  <u>{unitTypeClicked.unitType}</u>
                </b>
                ?
              </div>
              <div className='flex-row' style={{ justifyContent: "right" }}>
                <Button
                  variant='contained'
                  sx={{ m: 1 }}
                  onClick={handleDeleteUnitType}>
                  Yes
                </Button>
                <Button sx={{ m: 1 }} onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DeleteUnitType;
