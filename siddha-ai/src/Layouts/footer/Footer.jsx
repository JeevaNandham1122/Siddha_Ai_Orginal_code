import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

export default function Footer() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#111827",
          color: "#fff",
          fontWeight: "600",
          padding: "1rem 0",
          textAlign: "center",
        }}
      >
        <Typography>&copy; Copyright Siddha AI 2023</Typography>
      </Box>
    </>
  );
}
