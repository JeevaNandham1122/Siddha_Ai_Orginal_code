import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import MessageIcon from "@mui/icons-material/Message";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import { Contextdata } from "../../context/Context";
import { maxWidth } from "@mui/system";

export default function Navbar() {
  const { healthcare } = Contextdata();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(90deg, rgba(47,169,174,1) 0%, rgba(4,136,185,1) 64%)",
        borderRadius: "0px 0px ",
        boxShadow: "none",
        marginBottom: "20px",
        marginTop: "-8px",
        padding: "4px 0px 4px 0px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link to="/">
            <Box
              sx={{ display: "flex", alignItems: "center", columnGap: "18px" }}
            >
              <img
                style={{ width: "60px", padding: 0, margin: 0 }}
                src={
                  healthcare.logo_url ||
                  "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                }
                alt="logo"
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "flex" },
                  fontSize: "15px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {healthcare.name || "No Name"}
              </Typography>
            </Box>
          </Link>

          <Box sx={{ display: "flex", columnGap: "1px" }}>
            <Stack
              direction="row"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <a href={healthcare.email ? `mailto:${healthcare.email}` : "#"}>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  sx={{ color: "inherit" }}
                >
                  Email
                </Button>
              </a>
              <a href={healthcare.text_us ? `tel:${healthcare.text_us}` : "#"}>
                <Button
                  variant="outlined"
                  startIcon={<CallIcon />}
                  sx={{ color: "inherit" }}
                >
                  Call us
                </Button>
              </a>
              <a href={healthcare.text_us ? `sms:${healthcare.text_us}` : "#"}>
                <Button
                  variant="outlined"
                  startIcon={<MessageIcon />}
                  sx={{ color: "inherit" }}
                >
                  Text us
                </Button>
              </a>
            </Stack>
            {/* the new code is added here */}
            <Stack
              direction="row-reverse"
              sx={{ display: { xs: "block", sm: "none", minWidth: "50px" } }}
            >
              <a href={healthcare.email ? `mailto:${healthcare.email}` : "#"}>
                <Button
                  title="Email"
                  startIcon={<EmailIcon fontSize="small" />}
                  sx={{
                    color: "inherit",
                    minWidth: "48px",
                    textSizeAdjust: "auto",
                  }}
                ></Button>
              </a>
              <a href={healthcare.text_us ? `tel:${healthcare.text_us}` : "#"}>
                <Button
                  title="Call us"
                  startIcon={<CallIcon />}
                  sx={{ color: "inherit", minWidth: "48px" }}
                ></Button>
              </a>
              <a href={healthcare.text_us ? `sms:${healthcare.text_us}` : "#"}>
                <Button
                  title="Text us"
                  startIcon={<MessageIcon />}
                  sx={{ color: "inherit", minWidth: "48px" }}
                ></Button>
              </a>
            </Stack>
            {/* <MoreVertIcon
              sx={{ display: { xs: "block", sm: "none" } }}
              onClick={handleClick}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <Stack
                sx={{
                  direction: "column",
                  textAlign: "left",
                  padding: "10px 1rem",
                }}
              >
                <Button
                  variant="text"
                  startIcon={<EmailIcon sx={{ color: "#0488B9" }} />}
                  sx={{
                    color: "inherit",
                    justifyContent: "left",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  Email
                </Button>
                <Button
                  variant="text"
                  startIcon={<CallIcon sx={{ color: "#0488B9" }} />}
                  sx={{
                    color: "inherit",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  Call us
                </Button>
                <Button
                  variant="text"
                  startIcon={<MessageIcon sx={{ color: "#0488B9" }} />}
                  sx={{
                    color: "inherit",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  Text us
                </Button>
              </Stack>
            </Popover> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
