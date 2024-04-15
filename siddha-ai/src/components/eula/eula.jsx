import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox } from "@mui/material";
import { scrollUp } from "../../Layouts/backtotop/Backtotop";
import Custombtn from "../../Layouts/custombtn/Custombtn";
import { Contextdata } from "../../context/Context";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack } from "@mui/material";

export default function Eula() {
  const { privacychecked, setconsentChecked } = Contextdata();
  useEffect(() => {
    scrollUp();
  }, []);

  const textstyleterms = {
    color: "rgba(4,136,185,1)",
    wordWrap: "break-word",
    cursor: "pointer",
    textDecoration: "underline",
  };

  const [checked, setChecked] = useState(false);

  if (!privacychecked) {
    window.location.href = "/";
  }
  const handleChecked = (e) => {
    setChecked(e.target.checked);
    setconsentChecked(e.target.checked);
  };

  return (
    <>
      <div className="privacy-container" style={{ margin: "3.3rem 8%" }}>
        <div className="">
          <center>
            <h1>End User License Agreement</h1>
          </center>
          <br />
          <p>
            PLEASE READ THIS END USER LICENSE AGREEMENT (“EULA”) CAREFULLY. YOUR
            MEDICAL PROVIDER HAS BEEN GRANTED A LICENSE BY SIDHHA AI, INC.
            (&quot;SAI&quot;) TO USE THE [INSERT NAME OF Service] (THE
            &quot;SERVICE&quot;) TO REGISTER PATIENTS FOR A MEDICAL VISIT. SAI
            IS WILLING TO GRANT EACH PATIENT ACCESS TO THE SERVICE, BUT ONLY
            UPON HIS/HER ACCEPTANCE OF THIS EULA. BY CLICKING ON THE &quot;I
            AGREE&quot; BUTTON, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS EULA,
            UNDERSTAND IT AND AGREE TO BE BOUND BY IT. IF YOU DO NOT AGREE TO BE
            BOUND THIS EULA YOU WILL NOT OBTAIN ACCESS TO THE SERVICE.
          </p>
          <br />

          <p>
            1. License Grant. SAI grants to you a non-exclusive,
            non-transferable limited right, pursuant to the terms hereof, to
            access and use the SERVICE solely for the purpose of registering for
            your medical visit. You do not receive any, and SAI retains all,
            ownership rights in the SERVICE. SAI reserves all rights in the
            SERVICE not expressly granted to you in this EULA.
          </p>
          <br />

          <p>
            2. Your Data. You acknowledge that SAI does not collect, host or
            store any data you provide through the Service. All data you provide
            through the Service is transmitted directly to your medical
            provider. All use of your data is governed by your medical
            provider’s privacy policy and any other medical provider policy.
          </p>
          <br />

          <p>
            3. Disclaimer of Warranties. TO THE MAXIMUM EXTENT PERMITTED BY
            APPLICABLE LAW, THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT
            ANY WARRANTY OF ANY KIND, AND SAI DISCLAIMS ALL WARRANTIES, EXPRESS
            OR IMPLIED, INCLUDING WITHOUT LIMITATION, ANY IMPLIED WARRANTIES AS
            TO QUALITY, PERFORMANCE, TITLE, NONINFRINGEMENT, MERCHANTABILITY OR
            FITNESS FOR A PARTICULAR PURPOSE. YOUR USE OF THE SERVICE UNDER THIS
            EULA IS SOLELY AT YOUR OWN RISK.
          </p>
          <br />

          <p>
            4. Limitation of Liability. NOTWITHSTANDING ANYTHING ELSE IN THIS
            EULA OR OTHERWISE, TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE
            LAW, SAI WILL NOT BE LIABLE TO YOU OR TO ANY THIRD PARTY FOR ANY
            SPECIAL, INDIRECT, INCIDENTAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES OF
            ANY KIND ARISING OUT OF THE SERVICE OR THIS EULA, EVEN IF ADVISED OF
            OR COULD HAVE FORESEEN THE POSSIBILITY OF SUCH DAMAGES. SOME
            JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL
            OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION MAY NOT APPLY TO
            YOU. IN NO EVENT WILL SAI HAVE ANY LIABILITY TO YOU OR ANY THIRD
            PARTY WHICH IN THE AGGREGATE IS MORE THAN US$100.
          </p>
          <br />

          <p>
            5. General. The laws of the State of Illinois will govern this EULA,
            without reference to its conflicts of law principles. The parties
            hereby submit to the jurisdiction of, and waive any venue objections
            against, the State and Federal courts located in Chicago, Illinois.
            If any provision of this EULA is held to be unenforceable, that
            provision will be removed and the remaining provisions will remain
            in full force. The failure of either party to require performance by
            the other party of any provision hereof will not affect the full
            right to require such performance at any time thereafter; nor will
            the waiver by either party of a breach of any provision hereof be
            taken or held to be a waiver of the provision itself. This EULA is
            the entire and exclusive agreement between you and SAI with respect
            to the subject matter hereof.
          </p>
          <br />

        </div>
      </div>

      {/* <Box sx={{textAlign: 'center'}} >
          <ColorButton2 onClick={handlesignaturedialogOpen}  >Signature</ColorButton2>
            
          </Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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

      <Box sx={{ margin: "0 8%" }}>
        <Custombtn
          linkbck="/privacypractices"
          linknxt="/consenttotreatment"
          checked={checked}
        />
      </Box>
    </>
  );
}
