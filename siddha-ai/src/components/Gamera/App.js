import logo from "./logo.svg";
import "./App.css";

import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { Camera } from "./camera";
import { Root, Preview, Footer, GlobalStyle } from "./styles";
import { Contextdata } from "../../context/Context";
import { Button } from "./camera/styles";

function Gamera() {
  const { setCapturedImage, setCameraDialog, setFile, capturedImage } =
    Contextdata();
  const [isCameraOpen, setIsCameraOpen] = useState(true);
  const [cardImage, setCardImage] = useState();

  const capture = (blob) => {
    const img = URL.createObjectURL(blob);
    setCapturedImage(img);

    setCardImage(blob);
    // Set the File object using setFile
    const imageFile = new File([blob], "captured-image.jpg", {
      type: "image/jpeg",
    });

    alert("size " + imageFile.size);
    setFile(imageFile);
  };

  return (
    <Fragment>
      <Root>
        {isCameraOpen && (
          <Camera
            onCapture={(blob) => {
              setCardImage(blob);
              capture(blob);
              setIsCameraOpen(false);
            }}
            onClear={() => setCardImage(undefined)}
          />
        )}
        {!isCameraOpen && (
          <div>
            {capturedImage ? (
              <img className="image" src={capturedImage} alt="capturedImage" />
            ) : (
              " "
            )}

            <Button onClick={() => setCameraDialog(false)}>Confirm</Button>
          </div>
        )}
      </Root>
      <GlobalStyle />
    </Fragment>
  );
}

export default Gamera;
