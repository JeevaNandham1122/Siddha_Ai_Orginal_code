import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { scrollUp } from "../../Layouts/backtotop/Backtotop";
import { Contextdata } from "../../context/Context";

export default function Success() {
  const {
    ColorButton2,
    setCapturedImage,
    setCapture,
    setFile,
    setAgeChecked,
    setPersonalDetailsValues,
    setAddressInputvalues,
    setInsuranceChecked,
    setInsuranceFrontCapturedImage,
    setInsuranceBackCapturedImage,
    setInsuranceFrontUpload,
    setInsuranceBackUpload,
    setInsuranceDetails,
    setContactValues,
    setRefferalChecked,
    setRefferalValue,
    sessionToken,
  } = Contextdata();

  const navigate = useNavigate();

  const clearAllState = () => {
    // Dont clear these states.
    // setCapturedImage(null)
    // setCapture(null)
    // setFile(null)

    setAgeChecked(false);
    setPersonalDetailsValues({
      lastname: "",
      middlename: "",
      firstname: "",
      dob: "",
      gender: "",
      preferredlanguage: "",
    });

    setAddressInputvalues({
      streetname: "",
      city: "",
      state: "",
      zipcode: "",
      email: "",
      phone: "",
    });

    setInsuranceChecked(false);
    setInsuranceFrontCapturedImage("");
    setInsuranceBackCapturedImage("");
    setInsuranceFrontUpload("");
    setInsuranceBackUpload("");
    setInsuranceDetails({
      groupnumber: "",
      memberid: "",
      subscriberfirstname: "",
      subscriberlastname: "",
      subscriberdob: "",
      SubscriberRelationshiptoPatient: "",
    });

    setContactValues({
      firstname: "",
      lastname: "",
      contactnumber: "",
      relationship: "",
    });

    setRefferalChecked(false);
    setRefferalValue({
      PrimaryCareDoctorName: "",
      PrimaryCareDoctorLastName: "",
      PrimaryCarePhoneNumber: "",
      PrimaryCareFaxNumber: "",
      ReferralName: "",
    });
  };

  useEffect(() => {
    scrollUp();

    clearAllState();
    // Need to do another api request to the server.
    //
    //
    // setTimeout(() => {
    //   clearAllState();
    //   navigate("/");
    // }, 3000);
  }, []);

  const exitHandler = () => {
    clearAllState();

    window.location.href = "/";
  };

  return (
    <>
      <Box sx={{ minHeight: "80vh" }}>
        <Typography
          variant="h4"
          marginTop="1.8rem"
          fontWeight="bold"
          component="h1"
          color="rgba(4,136,185,1)"
          textAlign="center"
        >
          Thanks for uploading your records to Orthopedic Spine Institute.
        </Typography>
        <Typography
          variant="h6"
          marginTop="1rem"
          fontWeight="bold"
          component="h6"
          textAlign="center"
        >
          We will reach out to you shortly.
        </Typography>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "18px 0 0",
          }}
          direction="row"
          spacing={2}
        >
          <ColorButton2
            variant="text"
            endIcon={<ArrowRightAltOutlinedIcon />}
            onClick={exitHandler}
          >
            Exit
          </ColorButton2>
        </Stack>
      </Box>
    </>
  );
}
