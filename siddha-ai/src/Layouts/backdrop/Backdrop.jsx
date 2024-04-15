import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Contextdata } from "../../context/Context";
import "./Backdrop.css";

export default function Loading() {
  const { loading } = Contextdata();
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          rowGap: "2rem",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        {/* <CircularProgress color="inherit" /> */}
        <span class="loader"></span>
        <h1>Loading...</h1>
      </Backdrop>
    </>
  );
}
