import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Custombtn from "../../Layouts/custombtn/Custombtn";
import "./Personaldetails.css";
import Customstepper from "../../Layouts/stepper/Stepper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { scrollUp } from "../../Layouts/backtotop/Backtotop";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Contextdata } from "../../context/Context";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  DesktopDatePicker,
  MobileDatePicker,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { click } from "@testing-library/user-event/dist/click";
import { Navigate } from "react-router-dom";

export default function Personaldetails() {
  const {
    clicked,
    setClicked,
    personaldetailsvalues,
    setPersonalDetailsValues,
    ageChecked,
    pdchecked,
    setadChecked,
    personaldetailserrorfield,
    setPersonalDetailsErrorField,
    personaldetailserrorfielddate,
    setPersonalDetailsErrorFielddate,
  } = Contextdata();

  useEffect(() => {
    scrollUp();
    setClicked(false);
  }, []);

  const [personaldetailserrorfield1, setPersonalDetailsErrorField1] =
    useState("");

  const perosnalDetailsHandler = (eOrValue) => {
    eOrValue.preventDefault();
    const nameRegex = /^[A-Za-z]*$/;
    const numberRegex = /^[0-9]*$/;

    let isValid = true;

    let name, value;

    if (eOrValue && typeof eOrValue === "object" && eOrValue.target) {
      // Handling the case when eOrValue is an event object
      name = eOrValue.target.name;
      value = eOrValue.target.value;

      if (
        name === "lastname" ||
        name === "middlename" ||
        name === "firstname"
      ) {
        isValid = nameRegex.test(value);
      }

      if (isValid) {
        setPersonalDetailsErrorField(false);
        setPersonalDetailsErrorField1(false);
        setPersonalDetailsValues((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      } else {
        setPersonalDetailsErrorField(name);
      }
    } else {
      // Handling the case when eOrValue is a direct value

      name = "dob";
      value = eOrValue;

      setPersonalDetailsValues((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [checked, setChecked] = useState(false);

  if (!pdchecked) {
    window.location.href = "/";
  }

  const handleChecked = async (e) => {
    setChecked(await e.target.checked);
    setadChecked(true);
  };

  const inputHandler = (e) => {
    console.log("input handler", e);
  };

  const currentdate = dayjs();
  const startdate = dayjs("1899-01-01T00:00:00.000");

  const enddate = currentdate.subtract(16, "year");
  /*   console.log(enddate, "endate"); */
  const [dateError, setDateError] = useState(false);

  const validateDate = (date) => {
    // Check if the date is valid and the year has four digits
    if (
      date &&
      dayjs(date).isValid() &&
      dayjs(date).format("YYYY").length === 4
    ) {
      setPersonalDetailsErrorFielddate(false);
      return true;
    }

    console.log(personaldetailsvalues);
    return false;
  };

  const handleDateChange = (date) => {
    // Check if the selected date is valid
    if (!dayjs(date).isValid()) {
      setDateError("minDate");
      setPersonalDetailsErrorFielddate("Date waste.");
    }

    if (validateDate(date)) {
      setPersonalDetailsValues((prevData) => ({
        ...prevData,
        dob: date,
      }));
      setDateError(false);
    } else {
      setDateError(
        "Invalid date. Please select a date with a four-digit year.",
      );
      setPersonalDetailsErrorField("dob");
      console.log(personaldetailserrorfield);
    }
  };

  const validate = useCallback(() => {
    if (personaldetailsvalues.firstname.length < 3) {
      setPersonalDetailsErrorField("fnerr");
    }
    if (personaldetailsvalues.lastname.length < 3) {
      setPersonalDetailsErrorField1("lnerr");
    }
  }, [personaldetailsvalues]);
  useEffect(() => {
    if (checked) {
      validate(personaldetailsvalues);
    }
    if (checked) {
      validate(personaldetailsvalues);
    }
  }, [personaldetailsvalues, checked, validate]);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Customstepper active={1} />
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
            Personal Details
          </Typography>
          <form autoComplete="off">
            <TextField
              autoComplete="off"
              required
              id="standard-required"
              label="First Name"
              variant="standard"
              fullWidth
              name="firstname"
              onChange={(e) => perosnalDetailsHandler(e)}
              value={personaldetailsvalues.firstname}
              error={
                (clicked && !personaldetailsvalues.firstname) ||
                personaldetailserrorfield === "firstname" ||
                personaldetailserrorfield === "fnerr"
              } // Convert the error message to a boolean for Material-UI
              helperText={
                personaldetailserrorfield === "fnerr"
                  ? "Minimum 3 characters required"
                  : personaldetailserrorfield === "firstname"
                    ? "Enter alphabets only"
                    : clicked && !personaldetailsvalues.firstname
                      ? "This field is required"
                      : ""
              }
              inputProps={{
                maxLength: 30, // Set the maximum length here
              }}
            />

            <TextField
              id="standard-required"
              label="Middle Name"
              variant="standard"
              fullWidth
              name="middlename"
              onChange={perosnalDetailsHandler}
              value={personaldetailsvalues.middlename}
              error={personaldetailserrorfield === "middlename"} // Convert the error message to a boolean for Material-UI
              helperText={
                personaldetailserrorfield === "middlename"
                  ? "Enter alphabets only"
                  : ""
              }
              inputProps={{
                maxLength: 30, // Set the maximum length here
              }}
            />
            <TextField
              required
              id="standard-required"
              label="Last Name"
              variant="standard"
              fullWidth
              name="lastname"
              onChange={perosnalDetailsHandler}
              value={personaldetailsvalues.lastname}
              error={
                (clicked && !personaldetailsvalues.lastname) ||
                personaldetailserrorfield === "lastname" ||
                personaldetailserrorfield1 === "lnerr"
              } // Convert the error message to a boolean for Material-UI
              helperText={
                personaldetailserrorfield1 === "lnerr"
                  ? "Minimum 3 characters required"
                  : personaldetailserrorfield === "lastname"
                    ? "Enter alphabets only"
                    : clicked && !personaldetailsvalues.lastname
                      ? "This field is required"
                      : ""
              }
              inputProps={{
                maxLength: 30, // Set the maximum length here
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DesktopDatePicker", "StaticDatePicker"]}
              >
                <DemoItem
                  label={
                    <>
                      <p>
                        Date of Birth{" "}
                        <span style={{ color: "#D32F2F" }}>*</span>{" "}
                        <span>
                          {!personaldetailsvalues.dob && clicked && (
                            <span className="error">
                              This field is required
                            </span>
                          )}{" "}
                        </span>
                      </p>
                    </>
                  }
                  id="dob"
                  name="dob"
                >
                  <DesktopDatePicker
                    disableFuture
                    required
                    value={personaldetailsvalues.dob}
                    onChange={handleDateChange}
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
                    minDate={ageChecked ? enddate : startdate}
                    maxDate={ageChecked ? currentdate : enddate}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>

            <FormControl fullWidth required variant="standard">
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Select
                id="gender"
                name="gender"
                required
                value={personaldetailsvalues.gender}
                onChange={(e) => perosnalDetailsHandler(e)}
                error={clicked && !personaldetailsvalues.gender}
              >
                <MenuItem value="UNK">Choose not to disclose</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {clicked && !personaldetailsvalues.gender && (
                <span className="error">This field is required</span>
              )}
            </FormControl>

            <FormControl fullWidth required variant="standard">
              <InputLabel htmlFor="language">Preferred Language</InputLabel>
              <Select
                name="preferredlanguage"
                id="language"
                required
                value={personaldetailsvalues.preferredlanguage}
                onChange={(e) => perosnalDetailsHandler(e)}
                error={clicked && !personaldetailsvalues.preferredlanguage}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {clicked && !personaldetailsvalues.preferredlanguage && (
                <span className="error">This field is required</span>
              )}
            </FormControl>

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
            <Custombtn linknxt="/address" linkbck="/" checked={checked} />
          </form>
        </div>
      </div>
    </>
  );
}
