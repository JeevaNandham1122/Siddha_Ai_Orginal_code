import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Checkbox } from "@mui/material";
import Customstepper from "../../Layouts/stepper/Stepper";
import { scrollUp } from "../../Layouts/backtotop/Backtotop";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import { Contextdata } from "../../context/Context";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import Loading from "../../Layouts/backdrop/Backdrop";
import Errordialog from "../../Layouts/errordialog/Errordialog";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack } from "@mui/material";
import SimpleDialog from "../../Layouts/dialog/Dialog";

export default function Confirm() {
  const navigate = useNavigate();

  const {
    setOpen,
    personaldetailsvalues,
    addressinputvalues,
    insurancechecked,
    insuranceDetails,
    contactValues,
    refferalchecked,
    referralValues,
    ColorButton2,
    pdfDataUri,
    pdfDataUri2,
    senddata,
    pdferror,
    apierror,
    confirmChecked,
    handleInsertImage,
  } = Contextdata();

  useEffect(() => {
    handleInsertImage(); 
    scrollUp();
  }, []);

  const textstyle = {
    color: "rgba(4,136,185,1)",
    wordWrap: "break-word",
    flexWrap: "wrap",
    fontSize: { xs: "16px", sm: "23px", md: "24px" },
    cursor: "pointer",
    paddingRight: "1rem",
  };

  if (!confirmChecked) {
    window.location.href = "/";
  }
  const keytextstyle = {
    wordWrap: "break-word",
    flexWrap: "wrap",
    fontSize: { xs: "16px", sm: "23px", md: "24px" },
  };

  const textstyleterms = {
    color: "rgba(4,136,185,1)",
    wordWrap: "break-word",
    cursor: "pointer",
    textDecoration: "underline",
  };

  const [checked, setChecked] = useState(false);

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

  const [privacypracticesdialog, setprivacypracticesdialog] = useState(false);

  const handleprivacypracticesdialogClose = () => {
    setprivacypracticesdialog(false);
  };

  const handleprivacypracticesdialogOpen = () => {
    setprivacypracticesdialog(true);
  };

  const [consenttotreatmentdialog, setconsenttotreatmentdialog] =
    useState(false);

  const handleconsenttotreatdialogClose = () => {
    setconsenttotreatmentdialog(false);
  };

  const handleconsenttotreatdialogOpen = () => {
    setconsenttotreatmentdialog(true);
  };

  const submitHandler = () => {
    if (checked) {
      setOpen(false);
      senddata();
    } else {
      setOpen(true);
    }
  };

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // useEffect(() => {
  //   checked && handleClickOpen();
  // }, [checked]);

  const DOB = new Date(personaldetailsvalues.dob);

  const year = DOB.getFullYear();
  const month = String(DOB.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with '0' if needed
  const day = String(DOB.getDate()).padStart(2, "0"); // Pad with '0' if needed

  const formattedDate = `${year}-${month}-${day}`;

  const subscriberdob = new Date(insuranceDetails.subscriberdob);

  const subscriberdobyear = subscriberdob.getFullYear();
  const subscriberdobmonth = String(subscriberdob.getMonth() + 1).padStart(
    2,
    "0",
  ); // Month is zero-based, so add 1 and pad with '0' if needed
  const subscriberdobday = String(subscriberdob.getDate()).padStart(2, "0"); // Pad with '0' if needed

  const subscriberdob_formattedDate = `${subscriberdobyear}-${subscriberdobmonth}-${subscriberdobday}`;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Customstepper active={7} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Box
          sx={{
            border: "2px solid grey",
            borderRadius: "15px",
            width: { xs: "95%", sm: "80%", md: "60%" },
          }}
        >
          <Typography
            variant="h4"
            fontSize={{ xs: "30px", sm: "35px", md: "38px" }}
            margin="1rem 0 1rem"
            color="#0488B9"
            fontWeight="bold"
            component="h1"
            textAlign="center"
          >
            Personal Details
            <CreateIcon
              sx={{ marginLeft: "1rem", cursor: "pointer" }}
              onClick={() => navigate("/personaldetails")}
            />
          </Typography>

          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              margin: {
                xs: "14px 10px 10px 10px",
                sm: "14px 10px 10px 10px",
                md: "14px 2rem 20px 20px",
              },
            }}
          >
            <Grid item xs={6} marginTop="1rem">
              <Typography
                variant="p"
                sx={keytextstyle}
                fontSize="1.5rem"
                component="p"
              >
                First Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {personaldetailsvalues && personaldetailsvalues.firstname}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Middle Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {personaldetailsvalues && personaldetailsvalues.middlename}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Last Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {personaldetailsvalues && personaldetailsvalues.lastname}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Date of Birth
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {personaldetailsvalues && DOB ? formattedDate : ""}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Gender
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {personaldetailsvalues && personaldetailsvalues.gender}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Prefered Language
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {personaldetailsvalues &&
                  personaldetailsvalues.preferredlanguage}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Box
          sx={{
            border: "2px solid grey",
            borderRadius: "15px",
            width: { xs: "95%", sm: "80%", md: "60%" },
          }}
        >
          <Typography
            variant="h4"
            fontSize={{ xs: "30px", sm: "35px", md: "38px" }}
            margin="1rem 0 1rem"
            color="#0488B9"
            fontWeight="bold"
            component="h1"
            textAlign="center"
          >
            Address Details
            <CreateIcon
              sx={{ marginLeft: "1rem", cursor: "pointer" }}
              onClick={() => navigate("/address")}
            />
          </Typography>
          <Grid
            container
            // rowSpacing={1}
            // columnSpacing={5}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              margin: {
                xs: "14px 10px 10px 10px",
                sm: "14px 10px 10px 10px",
                md: "14px 2rem 20px 20px",
              },
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Street Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {addressinputvalues && addressinputvalues.streetname}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                City
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {addressinputvalues && addressinputvalues.city}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                State
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {addressinputvalues && addressinputvalues.state}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Zipcode
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {addressinputvalues && addressinputvalues.zipcode}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Email Address
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {addressinputvalues && addressinputvalues.email}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Phone Number
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {addressinputvalues &&
                  addressinputvalues.phone.replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    "+1 ($1) $2-$3",
                  )}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Box
          sx={{
            border: "2px solid grey",
            borderRadius: "15px",
            width: { xs: "95%", sm: "80%", md: "60%" },
          }}
        >
          <Typography
            variant="h4"
            fontSize={{ xs: "30px", sm: "35px", md: "38px" }}
            margin="1rem 0 1rem"
            color="#0488B9"
            fontWeight="bold"
            component="h1"
            textAlign="center"
          >
            Insurance Details
            <CreateIcon
              sx={{ marginLeft: "1rem", cursor: "pointer" }}
              onClick={() => navigate("/verify")}
            />
          </Typography>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              margin: {
                xs: "14px 10px 10px 10px",
                sm: "14px 10px 10px 10px",
                md: "14px 2rem 20px 20px",
              },
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Group Number
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {insuranceDetails && insuranceDetails.groupnumber}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Member ID
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {insuranceDetails && insuranceDetails.memberid}
              </Typography>
            </Grid>

            {!insurancechecked && (
              <>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={keytextstyle}
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    component="p"
                  >
                    Subscriber First Name
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    sx={textstyle}
                    component="p"
                  >
                    {insuranceDetails && insuranceDetails.subscriberfirstname}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={keytextstyle}
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    component="p"
                  >
                    Subscriber Last Name
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    sx={textstyle}
                    component="p"
                  >
                    {insuranceDetails && insuranceDetails.subscriberlastname}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={keytextstyle}
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    component="p"
                  >
                    Subscriber DOB
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    sx={textstyle}
                    component="p"
                  >
                    {insuranceDetails && subscriberdob
                      ? subscriberdob_formattedDate
                      : ""}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={keytextstyle}
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    component="p"
                  >
                    Subscriber Relationship to patient
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    sx={textstyle}
                    component="p"
                  >
                    {insuranceDetails &&
                      insuranceDetails.SubscriberRelationshiptoPatient}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Box
          sx={{
            border: "2px solid grey",
            borderRadius: "15px",
            width: { xs: "95%", sm: "80%", md: "60%" },
          }}
        >
          <Typography
            variant="h4"
            fontSize={{ xs: "30px", sm: "35px", md: "38px" }}
            margin="1rem 0 1rem"
            color="#0488B9"
            fontWeight="bold"
            component="h1"
            textAlign="center"
          >
            Emergency Contact
            <CreateIcon
              sx={{ marginLeft: "1rem", cursor: "pointer" }}
              onClick={() => navigate("/contact")}
            />
          </Typography>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              margin: {
                xs: "14px 10px 10px 10px",
                sm: "14px 10px 10px 10px",
                md: "14px 2rem 20px 20px",
              },
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                First Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {contactValues && contactValues.firstname}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Last Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {contactValues && contactValues.lastname}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Phone Number
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {contactValues &&
                  contactValues.contactnumber.replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    "+1 ($1) $2-$3",
                  )}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="p"
                sx={keytextstyle}
                marginTop="1.5rem"
                fontSize="1.5rem"
                component="p"
              >
                Relationship
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="p"
                marginTop="1.5rem"
                fontSize="1.5rem"
                sx={textstyle}
                component="p"
              >
                {contactValues && contactValues.relationship}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Box
          sx={{
            border: "2px solid grey",
            borderRadius: "15px",
            width: { xs: "95%", sm: "80%", md: "60%" },
          }}
        >
          <Typography
            variant="h4"
            fontSize={{ xs: "30px", sm: "35px", md: "38px" }}
            margin="1rem 0 1rem"
            color="#0488B9"
            fontWeight="bold"
            component="h1"
            textAlign="center"
          >
            Referral Details
            <CreateIcon
              sx={{ marginLeft: "1rem", cursor: "pointer" }}
              onClick={() => navigate("/referral")}
            />
          </Typography>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              margin: {
                xs: "14px 10px 10px 10px",
                sm: "14px 10px 10px 10px",
                md: "14px 2rem 20px 20px",
              },
            }}
          >
            {refferalchecked ? (
              <>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={keytextstyle}
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    component="p"
                  >
                    Other Referral Name
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    sx={textstyle}
                    component="p"
                  >
                    {referralValues && referralValues.ReferralName}
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={keytextstyle}
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    component="p"
                  >
                    Primary Care Doctor First Name
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    sx={textstyle}
                    component="p"
                  >
                    {referralValues &&
                      referralValues.PrimaryCareDoctorFirstName}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={keytextstyle}
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    component="p"
                  >
                    Primary Care Doctor Last Name
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    sx={textstyle}
                    component="p"
                  >
                    {referralValues && referralValues.PrimaryCareDoctorLastName}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={keytextstyle}
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    component="p"
                  >
                    Primary Care Phone Number
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    sx={textstyle}
                    component="p"
                  >
                    {referralValues &&
                      referralValues.PrimaryCarePhoneNumber.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        "+1 ($1) $2-$3",
                      )}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={keytextstyle}
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    component="p"
                  >
                    Primary Care Fax Number
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    sx={textstyle}
                    component="p"
                  >
                    {referralValues &&
                      referralValues.PrimaryCareFaxNumber.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        "+1 ($1) $2-$3",
                      )}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Box
          sx={{
            border: "2px solid grey",
            borderRadius: "15px",
            width: { xs: "95%", sm: "80%", md: "60%" },
          }}
        >
          <Typography
            variant="h4"
            fontSize={{ xs: "30px", sm: "35px", md: "38px" }}
            margin="1rem 0 1rem"
            color="#0488B9"
            fontWeight="bold"
            component="h1"
            textAlign="center"
          >
            Attachments
            {/* <CreateIcon
                  sx={{ marginLeft: "1rem", cursor: "pointer" }}
                  onClick={() => navigate("/referral")}
                /> */}
          </Typography>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              margin: {
                xs: "14px 10px 10px 10px",
                sm: "14px 10px 10px 10px",
                md: "14px 2rem 20px 20px",
              },
            }}
          >
            <>
              <Grid item xs={6}>
                <Typography
                  variant="p"
                  sx={keytextstyle}
                  marginTop="1.5rem"
                  fontSize="1.5rem"
                  component="p"
                >
                  Notice of Privacy Practices
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {/* <Typography
                  variant="p"
                  marginTop="1.5rem"
                  fontSize="1.5rem"
                  sx={textstyle}
                  component="p"
                  onClick={handleprivacypracticesdialogOpen}
                >
                  View PDF
                </Typography> */}
                <a href={pdfDataUri} download="Privacy_Practices.pdf">
                  {" "}
                  <Typography
                    variant="p"
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    sx={textstyle}
                    component="p"
                  >
                    View PDF
                  </Typography>
                </a>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="p"
                  sx={keytextstyle}
                  marginTop="1.5rem"
                  fontSize="1.5rem"
                  component="p"
                >
                  Consent to Treatment
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {/* <Typography
                  variant="p"
                  marginTop="1.5rem"
                  fontSize="1.5rem"
                  sx={textstyle}
                  component="p"
                  onClick={handleconsenttotreatdialogOpen}
                >
                  View PDF
                </Typography> */}

                <a href={pdfDataUri2} download="Consent_to_treatment.pdf">
                  {" "}
                  <Typography
                    variant="p"
                    marginTop="1.5rem"
                    fontSize="1.5rem"
                    sx={textstyle}
                    component="p"
                  >
                    View PDF
                  </Typography>
                </a>
              </Grid>
            </>
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "3rem",
            marginLeft: { xs: "12px" },
            userSelect: "none",
          }}
        >
          <FormGroup sx={{ textAlign: "left" }}>
            <FormControlLabel
              control={
                <Checkbox checked={checked} onClick={(e) => handleChecked(e)} />
              }
              label="I agree to the Terms and Conditions"
            />
          </FormGroup>
        </Stack>
      </Box>
      {/* <p>{pdferror}</p> */}

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <ColorButton2
          variant="text"
          endIcon={<ArrowRightAltOutlinedIcon />}
          onClick={submitHandler}
        >
          Submit
        </ColorButton2>
      </Box>

      <Dialog
        open={privacypracticesdialog}
        onClose={handleprivacypracticesdialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        sx={{
          "& .css-22jxwj-MuiPaper-root-MuiDialog-paper": {
            margin: "4px",
          },
        }}
      >
        <Box sx={{ backgroundColor: "#F7F5FB" }}>
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
              borderBottom: "1px solid #CBCACA",
            }}
          >
            {"View Pad"}
            <ClearIcon onClick={handleprivacypracticesdialogClose} />
          </DialogTitle>

          {pdfDataUri ? (
            <Box>
              {/* <button onClick={()=>{ setPdfDataUri(""); setUrl("")  }  }>Clear PDF</button> */}
              <iframe src={pdfDataUri} width="800" height="500"></iframe>
            </Box>
          ) : (
            <Box sx={{ margin: "2rem" }}>
              <p>No Preview available</p>
              <p>{pdferror.toString()}</p>
            </Box>
          )}
        </Box>
      </Dialog>

      <Dialog
        open={consenttotreatmentdialog}
        onClose={handleconsenttotreatdialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <Box sx={{ backgroundColor: "#F7F5FB" }}>
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
              borderBottom: "1px solid #CBCACA",
            }}
          >
            {"View Pad"}
            <ClearIcon onClick={handleconsenttotreatdialogClose} />
          </DialogTitle>

          {pdfDataUri2 ? (
            <Box>
              {/* <button onClick={()=>{ setPdfDataUri(""); setUrl("")  }  }>Clear PDF</button> */}
              {/* <iframe src={pdfDataUri2} width="800" height="500"></iframe> */}
              <a
                href={pdfDataUri2}
                download="Consent_to_treatment.pdf"
                className="download-button"
              >
                Download
              </a>
            </Box>
          ) : (
            <Box sx={{ margin: "2rem" }}>
              <p>No Preview available</p>
            </Box>
          )}
        </Box>
      </Dialog>

      <SimpleDialog />
      <Loading />

      <Errordialog />
    </>
  );
}
