import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Tooltip } from "@mui/material";

export default function Customstepper(props) {
  const steps = ["Driver's License", "Personal Details", "Address Details", "Insurance", "Insurance Details", "Emergency Details", "Primary Care Physician"];

  return (
    <>
      <Stepper
        activeStep={props.active}
        sx={{ width: "580px", marginTop: "2.4rem" }}
      >
        {steps.map((label, index) => (
          
           <Step key={index}><Tooltip title={label} placement="top-start" arrow>
            <StepLabel>  </StepLabel>
            </Tooltip>
          </Step>
        ))}
      </Stepper>
    </>
  );
}
