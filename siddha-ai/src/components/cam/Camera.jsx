import React, { useState, useContext } from "react";
import Webcam from "react-webcam";
import "./Cam.css";
import { Contextdata } from "../../context/Context";
import { Root, GlobalStyle } from "../Gamera/styles";
import { Container, Overlay } from "./styles";
import { Alert } from "@mui/material";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: window.innerWidth + 80,
  height: window.innerHeight,
  facingMode: "environment",
};

const WebCam = (props) => {
  const {
    setlicensebackbinarydata,
    cameradialog,
    capturedImage,
    setCapturedImage,
    setCameraDialog,
    insurancefrontcapturedimage,
    setInsuranceFrontCapturedImage,
    setinsuranceFrontDialog,
    setinsuranceBackDialog,
    setLicenseBackDialog,
    setLicenseImageBinaryData,
    setInsuranceFrontBinaryData,
    setInsuranceBackBinaryData,
    licensebackcapturedimage,
    setLicenseBackCapturedImage,
    insurancefrontbinarydata,
    insurancebackbinarydata,
    insurancebackcapturedimage,
    setInsuranceBackCapturedImage,
    setFile,
    ColorButton2,
  } = Contextdata();

  const [showFlash, setShowFlash] = useState(false);
  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const canvasRef2 = React.useRef(null);
  const [capImage, setcapImage] = useState("");
  let imageSrc;
  const capture = () => {
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    if (canvas === null) {
      setCameraDialog(false);
      return;
    }
    const ctx = canvas.getContext("2d");
    console.log(ctx);
    // Set canvas dimensions to be larger than the webcam feed
    // const desiredWidth = video.videoWidth * 1.8; // Adjust this value to your desired width
    // const desiredHeight = video.videoHeight * 1.8; // Adjust this value to your desired height
    const desiredWidth = video.videoWidth; // Adjust this value to your desired width
    const desiredHeight = video.videoHeight; // Adjust this value to your desired height
    // const desiredWidth = 600; // Adjust this value to your desired width
    // const desiredHeight = 480; // Adjust this value to your desired height
    // Set canvas dimensions to match the webcam feed
    canvas.width = desiredWidth;
    canvas.height = desiredHeight;

    // Apply anti-aliasing for improved image quality
    ctx.imageSmoothingEnabled = true;
    // ctx.imageSmoothingQuality = "high";

    // Draw the webcam feed onto the canvas
    ctx.drawImage(
      video,
      0,
      0,
      video.videoWidth,
      video.videoHeight,
      0,
      0,
      desiredWidth,
      desiredHeight,
    );

    // alert(canvas.width + "w:h" + canvas.height);

    setShowFlash(true);
    setTimeout(() => {
      setShowFlash(false);
    }, 2000);

    // Capture the canvas as an image
    imageSrc = canvas.toDataURL("image/jpeg", 1.0); // Quality at 1.0 (max)

    setcapImage(imageSrc);
    if (props.path === "index") {
      // makeGray();
      // canvasRef.current.toBlob((blob) => setPicture(blob), "image/jpeg", 0.3);
      canvasRef.current.toBlob((blob) => setPicture(blob), "image/jpeg", 1.0);
    } else {
      canvasRef.current.toBlob((blob) => setPicture(blob), "image/jpeg", 1.0);
    }

    setImages();
  };
  const captures = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot({
      screenshotQuality: 1, // Highest quality
      screenshotFormat: "image/jpeg",
    });
    setPicture(pictureSrc);
    switch (props.path) {
      case "index":
        setCapturedImage(pictureSrc);
        break;
      case "insurance":
        if (props.type === "front") {
          setInsuranceFrontCapturedImage(pictureSrc);

          // Convert the image to binary data
          const reader = new FileReader();
          reader.onload = (event) => {
            const binaryData = event.target.result;

            // Store the binary data in the insurancebinary state
            setInsuranceFrontBinaryData(binaryData);
          };
          break;
        } else if (props.type === "back") {
          setInsuranceBackCapturedImage(pictureSrc);
          // Convert the image to binary data
          const reader = new FileReader();
          reader.onload = (event) => {
            const binaryData = event.target.result;

            // Store the binary data in the insurancebinary state
            setInsuranceBackBinaryData(binaryData);
          };
          break;
        } else {
          setLicenseBackCapturedImage(pictureSrc);
          // Convert the image to binary data
          const reader = new FileReader();
          reader.onload = (event) => {
            const binaryData = event.target.result;

            // Store the binary data in the insurancebinary state
            setlicensebackbinarydata(binaryData);
          };
        }
        break;
      default:
        alert("coming from camera.jsx default not matched any of the photos");
        break;
    }
  });

  // Function to convert base64 to Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  }

  const setImages = () => {
    switch (props.path) {
      case "index":
        setCapturedImage(imageSrc);
        break;
      case "insurance":
        if (props.type === "front") {
          setInsuranceFrontCapturedImage(imageSrc);

          // Convert the image to binary data
          const reader = new FileReader();
          reader.onload = (event) => {
            const binaryData = event.target.result;

            // Store the binary data in the insurancebinary state
            setInsuranceFrontBinaryData(binaryData);
          };
          break;
        } else if (props.type === "back") {
          setInsuranceBackCapturedImage(imageSrc);
          // Convert the image to binary data
          const reader = new FileReader();
          reader.onload = (event) => {
            const binaryData = event.target.result;

            // Store the binary data in the insurancebinary state
            setInsuranceBackBinaryData(binaryData);
          };
          break;
        } else {
          setLicenseBackCapturedImage(imageSrc);
          // Convert the image to binary data
          const reader = new FileReader();
          reader.onload = (event) => {
            const binaryData = event.target.result;

            // Store the binary data in the insurancebinary state
            setlicensebackbinarydata(binaryData);
          };
          break;
        }
      default:
        alert("coming from camera.jsx default not matched any of the photos");
        break;
    }
  };
  const makeGray = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
      const avg =
        (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;

      imageData.data[i] = avg;
      imageData.data[i + 1] = avg;
      imageData.data[i + 2] = avg;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  async function convertom() {
    if (picture) {
      // Set the File object using setFile
      const imageFile = new File([picture], "captured-image.jpg", {
        type: "image/jpeg",
      });

      if (!imageFile) {
        return alert("Error generating Image.");
      }

      setFile(imageFile);
      // switch (props.path) {
      //   case "index":
      //     setCapturedImage(imageSrc);
      //     break;
      //   case "insurance":
      //     if (props.type == "front") {
      //       setInsuranceFrontCapturedImage(imageSrc);
      //
      //       // Convert the image to binary data
      //       const reader = new FileReader();
      //       reader.onload = (event) => {
      //         const binaryData = event.target.result;
      //
      //         // Store the binary data in the insurancebinary state
      //         setInsuranceFrontBinaryData(binaryData);
      //         alert("frontbin" + insurancefrontbinarydata);
      //       };
      //       break;
      //     } else {
      //       setInsuranceBackCapturedImage(imageSrc);
      //       // Convert the image to binary data
      //       const reader = new FileReader();
      //       reader.onload = (event) => {
      //         const binaryData = event.target.result;
      //
      //         // Store the binary data in the insurancebinary state
      //         setInsuranceBackBinaryData(binaryData);
      //         alert("backbin", insurancebackbinarydata);
      //       };
      //       break; }
      //   default:
      //     alert("coming from camera.jsx default not matched any of the photos");
      //     break;
      // }
    }
  }

  const retakeImage = () => {
    if (props.path === "index") {
      setCapturedImage(null);
    } else if (props.path === "insurance" && props.type === "front") {
      setInsuranceFrontCapturedImage(null);
    } else if (props.path === "insurance" && props.type === "back") {
      setInsuranceBackCapturedImage(null);
    } else if (props.path === "insurance" && props.type === "license") {
      setLicenseBackCapturedImage(null);
    }
    setPicture(""); // Reset the picture in all cases
  };

  const confirmHandler = async () => {
    setCameraDialog(false);
    setinsuranceFrontDialog(false);
    setinsuranceBackDialog(false);
    setLicenseBackDialog(false);

    convertom(); // convert the image and setFile
  };

  return (
    <div>
      <div>
        {picture == "" ? (
          <>
            {window.innerWidth < 600 ? (
              <>
                <Container>
                  <div className="image-with-border">
                    <Webcam
                      audio={false}
                      height={220}
                      ref={webcamRef}
                      width={360}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      className="cam"
                      id="cam"
                    />
                    {showFlash && <div className="flash-effect"></div>}
                  </div>
                  <Overlay />
                </Container>
                <canvas ref={canvasRef} style={{ display: "none" }} />{" "}
              </>
            ) : (
              <>
                <Webcam
                  audio={false}
                  height={window.innerHeight / 4}
                  ref={webcamRef}
                  width={350}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className=""
                />
                <div className="kumar" />
              </>
            )}
          </>
        ) : (
          <>
            {showFlash && <div className="flash-effect"></div>}
            <img
              src={capImage}
              alt="Capturedsc,"
              style={{
                maxWidth: "360px",
                maxHeight: "100%", // Set your desired max height
              }}
            />
            <canvas ref={canvasRef2} style={{ display: "none" }} />{" "}
          </>
        )}
      </div>

      <div>
        {picture != "" ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                columnGap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <ColorButton2 id="capture-btn" onClick={retakeImage}>
                Re-take
              </ColorButton2>
              <ColorButton2 id="capture-btn" onClick={confirmHandler}>
                Confirm
              </ColorButton2>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                columnGap: "1rem",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            >
              <ColorButton2
                sx={{}}
                onClick={(e) => {
                  e.preventDefault();
                  capture();
                }}
                size="large"
                fontSize="inherit"
                className="btn btn-danger"
              >
                Capture
              </ColorButton2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WebCam;
