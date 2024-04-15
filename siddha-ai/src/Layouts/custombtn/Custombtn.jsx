import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { Contextdata } from "../../context/Context";
import SimpleDialog from "../dialog/Dialog";

export default function Custombtn(props) {
  const {
    ColorButton2,
    setClicked,
    addressvalidation,
    personaldetailsvalidation,
    insurancevalidation,
    emergencyvalidation,
    refferalvalidation,
    IndexImageValidation,
    insuranceimagevalidation,
    ageChecked,
    senddata,
    fetchdata,
    sessionToken,
    setOpen,
    handleInsertImage,
  } = Contextdata();

  const navigate = useNavigate();

  const location = useLocation();

  const pathname = location.pathname;
  const clickHandler = async () => {
    setClicked(true);

    if (props.checked && IndexImageValidation() && pathname === "/") {
      if (!ageChecked) {
        fetchdata(props.linknxt, sessionToken);
      } else {
        navigate(props.linknxt);
      }
    }
    if (
      props.checked &&
      personaldetailsvalidation() &&
      pathname === "/personaldetails"
    ) {
      navigate(props.linknxt);
    }
    if (props.checked && addressvalidation() && pathname === "/address") {
      navigate(props.linknxt);
    }
    if (
      props.checked &&
      insuranceimagevalidation() &&
      pathname === "/insurance"
    ) {
      console.log("insurnace validation", insuranceimagevalidation());
      navigate(props.linknxt);
    }
    if (props.checked && insurancevalidation() && pathname === "/verify") {
      navigate(props.linknxt);
    }
    if (props.checked && emergencyvalidation() && pathname === "/contact") {
      navigate(props.linknxt);
    }
    if (props.checked && refferalvalidation() && pathname === "/referral") {
      navigate(props.linknxt);
    }
    if (props.checked && pathname === "/confirm") {
      // navigate(props.linknxt)
      senddata();
    }
    if (props.checked && pathname === "/privacypractices") {
      navigate(props.linknxt);
    }
    if (props.checked && pathname === "/eula") {
      navigate(props.linknxt);
    }

    if (props.checked && pathname === "/consenttotreatment") {
      handleInsertImage();
      navigate(props.linknxt);
    }
    if (!props.checked) {
      setOpen(true);
    }
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "18px 0 0",
        }}
        direction="row"
        spacing={2}
      >
        {pathname === "/" ? (
          <ColorButton2
            variant="text"
            endIcon={<ArrowRightAltOutlinedIcon />}
            onClick={() => clickHandler()}
          >
            Next
          </ColorButton2>
        ) : (
          <>
            <Button
              variant="text"
              startIcon={<KeyboardBackspaceOutlinedIcon />}
              onClick={() => navigate(props.linkbck)}
            >
              Back
            </Button>
            <ColorButton2
              variant="text"
              endIcon={<ArrowRightAltOutlinedIcon />}
              onClick={() => clickHandler()}
            >
              Next
            </ColorButton2>
          </>
        )}
      </Stack>
      <SimpleDialog />
    </>
  );
}
