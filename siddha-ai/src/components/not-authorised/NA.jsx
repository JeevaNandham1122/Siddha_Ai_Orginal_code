import { Alert } from "@mui/material";
import React, { useEffect } from "react";

export const NA = () => {
  // useEffect(() => {
  //   const Alerts = setTimeout(
  //     () => alert("Please try with the Authorized Link."),
  //     1000,
  //   );
  //   return () => clearTimeout(Alerts);
  // }, []);
  return (
    <div>
      <h1>Not Authorized.</h1>
      <Alert severity="error">Your Session Expired.</Alert>
    </div>
  );
};
