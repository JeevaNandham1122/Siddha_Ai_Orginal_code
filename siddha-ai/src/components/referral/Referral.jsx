import React, { useState, useEffect } from "react";
import Navbar from "../../Layouts/navbar/Navbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Custombtn from "../../Layouts/custombtn/Custombtn";
import Footer from "../../Layouts/footer/Footer";
import Customstepper from "../../Layouts/stepper/Stepper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { scrollUp } from "../../Layouts/backtotop/Backtotop";
import { Contextdata } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function Referral() {
  const {
    referralValues,
    setRefferalValue,
    clicked,
    setClicked,
    refferalCheckedHandler,
    refferalchecked,
    setReferralContactLenghtError,
    referalContactLengthError,
    referalFaxNumberLengthError,
    setReferralFaxNumberLenghtError,
    referralerrorfield,
    setReferralErrorField,
    setprivacychecked,
    referralchecked,
  } = Contextdata();

  const navigate = useNavigate();

  useEffect(() => {
    scrollUp();
    setClicked(false);
  }, []);
  const [checked, setChecked] = useState(false);

  if (!referralchecked) {
    window.location.href = "/";
  }

  const handleChecked = (e) => {
    setChecked(e.target.checked);
    setprivacychecked(e.target.checked);
  };

  const [contactnumbererror, setContactNumberError] = useState(false);

  const refferalValueHandler = (e) => {
    const nameRegex = /^[A-Za-z]*$/;
    const numberRegex = /^[0-9]*$/;
    const { name, value } = e.target;
    let isValid = true;

    if (
      name === "PrimaryCareDoctorFirstName" ||
      name === "PrimaryCareDoctorLastName" ||
      name === "PrimaryCareCity" ||
      name === "ReferralName"
    ) {
      isValid = nameRegex.test(value);
    }
    if (name === "PrimaryCareZipcode") {
      isValid = numberRegex.test(value);
    }
    if (name === "PrimaryCarePhoneNumber") {
      isValid = numberRegex.test(value);
      setReferralContactLenghtError(false);
    }
    if (name === "PrimaryCareFaxNumber") {
      isValid = numberRegex.test(value);
      setReferralFaxNumberLenghtError(false);
    }

    if (isValid) {
      setReferralErrorField(false);
      setRefferalValue((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setReferralErrorField(name);
    }
  };

  const [referralerror1, setReferralErrorField1] = useState(null);
  const [referralerror2, setReferralErrorField2] = useState(null);

  useEffect(() => {
    if (referralValues.PrimaryCareDoctorFirstName.length < 3) {
      setReferralErrorField("fname err");
    }
  }, [referralValues]);

  useEffect(() => {
    if (refferalchecked) {
      if (!referralValues.ReferralName.length < 3) {
        console.log(referralValues.ReferralName);
        console.log(referralValues.ReferralName.length);
        setReferralErrorField("ReferralNamereq");
      }
    }
    refferalchecked
      ? setRefferalValue((prevData) => ({
          ...prevData,
          PrimaryCareDoctorFirstName: "",
          PrimaryCareDoctorLastName: "",
          PrimaryCarePhoneNumber: "",
          PrimaryCareFaxNumber: "",
        }))
      : setRefferalValue((prevData) => ({
          ...prevData,
          ReferralName: "",
        }));
    setClicked(false);
  }, [refferalchecked]);

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Customstepper active={6} />
        </Box>

        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1.5rem",
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={refferalchecked}
                  onClick={(e) => refferalCheckedHandler(e)}
                />
              }
              label="No Primary Care Physician."
            />
          </FormGroup>
        </Stack>

        <div className="formbold-main-wrapper">
          <div className="formbold-form-wrapper">
            {!refferalchecked ? (
              <>
                <Typography
                  variant="h4"
                  margin="1.4rem 0 2rem"
                  color="#0488B9"
                  fontWeight="bold"
                  component="h1"
                  textAlign="center"
                >
                  Primary Care Physician
                </Typography>
                <form>
                  <TextField
                    autoCorrect="off"
                    autoComplete="off"
                    aria-autocomplete="none"
                    required
                    id="standard-required"
                    label="Primary Care Doctor First Name"
                    variant="standard"
                    fullWidth
                    name="PrimaryCareDoctorFirstName"
                    onChange={(e) => refferalValueHandler(e)}
                    value={referralValues.PrimaryCareDoctorFirstName}
                    error={
                      (clicked && !referralValues.PrimaryCareDoctorFirstName) ||
                      referralerrorfield === "PrimaryCareDoctorFirstName" ||
                      (clicked && referralerror1 === "fnerr") ||
                      (clicked &&
                        referralValues.PrimaryCareDoctorFirstName.length < 3)
                    } // Convert the error message to a boolean for Material-UI
                    helperText={
                      clicked && referralerror1 === "fnerr"
                        ? "Minimum 3 character required"
                        : clicked &&
                            referralValues.PrimaryCareDoctorFirstName.length < 3
                          ? "Minimum 3 characters required"
                          : referralerrorfield === "PrimaryCareDoctorFirstName"
                            ? "Enter Alphabets only"
                            : clicked &&
                                !referralValues.PrimaryCareDoctorFirstName
                              ? "This field is required"
                              : ""
                    }
                    inputProps={{
                      maxLength: 30, // Set the maximum length here
                    }}
                  />
                  <TextField
                    required
                    id="standard-required"
                    label="Primary Care Doctor Last Name"
                    variant="standard"
                    fullWidth
                    name="PrimaryCareDoctorLastName"
                    onChange={(e) => refferalValueHandler(e)}
                    value={referralValues.PrimaryCareDoctorLastName}
                    error={
                      (clicked && !referralValues.PrimaryCareDoctorLastName) ||
                      referralerrorfield === "PrimaryCareDoctorLastName" ||
                      (clicked && referralerror2 === "lnerr") ||
                      (clicked &&
                        referralValues.PrimaryCareDoctorLastName.length < 3)
                    } // Convert the error message to a boolean for Material-UI
                    helperText={
                      clicked && referralerror2 === "lnerr"
                        ? "Minimum 3 characters required"
                        : clicked &&
                            referralValues.PrimaryCareDoctorLastName.length < 3
                          ? "Minimum 3 characters required"
                          : referralerrorfield === "PrimaryCareDoctorLastName"
                            ? "Enter Alphabets only"
                            : clicked &&
                                !referralValues.PrimaryCareDoctorLastName
                              ? "This field is required"
                              : ""
                    }
                    inputProps={{
                      maxLength: 30, // Set the maximum length here
                    }}
                  />
                  <TextField
                    required
                    id="standard-required"
                    label="Primary Care Phone Number"
                    type="tel"
                    variant="standard"
                    fullWidth
                    name="PrimaryCarePhoneNumber"
                    onChange={(e) => refferalValueHandler(e)}
                    value={referralValues.PrimaryCarePhoneNumber}
                    error={
                      (clicked && !referralValues.PrimaryCarePhoneNumber) ||
                      referralerrorfield === "PrimaryCarePhoneNumber" ||
                      (clicked && referalContactLengthError) ||
                      (clicked &&
                        referralValues.PrimaryCarePhoneNumber.length < 10)
                    } // Convert the error message to a boolean for Material-UI
                    helperText={
                      referralerrorfield === "PrimaryCarePhoneNumber"
                        ? "Enter Number only"
                        : clicked && !referralValues.PrimaryCarePhoneNumber
                          ? "Enter Number only"
                          : clicked && !referralValues.PrimaryCarePhoneNumber
                            ? "This field is required"
                            : clicked &&
                                referralValues.PrimaryCarePhoneNumber.length <
                                  10
                              ? "Phone number is invalid."
                              : ""
                    }
                    inputProps={{
                      maxLength: 10, // Set the maximum length here
                    }}
                  />

                  <TextField
                    required
                    id="standard-required"
                    label="Primary Care Fax Number"
                    type="tel"
                    variant="standard"
                    fullWidth
                    name="PrimaryCareFaxNumber"
                    onChange={(e) => refferalValueHandler(e)}
                    value={referralValues.PrimaryCareFaxNumber}
                    error={
                      (clicked && !referralValues.PrimaryCareFaxNumber) ||
                      referralerrorfield === "PrimaryCareFaxNumber" ||
                      (clicked &&
                        referralValues.PrimaryCareFaxNumber.length < 10)
                    } // Convert the error message to a boolean for Material-UI
                    helperText={
                      referralerrorfield === "PrimaryCareFaxNumber"
                        ? "Enter Number only"
                        : clicked && !referralValues.PrimaryCareFaxNumber
                          ? "This field is required"
                          : clicked &&
                              referralValues.PrimaryCareFaxNumber.length < 10
                            ? "Fax number is invalid."
                            : ""
                    }
                    inputProps={{
                      maxLength: 10, // Set the maximum length here
                    }}
                  />
                  <TextField
                    id="standard-required"
                    label="Other Referral Name"
                    variant="standard"
                    fullWidth
                    name="ReferralName"
                    onChange={(e) => refferalValueHandler(e)}
                    value={referralValues.ReferralName}
                    error={referralerrorfield === "ReferralName"} // Convert the error message to a boolean for Material-UI
                    helperText={
                      referralerrorfield === "ReferralName"
                        ? "Enter Alphabets only"
                        : ""
                    }
                    inputProps={{
                      maxLength: 30, // Set the maximum length here
                    }}
                  />
                </form>
              </>
            ) : (
              <>
                <Typography
                  variant="h4"
                  margin="1.4rem 0 2rem"
                  color="#0488B9"
                  fontWeight="bold"
                  component="h1"
                  textAlign="center"
                >
                  Referral Details
                </Typography>

                <TextField
                  required
                  id="standard-required"
                  label="Other Referral Name"
                  variant="standard"
                  fullWidth
                  name="ReferralName"
                  onChange={(e) => refferalValueHandler(e)}
                  value={referralValues.ReferralName}
                  error={
                    (clicked && !referralValues.ReferralName) ||
                    referralerrorfield === "ReferralName" ||
                    (clicked && referralValues.ReferralName.length < 3)
                  } // Convert the error message to a boolean for Material-UI
                  helperText={
                    referralerrorfield === "ReferralName"
                      ? "Enter Alphabets only"
                      : clicked && !referralValues.ReferralName
                        ? "This field is required"
                        : clicked && referralValues.ReferralName.length < 3
                          ? "Name should contain 3 characters"
                          : ""
                  }
                  inputProps={{
                    maxLength: 30, // Set the maximum length here
                  }}
                />
              </>
            )}
            <Stack
              sx={{
                display: "flex",
                alignItems: "start",
                marginTop: "1.5rem",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onClick={(e) => handleChecked(e)}
                    />
                  }
                  label="The above information is correct."
                />
              </FormGroup>
            </Stack>

            <Custombtn
              linknxt="/privacypractices"
              linkbck="/contact"
              checked={checked}
            />
          </div>
        </div>
      </Box>
    </>
  );
}
