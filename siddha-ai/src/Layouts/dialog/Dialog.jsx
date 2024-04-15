import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Contextdata } from "../../context/Context";

export default function SimpleDialog() {
  const { open, setOpen, ColorButton2 } = Contextdata();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <Box sx={{ backgroundColor: "#F7F5FB" }}>
          <Box
            sx={{
              display: "flex",
              columnGap: "1rem",
              padding: "8px 1px 1px 2px",
              margin: { xs: "1.2rem 8px 1rem", sm: "1.2rem 29px 1rem" },
            }}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: "2.1rem", color: "rgba(4,136,185,1)" }}
            />
            <DialogContentText
              id="alert-dialog-description"
              sx={{ fontSize: "16px", fontWeight: "500" }}
            >
              Please ensure you've checked the required box before
              proceeding.
            </DialogContentText>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              margin: { xs: "0 1rem 1rem", sm: "0 2rem 1rem" },
            }}
          >
            <ColorButton2 variant="text" onClick={handleClose}>
              Ok
            </ColorButton2>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
