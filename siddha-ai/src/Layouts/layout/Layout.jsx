import React from "react";
import Box from "@mui/material/Box";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", overflow: "hidden" }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "95%", md: "95%" },
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            marginTop: "8px",
            
            paddingBottom: "2rem",
            
          }}
        >
          <Navbar />
          <main>{children}</main>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
