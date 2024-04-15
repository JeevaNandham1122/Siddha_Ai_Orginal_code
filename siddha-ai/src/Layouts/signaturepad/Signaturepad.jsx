import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Contextdata } from "../../context/Context";
import Box from "@mui/material/Box";

export default function Signaturepad(props) {
  const { setUrl, ColorButton2, setHasSigned } = Contextdata();

  const [sign, setSign] = useState();

  const handleClear = () => {
    sign.clear();
    setUrl("");
  };

  const handleGenerate = async () => {

    if (sign.isEmpty()) {
      // props.checked = false;
      props.setChecked(false);
      console.log("sign is isEmpty", props.checked);
    }

    const signimageurl = sign.getTrimmedCanvas().toDataURL("image/png");

    await setUrl(signimageurl);
    setHasSigned(true);
    props.dialogclose();
  };

  return (
    <>
      <div>
        <div
          style={{ border: "2px solid black", width: "100%", height: "auto" }}
        >
          <SignatureCanvas
            canvasProps={{ width: 300, height: 200, className: "sigCanvas" }}
            ref={(data) => setSign(data)}
          />
        </div>

        <br />
        <Box
          sx={{ display: "flex", justifyContent: "center", columnGap: "1rem" }}
        >
          <ColorButton2 onClick={handleClear}>Clear</ColorButton2>
          <ColorButton2 onClick={handleGenerate}>Confirm</ColorButton2>
        </Box>
      </div>
    </>
  );
}
