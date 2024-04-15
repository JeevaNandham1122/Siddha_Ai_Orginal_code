import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Custombtn from "../../Layouts/custombtn/Custombtn";
import Customstepper from "../../Layouts/stepper/Stepper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack, TextFiel, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { scrollUp } from "../../Layouts/backtotop/Backtotop";
import { Contextdata } from "../../context/Context";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function Address() {
  const {
    contactValues,
    setContactValues,
    clicked,
    setClicked,
    setContactNumberError,
    contactnumbererror,
    contactlengtherror,
    setContactNumberLengthError,
    contacterrorfield,
    setContactErrorField,
    contactchecked,
    setreferralchecked,
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
      value: "Spouse",
      label: "Spouse",
    },
    {
      value: "Parent",
      label: "Parent",
    },
    {
      value: "Children",
      label: "Children",
    },
    {
      value: "Cousin",
      label: "Cousin",
    },
    {
      value: "Sibling",
      label: "Sibling",
    },
    {
      value: "Guardian",
      label: "Guardian",
    },
    {
      value: "Other(Neighbor, Friend..)",
      label: "Other(Neighbor, Friend..)",
    },
  ];

  const [checked, setChecked] = useState(false);
  const [contacterrorfield1, setcontacterrorfield1] = useState(null);
  const [contacterrorfield2, setcontacterrorfield2] = useState(null);

  if (!contactchecked) {
    window.location.href = "/";
  }

  const handleChecked = (e) => {
    setChecked(e.target.checked);
    setreferralchecked(e.target.checked);
  };

  const contactInputHandler = (e) => {
    const nameRegex = /^[A-Za-z]*$/;
    const numberRegex = /^[0-9]*$/;
    const { name, value } = e.target;
    let isValid = true;

    if (name === "contactnumber") {
      isValid = numberRegex.test(value);
      setContactNumberError(false);
      setContactNumberLengthError(false);
    }

    if (name === "lastname" || name === "firstname") {
      isValid = nameRegex.test(value);
    }

    if (isValid) {
      setContactErrorField(false);
      setcontacterrorfield1(false);
      setcontacterrorfield2(false);

      setContactValues((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setClicked(false);
      setContactErrorField(name);
    }
  };

  const validate = useCallback(() => {
    if (contactValues.firstname.length < 3) {
      setcontacterrorfield1("fnerr");
    } else {
      setcontacterrorfield1(null);
    }
    if (contactValues.lastname.length < 3) {
      setcontacterrorfield2("lnerr");
    } else {
      setcontacterrorfield2(null);
    }

    if (contacterrorfield1 || contacterrorfield2) {
      setContactErrorField("Name Error");
    } else {
      setContactErrorField(null);
    }
  }, [
    contactValues,
    contacterrorfield2,
    contacterrorfield1,
    setContactErrorField,
  ]);

  useEffect(() => {
    if (checked) {
      validate(contactValues);
    }
  }, [contactValues, checked, validate]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Customstepper active={5} />
      </Box>
      <Typography
        variant="p"
        marginTop="1.5rem"
        component="p"
        textAlign="center"
      >
        * 911 is not an option for Emergency Contact
      </Typography>

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
            Emergency Details
          </Typography>
          <form>
            <TextField
              required
              id="standard-required"
              label="First Name"
              variant="standard"
              fullWidth
              name="firstname"
              onChange={contactInputHandler}
              value={contactValues.firstname}
              error={
                (clicked && !contactValues.firstname) ||
                contacterrorfield === "firstname" ||
                (clicked && contacterrorfield === "fnerr") ||
                (clicked && contactValues.firstname.length < 3)
              } // Convert the error message to a boolean for Material-UI
              helperText={
                contacterrorfield === "firstname"
                  ? "Enter alphabets only"
                  : clicked && !contactValues.firstname
                    ? "This field is required"
                    : clicked && contactValues.firstname.length < 3
                      ? "Minimum 3 character required"
                      : ""
              }
              inputProps={{
                minLength: 3,
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
              onChange={contactInputHandler}
              value={contactValues.lastname}
              error={
                (clicked && !contactValues.lastname) ||
                contacterrorfield === "lastname" ||
                (clicked && contactValues.lastname.length < 3)
              } // Convert the error message to a boolean for Material-UI
              helperText={
                contacterrorfield === "lastname"
                  ? "Enter alphabets only"
                  : clicked && !contactValues.lastname
                    ? "This field is required"
                    : clicked && contactValues.lastname.length < 3
                      ? "Minimum 3 character required"
                      : ""
              }
              inputProps={{
                minLength: 3,
                maxLength: 30, // Set the maximum length here
              }}
            />

            <TextField
              required
              id="standard-required"
              label="Contact Number"
              variant="standard"
              type="tel"
              fullWidth
              name="contactnumber"
              onChange={(e) => contactInputHandler(e)}
              value={contactValues.contactnumber}
              error={
                (clicked && !contactValues.contactnumber) ||
                contacterrorfield === "contactnumber" ||
                contactnumbererror ||
                (clicked && contactlengtherror) ||
                (clicked && contactValues.contactnumber.length < 10)
              } // Convert the error message to a boolean for Material-UI
              helperText={
                contacterrorfield === "contactnumber"
                  ? "Enter Numbers only"
                  : clicked && !contactValues.contactnumber
                    ? "This field is required"
                    : contactnumbererror
                      ? "911 not allowed"
                      : clicked && contactlengtherror
                        ? "Phone number is invalid"
                        : clicked && contactValues.contactnumber.length < 10
                          ? "Phone number is invalid"
                          : ""
              }
              inputProps={{
                maxLength: 10, // Set the maximum length here
              }}
            />
            <FormControl fullWidth required variant="standard">
              <InputLabel htmlFor="relationship">Relationship</InputLabel>
              <Select
                name="relationship"
                id="relationship"
                required
                value={contactValues.relationship}
                onChange={(e) => contactInputHandler(e)}
                error={clicked && !contactValues.relationship}
              >
                {relationship.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {clicked && !contactValues.relationship && (
                <span className="error">This field is required</span>
              )}
            </FormControl>
            {/* <div className="formbold-input-flex">
              <div>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder=""
                  className="formbold-form-input"
                  required
                  onChange={(e) => contactInputHandler(e)}
                  value={contactValues.firstname}
                  minLength={3}
                  maxLength={30}
                />
                <label htmlFor="firstname" className="formbold-form-label">
                  {" "}
                  First Name *{" "}
                  {clicked && !contactValues.firstname && (
                    <span className="error">This field is required</span>
                  )}
                  {contacterrorfield === "firstname" && (
                    <span className="error">Enter alphabets only</span>
                  )}
                </label>
              </div>
            </div>

            <div className="formbold-input-flex">
              <div>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder=""
                  className="formbold-form-input"
                  onChange={(e) => contactInputHandler(e)}
                  value={contactValues.lastname}
                  minLength={3}
                  maxLength={30}
                />
                <label htmlFor="lastname" className="formbold-form-label">
                  {" "}
                  Last Name *{" "}
                  {clicked && !contactValues.lastname && (
                    <span className="error">This field is required</span>
                  )}
                  {contacterrorfield === "lastname" && (
                    <span className="error">Enter alphabets only</span>
                  )}
                </label>
              </div>
            </div>

            <div className="formbold-input-flex">
              <div>
                <input
                  type="text"
                  name="contactnumber"
                  id="contactnumber"
                  placeholder=""
                  className="formbold-form-input"
                  onChange={(e) => contactInputHandler(e)}
                  value={contactValues.contactnumber}
                  maxLength={10}
                />
                <label htmlFor="contactnumber" className="formbold-form-label">
                  {" "}
                  Contact Number *{" "}
                  {clicked && !contactValues.contactnumber && (
                    <span className="error">This field is required</span>
                  )}
                  {contacterrorfield === "contactnumber" && (
                    <span className="error">Enter numbers only</span>
                  )}
                  {contactnumbererror && (
                    <span className="error">911 not allowed</span>
                  )}
                  {clicked && contactlengtherror && (
                    <span className="error">Phone number is invalid</span>
                  )}
                </label>
              </div>
            </div>

            <div className="formbold-input-flex">
              <div>
                <select
                  type="text"
                  name="relationship"
                  id="relationship"
                  placeholder=""
                  className="formbold-form-input"
                  onChange={(e) => contactInputHandler(e)}
                  value={contactValues.relationship}
                >
                  {relationship.map((option, index) =>
                    index === 0 ? (
                      <option key={index} hidden value></option>
                    ) : (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    )
                  )}
                </select>
                <label htmlFor="relationship" className="formbold-form-label">
                  {" "}
                  Relationship *{" "}
                  {clicked && !contactValues.relationship && (
                    <span className="error">This field is required</span>
                  )}{" "}
                </label>
              </div>
            </div> */}

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
              linknxt="/referral"
              linkbck="/verify"
              checked={checked}
            />
          </form>
        </div>
      </div>
    </>
  );
}
