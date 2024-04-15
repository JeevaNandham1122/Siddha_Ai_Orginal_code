import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Custombtn from "../../Layouts/custombtn/Custombtn";
import Customstepper from "../../Layouts/stepper/Stepper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { scrollUp } from "../../Layouts/backtotop/Backtotop";
import { Contextdata } from "../../context/Context";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DesktopDatePicker, MobileDatePicker } from "@mui/x-date-pickers";

export default function Verify() {
  const {
    insuranceDateErr,
    setinsuranceDateErr,
    insuranceDetails,
    setInsuranceDetails,
    clicked,
    insurancechecked,
    setInsuranceChecked,
    setClicked,
    setcontactchecked,
    verifyChecked,
  } = Contextdata();

  useEffect(() => {
    scrollUp();
    setClicked(false);
  }, []);

  const relationship = [
    {
      value: "",
      label: "",
    },
    {
      value: "Father",
      label: "Father",
    },
    {
      value: "Mother",
      label: "Mother",
    },
    {
      value: "Child",
      label: "Child",
    },
    {
      value: "Significant Other",
      label: "Significant Other",
    },
    {
      value: "Life Partner",
      label: "Life Partner",
    },
    {
      value: "Dependent of Minor Dependent",
      label: "Dependent of Minor Dependent",
    },
  ];

  const [checked, setChecked] = useState(false);

  if (!verifyChecked) {
    window.location.href = "/";
  }
  const handleChecked = (e) => {
    setChecked(e.target.checked);
    setcontactchecked(e.target.checked);
  };

  const [insuranceerrorfield, setInsuranceErrorField] = useState("");
  const [contactnumbererror, setContactNumberError] = useState(false);

  const insuranceDetailsHandler = (eOrValue) => {
    const nameRegex = /^[A-Za-z]*$/;
    const alphaNumericRegex = /^[A-Za-z0-9]*$/;

    let isValid = true;

    let name, value;

    if (eOrValue && typeof eOrValue === "object" && eOrValue.target) {
      // Handling the case when eOrValue is an event object
      name = eOrValue.target.name;
      value = eOrValue.target.value;

      if (name === "groupnumber" || name === "memberid") {
        isValid = alphaNumericRegex.test(value);
      }

      if (name === "subscriberlastname" || name === "subscriberfirstname") {
        isValid = nameRegex.test(value);
      }

      if (isValid) {
        setInsuranceErrorField(false);
        setInsuranceDetails((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      } else {
        setInsuranceErrorField(name);
      }
    } else {
      // Handling the case when eOrValue is a direct value
      name = "subscriberdob";
      value = eOrValue;
      setInsuranceDetails((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const currentdate = dayjs();
  const startdate = dayjs("1899-01-01T00:00:00.000");
  const enddate = currentdate.subtract(16, "year");
  const [dateError, setDateError] = useState(false);

  const validateDate = (date) => {
    // Check if the date is valid and the year has four digits
    if (!dayjs(date).isValid()) {
      setinsuranceDateErr("Invalid Date");
    } else {
      setinsuranceDateErr(null);
    }
    if (
      date &&
      dayjs(date).isValid() &&
      dayjs(date).format("YYYY").length === 4
    ) {
      return true;
    }
    return false;
  };

  const handleDateChange = (date) => {
    // Check if the selected date is valid
    if (validateDate(date)) {
      setInsuranceDetails((prevData) => ({
        ...prevData,
        subscriberdob: date,
      }));
      setDateError(false);
    } else if (dateError === "invalidDate") {
      setDateError(
        "Invalid date. Please select a date with a four-digit year.",
      );
      setInsuranceErrorField("subscriberdob");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Customstepper active={4} />
      </Box>

      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <Typography
            variant="h4"
            margin="1.3rem 0 1.4rem"
            color="#0488B9"
            fontWeight="bold"
            component="h1"
            textAlign="center"
          >
            Insurance Details
          </Typography>
          <form>
            <TextField
              sx={{ marginTop: "20px" }}
              required
              id="standard-required"
              label="Group Number"
              variant="standard"
              fullWidth
              name="groupnumber"
              onChange={insuranceDetailsHandler}
              value={insuranceDetails.groupnumber}
              error={
                (clicked && !insuranceDetails.groupnumber) ||
                insuranceerrorfield === "groupnumber"
              } // Convert the error message to a boolean for Material-UI
              helperText={
                insuranceerrorfield === "groupnumber"
                  ? "Enter alphabets or Number"
                  : clicked && !insuranceDetails.groupnumber
                    ? "This field is required"
                    : ""
              }
              inputProps={{
                maxLength: 16, // Set the maximum length here
              }}
            />
            <TextField
              required
              id="standard-required"
              label="Member ID"
              variant="standard"
              fullWidth
              name="memberid"
              onChange={insuranceDetailsHandler}
              value={insuranceDetails.memberid}
              error={
                (clicked && !insuranceDetails.memberid) ||
                insuranceerrorfield === "memberid"
              } // Convert the error message to a boolean for Material-UI
              helperText={
                insuranceerrorfield === "memberid"
                  ? "Enter alphabets or Number"
                  : clicked && !insuranceDetails.memberid
                    ? "This field is required"
                    : ""
              }
              inputProps={{
                maxLength: 32, // Set the maximum length here
              }}
            />

            {!insurancechecked && (
              <>
                <TextField
                  required
                  id="standard-required"
                  label="Subscriber First Name"
                  variant="standard"
                  fullWidth
                  name="subscriberfirstname"
                  onChange={insuranceDetailsHandler}
                  value={insuranceDetails.subscriberfirstname}
                  error={
                    (clicked && !insuranceDetails.subscriberfirstname) ||
                    (clicked &&
                      insuranceDetails.subscriberfirstname.length < 3) ||
                    insuranceerrorfield === "subscriberfirstname"
                  } // Convert the error message to a boolean for Material-UI
                  helperText={
                    insuranceerrorfield === "subscriberfirstname"
                      ? "Enter alphabets only"
                      : clicked && !insuranceDetails.subscriberfirstname
                        ? "This field is required"
                        : clicked &&
                            insuranceDetails.subscriberfirstname.length < 3
                          ? "Enter Name more than 3 characters"
                          : ""
                  }
                  inputProps={{
                    maxLength: 32, // Set the maximum length here
                  }}
                />
                <TextField
                  required
                  id="standard-required"
                  label="Subscriber Last Name"
                  variant="standard"
                  fullWidth
                  name="subscriberlastname"
                  onChange={insuranceDetailsHandler}
                  value={insuranceDetails.subscriberlastname}
                  error={
                    (clicked && !insuranceDetails.subscriberlastname) ||
                    (clicked &&
                      insuranceDetails.subscriberlastname.length < 3) ||
                    insuranceerrorfield === "subscriberlastname"
                  } // Convert the error message to a boolean for Material-UI
                  helperText={
                    insuranceerrorfield === "subscriberlastname"
                      ? "Enter alphabets only"
                      : clicked && !insuranceDetails.subscriberlastname
                        ? "This field is required"
                        : clicked &&
                            insuranceDetails.subscriberlastname.length < 3
                          ? "Enter Name more than 3 characters"
                          : ""
                  }
                  inputProps={{
                    maxLength: 32, // Set the maximum length here
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker", "StaticDatePicker"]}
                  >
                    <DemoItem
                      label={
                        <>
                          <p>
                            Subscriber Date of Birth{" "}
                            <span style={{ color: "#D32F2F" }}>*</span>{" "}
                            <span>
                              {!insuranceDetails.subscriberdob && clicked && (
                                <span className="error">
                                  This field is required
                                </span>
                              )}{" "}
                            </span>
                          </p>
                        </>
                      }
                      id="subscriberdob"
                      name="subscriberdob"
                    >
                      <DesktopDatePicker
                        disableFuture
                        required
                        value={insuranceDetails.subscriberdob}
                        onChange={(e) => handleDateChange(e)}
                        error={clicked && !insuranceDetails.subscriberdob}
                        onError={setDateError}
                        slotProps={{
                          textField: {
                            helperText:
                              dateError === "minDate"
                                ? "Please Enter a Valid Date"
                                : dateError === "invalidDate"
                                  ? "Please enter a Valid Date"
                                  : dateError === "disableFuture"
                                    ? "Future Dates are not allowed"
                                    : "MM/DD/YYYY",
                          },
                        }}
                        minDate={startdate}
                        maxDate={enddate}
                        inputFormat="MM/DD/YYYY"
                      />
                      {/* {console.log(insuranceDetails.subscriberdob.format("MM/DD/YYYY"))} */}
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>

                <FormControl fullWidth required variant="standard">
                  <InputLabel htmlFor="relationship">
                    Subscriber Relationship to Patient
                  </InputLabel>
                  <Select
                    name="SubscriberRelationshiptoPatient"
                    id="SubscriberRelationshiptoPatient"
                    required
                    value={insuranceDetails.SubscriberRelationshiptoPatient}
                    onChange={(e) => insuranceDetailsHandler(e)}
                    error={
                      clicked &&
                      !insuranceDetails.SubscriberRelationshiptoPatient
                    }
                  >
                    {relationship.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {clicked &&
                    !insuranceDetails.SubscriberRelationshiptoPatient && (
                      <span className="error">This field is required</span>
                    )}
                </FormControl>
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
              linknxt="/contact"
              linkbck="/insurance"
              checked={checked}
            />
          </form>
        </div>
      </div>
    </>
  );
}
