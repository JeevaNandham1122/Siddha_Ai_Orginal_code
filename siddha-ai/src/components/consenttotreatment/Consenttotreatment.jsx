import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/navbar/Navbar";
import Footer from "../../Layouts/footer/Footer";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import ClearIcon from "@mui/icons-material/Clear";
import Signaturepad from "../../Layouts/signaturepad/Signaturepad";
import { Contextdata } from "../../context/Context";
import Custombtn from "../../Layouts/custombtn/Custombtn";
import { Checkbox } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack } from "@mui/material";
import { display } from "@mui/system";
import SimpleDialog from "../../Layouts/dialog/Dialog";
import { scrollUp } from "../../Layouts/backtotop/Backtotop";
import dayjs from "dayjs";

export default function Consenttotreatment() {
  const {
    personaldetailsvalues,
    url,
    hasSigned,
    handleInsertImage,
    consentChecked,
    setconfirmChecked,
  } = Contextdata();

  useEffect(() => {
    scrollUp();
  }, []);

  const [checked, setChecked] = useState(false);
  const [signaturedialog, setSignaturedialog] = useState(false);

  if (!consentChecked) {
    window.location.href = "/";
  }
  const handleChecked = (e) => {
    setChecked(!checked);
    setconfirmChecked(e.target.checked);
  };
  const handlesignaturedialogOpen = () => {
    setSignaturedialog(true);
  };

  const handlesignaturedialogClose = () => {
    setSignaturedialog(false);
  };

  useEffect(() => {
    // Check if the user hasn't signed and the dialog is closed
    if (!url && !signaturedialog) {
      setChecked(false);
    }
  }, [hasSigned, signaturedialog]);

  useEffect(() => {
    if (checked) {
      handlesignaturedialogOpen();
    }
  }, [checked]);

  return (
    <>
      <div className="privacy-container" style={{ margin: "3.3rem 8%" }}>
        <div className="">
          <center>
            <h1>CONSENT TO TREATMENT</h1>
          </center>
          <br />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <b>
              <p>
                Patient Name: {personaldetailsvalues.firstname}{" "}
                {personaldetailsvalues.lastname}
              </p>
            </b>
            <b>
              <p>
                Date of Birth:{" "}
                {new dayjs(personaldetailsvalues.dob)
                  .format("MM/DD/YYYY")
                  .toString()}
              </p>
            </b>
          </Box>
          <br />

          <p>
            On behalf of myself or other patient named above, CONSENT TO TREAT I
            hereby give my permission to ORTHOPAEDIC SPINE INSTITUTE (referred
            to as “OSI” in this form) for the evaluation and treatment of the
            presented medical condition (herein referred to as “health care
            services”). I am requesting that health care services be provided to
            me (or the patient named above) at OSI. I voluntarily consent to all
            treatment and health care services that the caregivers at OSI
            consider to be necessary for me (or the patient named above). These
            services may include diagnostic, therapeutic, and imaging services
          </p>
          <br />
          <p>
            On behalf of myself or other patient named above, CONSENT TO TREAT I
            hereby give my permission to ORTHOPAEDIC SPINE INSTITUTE (referred
            to as “OSI” in this form) for the evaluation and treatment of the
            presented medical condition (herein referred to as “health care
            services”). I am requesting that health care services be provided to
            me (or the patient named above) at OSI. I voluntarily consent to all
            treatment and health care services that the caregivers at OSI
            consider to be necessary for me (or the patient named above). These
            services may include diagnostic, therapeutic, and imaging services
          </p>
          <br />
          <p>
            FINANCIAL RESPONSIBILITY Subject to applicable law and the terms and
            conditions of any applicable contract between OSI and a third-party
            payer, and in consideration of all health care services rendered or
            about to be rendered to me (or the above-named patient), I agree to
            be financially responsible and obligated to pay OSI for any balance
            not paid under the “Assignment of Benefits” paragraph below. Subject
            to applicable law, and in consideration of all health care services
            rendered or about to be rendered to me (or the abovenamed patient),
            I agree to be financially responsible and obligated to pay OSI for
            the patient balances due.
          </p>
          <br />
          <p>
            ASSIGNMENT OF BENEFIT In consideration of all health care services
            rendered or about to be rendered to me (or the above-named patient),
            I hereby assign to OSI all right, title, and interest in and to any
            third-party benefits due from any and all insurance policies and/or
            responsible third-party payers of an amount not exceeding OSI’s
            regular and customary charges for the health care services rendered.
            I authorize such payments from applicable insurance carriers, third
            party payers, and other third-parties. A list of usual and customary
            charges is available upon request. I consent to any request for
            review or appeal by OSI to challenge a determination of benefits
            made by a third-party payer. Except as required by law, I assume
            responsibility for determining in advance whether the services
            provided are covered by insurance or other third-party payer. I
            understand that my current insurance must be on file with OSI for my
            insurance to be billed and as such I will be expected to present my
            insurance card at each visit to verify my insurance coverage. If I
            do not provide OSI with insurance information, I will be considered
            a self-pay patient and obligated to pay all fees associated with
            services rendered.{" "}
          </p>
          <br />
          <p>
            CONSENT TO RETRIEVE MEDICAL INFORMATION As a patient of OSI, I
            authorize OSI to retrieve and use my medication history from an
            electronic prescriptions network. This is an electronic method for
            OSI to access patient prescription benefit information and patient
            medication history. OSI can only retrieve medication history from
            pharmacies posting to the Illinois pharmacy monitoring program.
            Utilizing this method is the best way to obtain the most up to date
            information so that your healthcare provider can deliver the best
            care to you.
          </p>
          <br />
          <p>
            NOTICE OF PATIENT GUIDELINES: I understand that taking photographs
            and/or recording of any type is prohibited unless express permission
            is granted by OSI.{" "}
          </p>
          <br />
          <p>
            NOTICE OF PRIVACY PRACTICE: I have received a copy of the OSI Notice
            of Privacy Practices. The Notice of Privacy Practices explains how
            OSI may use and disclose confidential health information that
            identifies me (or the above-named patient). I consent to let OSI use
            and disclose health information about me (or the above-named
            patient) as described in the Notice of Privacy Practices. In doing
            so I consent to the release of my (or the abovenamed patient’s)
            health information and financial account information to all
            third-party payers and/or their agents that are identified by OSI,
            its billing agents, collection agents, attorneys, consultants,
            and/or other agents that represent OSI or provide assistance to OSI
            for the purposes of securing payment from all parties who are
            potentially liable for payment for my (or the above-named patient’s)
            health care. I can revoke my consent in writing at any time except
            to the extent that OSI has already relied on my consent. I consent
            to receive, on the cellular phone and/or other telephone number(s)
            that are provided to OSI or updated at a later time, text messages
            and/or telephone calls or other communications using live,
            artificial or pre-recorded voices, automatic telephone dialing
            systems, or any other computer-aided technologies from OSI and its
            affiliates, clinical providers, and business associates, along with
            any billing services, collection agencies, agents, or other third
            parties who may act on their behalf. Such text messages and/or
            telephone calls may be related to any purpose, including those
            related to my account and/or the care rendered. I understand this
            consent to communications is not required to receive services from
            OSI or any of the other authorized callers and that data usage and
            other charges may apply. I may revoke this consent to these
            communications at any time
          </p>
        </div>
      </div>

      {/* <Box sx={{ textAlign: "center" }}>
            <ColorButton2 onClick={()=>pdfviewHandler()}>
              view pdf
            </ColorButton2>
          </Box>  */}

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

      <Box sx={{ margin: "0 8%" }}>
        <Custombtn linkbck="/eula" linknxt="/confirm" checked={checked} />
      </Box>

      <Dialog
        open={signaturedialog}
        onClose={handlesignaturedialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        sx={{
          "& .css-22jxwj-MuiPaper-root-MuiDialog-paper": {
            margin: "5px",
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
            {"Signature Pad"}
            <ClearIcon onClick={handlesignaturedialogClose} />
          </DialogTitle>

          <Box
            sx={{
              display: "flex",
              columnGap: "1rem",
              padding: "8px 1px 1rem 2px",
              margin: { xs: "1.2rem 3px 1rem", sm: "1.2rem 25px 1rem" },
            }}
          >
            <Signaturepad
              dialogclose={handlesignaturedialogClose}
              checked={checked}
              setChecked={setChecked}
            />
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
