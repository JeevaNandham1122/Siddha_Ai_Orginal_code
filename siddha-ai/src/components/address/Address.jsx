import React, { useEffect, useState } from "react";
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
import { InputLabel, Select, FormControl, MenuItem } from "@mui/material";
import EmailValidator from "email-validator";

export default function Address() {
  const {
    state,
    addressinputvalues,
    setAddressInputvalues,
    clicked,
    setClicked,
    addressemailerror,
    setAddressError,
    addresscontactnumberlengtherror,
    setAddressContactNumberLengthError,
    pincodelengtherror,
    setPincodeLengthError,
    adChecked,
    setinChecked,
  } = Contextdata();

  useEffect(() => {
    scrollUp();
    setClicked(false);
  }, []);

  const [addresserrorfield, setAddressErrorField] = useState("");

  const setInputValueHandler = (e) => {
    const nameRegex = /^[A-Za-z]*$/;
    const numberRegex = /^[0-9]*$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const { name, value } = e.target;

    let isValid = true;
    if (name === "city") {
      isValid = nameRegex.test(value);
    }
    if (name === "email") {
      setAddressError(true);
      const emailvalid =
        emailRegex.test(value) && EmailValidator.validate(value);
      if (emailvalid) {
        setAddressError(false);
      }
    }

    if (name === "phone" || name === "zipcode") {
      isValid = numberRegex.test(value);
      setPincodeLengthError(false);
    }
    if (name === "phone") {
      isValid = numberRegex.test(value);
      setAddressContactNumberLengthError(false);
    }
    if (isValid) {
      setAddressErrorField(false);
      setAddressInputvalues((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      if (name === "email") {
        setAddressErrorField(false);
        setAddressInputvalues((prevData) => ({
          ...prevData,
          [name]: value.toLowerCase(),
        }));
      }
    } else {
      setClicked(false);
      setAddressErrorField(name);
    }
  };

  const [checked, setChecked] = useState(false);

  if (!adChecked) {
    window.location.href = "/";
  }

  const handleChecked = (e) => {
    setChecked(e.target.checked);
    setinChecked(e.target.checked);
  };

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "0px" }}
      >
        <Customstepper active={2} />
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
            Address Details
          </Typography>
          <form>
            <TextField
              required
              id="standard-required"
              label="Street Name"
              variant="standard"
              fullWidth
              name="streetname"
              onChange={(e) => setInputValueHandler(e)}
              value={addressinputvalues.streetname}
              error={
                (clicked && !addressinputvalues.streetname) ||
                addresserrorfield === "streetname"
              } // Convert the error message to a boolean for Material-UI
              helperText={
                addresserrorfield === "streetname"
                  ? "Enter alphabets only"
                  : clicked && !addressinputvalues.streetname
                    ? "This field is required"
                    : ""
              }
              inputProps={{
                maxLength: 50, // Set the maximum length here
              }}
            />

            <TextField
              required
              id="standard-required"
              label="City"
              variant="standard"
              fullWidth
              name="city"
              onChange={setInputValueHandler}
              value={addressinputvalues.city}
              error={
                (clicked && !addressinputvalues.city) ||
                addresserrorfield === "city"
              } // Convert the error message to a boolean for Material-UI
              helperText={
                addresserrorfield === "city"
                  ? "Enter alphabets only"
                  : clicked && !addressinputvalues.city
                    ? "This field is required"
                    : ""
              }
              inputProps={{
                maxLength: 50, // Set the maximum length here
              }}
            />
            <FormControl fullWidth required variant="standard">
              <InputLabel htmlFor="state">State</InputLabel>
              <Select
                name="state"
                id="state"
                required
                value={addressinputvalues.state}
                onChange={(e) => setInputValueHandler(e)}
                error={clicked && !addressinputvalues.state}
              >
                {state.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {clicked && !addressinputvalues.state && (
                <span className="error">This field is required</span>
              )}
            </FormControl>
            <TextField
              required
              type="tel"
              id="standard-required"
              label="Zipcode"
              variant="standard"
              fullWidth
              name="zipcode"
              onChange={setInputValueHandler}
              value={addressinputvalues.zipcode}
              error={
                (clicked && !addressinputvalues.zipcode) ||
                addresserrorfield === "zipcode" ||
                (clicked && addressinputvalues.zipcode.length < 5) ||
                (clicked && pincodelengtherror)
              } // Convert the error message to a boolean for Material-UI
              helperText={
                addresserrorfield === "zipcode"
                  ? "Enter Numbers only"
                  : clicked && !addressinputvalues.zipcode
                    ? "This field is required"
                    : clicked && addressinputvalues.zipcode.length < 5
                      ? "Enter 5 digit zipcode"
                      : clicked && pincodelengtherror
                        ? "Enter 5 digit Zipcode"
                        : ""
              }
              inputProps={{
                maxLength: 5, // Set the maximum length here
              }}
            />
            <TextField
              required
              id="standard-required"
              label="Email"
              type="email"
              variant="standard"
              fullWidth
              name="email"
              onChange={setInputValueHandler}
              value={addressinputvalues.email}
              error={
                (clicked && !addressinputvalues.email) || addressemailerror
              } // Convert the error message to a boolean for Material-UI
              helperText={
                addressemailerror
                  ? "Enter Valid Email"
                  : clicked && !addressinputvalues.email
                    ? "This field is required"
                    : ""
              }
            />
            <TextField
              required
              id="standard-required"
              type="tel"
              label="Phone Number"
              variant="standard"
              fullWidth
              name="phone"
              onChange={(e) => setInputValueHandler(e)}
              value={addressinputvalues.phone}
              error={
                (clicked && !addressinputvalues.phone) ||
                addresserrorfield === "phone" ||
                (clicked && addressinputvalues.phone.length < 10) ||
                (clicked && addresscontactnumberlengtherror)
              } // Convert the error message to a boolean for Material-UI
              helperText={
                addresserrorfield === "phone"
                  ? "Enter Numbers only"
                  : clicked && !addressinputvalues.phone
                    ? "This field is required"
                    : clicked && addressinputvalues.phone.length < 10
                      ? "Phone Number is invalid"
                      : clicked && addresscontactnumberlengtherror
                        ? "Number is invalid"
                        : ""
              }
              inputProps={{
                maxLength: 10, // Set the maximum length here
              }}
            />
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
              linknxt="/insurance"
              linkbck="/personaldetails"
              checked={checked}
            />
          </form>
        </div>
      </div>
    </>
  );
}
