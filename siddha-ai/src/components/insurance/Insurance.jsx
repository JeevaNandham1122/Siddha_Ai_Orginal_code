import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Custombtn from "../../Layouts/custombtn/Custombtn";
import Customstepper from "../../Layouts/stepper/Stepper";
import "./Insurance.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { scrollUp } from "../../Layouts/backtotop/Backtotop";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { Contextdata } from "../../context/Context";
import WebCam from "../cam/Camera";

export default function Insurance() {
  const {
    setlicensebackbinarydata,
    setClicked,
    ColorButton2,
    insurancechecked,
    setInsuranceChecked,
    insurancefrontdialog,
    setinsuranceFrontDialog,
    licenseBackDialog,
    setLicenseBackDialog,
    insurancebackdialog,
    setinsuranceBackDialog,
    insurancefrontcapturedimage,
    setInsuranceFrontCapturedImage,
    setInsuranceBackCapturedImage,
    insurancebackcapturedimage,
    insurancefrontupload,
    setInsuranceFrontUpload,
    setInsuranceBackUpload,
    insurancebackupload,
    licensebackcapturedimage,
    setLicenseBackCapturedImage,
    insurancefrontbinarydata,
    setInsuranceFrontBinaryData,
    insurancebackbinarydata,
    setInsuranceBackBinaryData,
    setInsuranceImageAlert,
    insuranceimagealert,
    inChecked,
    setverifyChecked,
  } = Contextdata();

  const [fileSizeError, setFileSizeError] = React.useState(null);
  const [fileSizeErrorLicense, setfileSizeErrorLicense] = useState(null);
  const [fileSizeErrorFront, setFileSizeErrorFront] = React.useState(null);
  const [fileContent, setFileContent] = React.useState(null);
  const [imageSizeKB, setImageSizeKB] = React.useState(0); // Add this state variable
  const maxFileSize = 2000000; // 2MB
  const minFileSize = 10000; // 10KB (you can adjust this as needed)

  useEffect(() => {
    scrollUp();
    setInsuranceImageAlert(false);
  }, []);
  // console.log("insurnace back", insurancebackbinarydata);
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);

  if (!inChecked) {
    window.location.href = "/";
  }
  const handleChecked = (e) => {
    setChecked(e.target.checked);

    setverifyChecked(e.target.checked);
  };

  const handleInsuranceChecked = (e) => {
    setInsuranceChecked(e.target.checked);
  };

  const insurancefrontdialogHandleClose = () => {
    setinsuranceFrontDialog(false);
  };
  const insurancebackdialogHandleClose = () => {
    setinsuranceBackDialog(false);
  };
  const licenseBackDialoghandleClose = () => {
    setLicenseBackDialog(false);
  };

  let compressedFile;
  const [compressedBlob1, setcompressedBlob1] = useState(null);
  const insuranceuploadhandler = (e, type) => {
    if (type === "front") {
      setInsuranceFrontCapturedImage(null);
      setFileSizeErrorFront("");
    } else if (type === "back") {
      setInsuranceBackCapturedImage(null);
      setFileSizeError("");
    } else if (type === "license") {
      setLicenseBackCapturedImage(null);
      setfileSizeErrorLicense("");
    }

    const file = e.target.files[0];

    if (!file) return; // No file selected

    // alert(file.size + file.name + "type: " + type);
    if (file.size > maxFileSize || file.size < minFileSize) {
      if (type === "front") {
        setFileSizeErrorFront(
          file.size > maxFileSize
            ? `File size exceeded the limit of ${maxFileSize / 1000} KB`
            : `File size is smaller than the minimum limit of ${
                minFileSize / 1000
              } KB`,
        );
      } else if (type === "back") {
        setFileSizeError(
          file.size > maxFileSize
            ? `File size exceeded the limit of ${maxFileSize / 1000} KB`
            : `File size is smaller than the minimum limit of ${
                minFileSize / 1000
              } KB`,
        );
      } else if (type === "license") {
        setfileSizeErrorLicense(
          file.size > maxFileSize
            ? `File size exceeded the limit of ${maxFileSize / 1000} KB`
            : `File size is smaller than the minimum limit of ${
                minFileSize / 1000
              } KB`,
        );
      }
      setFileContent(null);
      setImageSizeKB(0); // Reset image size
      return; // Do not process the file if it exceeds the size limit or is too small
    }

    if (type === "front") {
      setInsuranceFrontUpload(URL.createObjectURL(file));
    } else if (type === "back") {
      setInsuranceBackUpload(URL.createObjectURL(file));
    } else if (type === "license") {
      setLicenseBackCapturedImage(URL.createObjectURL(file));
    }

    console.log(file);
    async function resizeAndCompressImage(
      file,
      maxSizeInBytes,
      maxWidth,
      maxHeight,
      callback,
    ) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const img = new Image();

        img.onload = function () {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          console.log(canvas.toDataURL("image/jpeg", 0.8));

          if (type === "front") {
            setInsuranceFrontBinaryData(canvas.toDataURL("image/jpeg", 0.8));
          } else if (type === "back") {
            setInsuranceBackBinaryData(canvas.toDataURL("image/jpeg", 0.8));
          } else if (type === "license") {
            setlicensebackbinarydata(canvas.toDataURL("image/jpeg", 0.8));
          }

          setcompressedBlob1(canvas.toDataURL("image/jpeg", 0.8));

          canvas.toBlob(
            function (blob) {
              callback(blob);
            },
            "image/jpeg",
            0.7,
          ); // Adjust the quality here (0.7 means 70% quality)
        };

        img.src = event.target.result;
      };

      reader.readAsDataURL(file);
    }
    // Initiate compression
    if (file) {
      resizeAndCompressImage(
        file,
        300 * 1024,
        800,
        600,
        function (compressedBlob) {
          console.log(compressedBlob);
          // Handle the compressed image blob here
          compressedFile = new File([compressedBlob], "compressed_image.jpg", {
            type: "image/jpeg",
          });
          console.log("Compressed file size:", compressedFile); // Check the size of the compressed file
          // You can now upload/send the compressed file as needed
        },
      );
    }
  };

  // useEffect(() => {
  //   setInsuranceFrontBinaryData(compressedBlob1);
  // }, [compressedBlob1, compressedFile]);

  const FrontImagepreview = () => {
    if (insurancefrontcapturedimage) {
      return (
        <img
          className="image"
          src={insurancefrontcapturedimage}
          alt="FrontImagepreview"
        />
      );
    }
    if (insurancefrontupload) {
      return (
        <img
          className="image"
          src={insurancefrontupload}
          alt="FrontImageUpload"
        />
      );
    } else {
      return (
        <img
          className="image"
          src="./images/InsF.webp"
          alt="DefaultImage"
        ></img>
      );
    }
  };

  const BackImagepreview = () => {
    if (insurancebackcapturedimage) {
      return (
        <img
          className="image"
          src={insurancebackcapturedimage}
          alt="BackCapturedImage"
        />
      );
    }
    if (insurancebackupload) {
      return (
        <img
          className="image"
          src={insurancebackupload}
          alt="BackImageUpload"
        />
      );
    } else {
      return (
        <img
          className="image"
          src="./images/InsB.webp"
          alt="DefaultImage"
        ></img>
      );
    }
  };

  const LicenseBackImagePreview = () => {
    if (licensebackcapturedimage) {
      return (
        <img
          className="image"
          src={licensebackcapturedimage}
          alt="LicenseBackCapturedImage"
        />
      );
    }
    if (licensebackcapturedimage) {
      return (
        <img
          className="image"
          src={licensebackcapturedimage}
          alt="LicenseBackImageUpload"
        />
      );
    } else {
      return (
        <img
          className="image"
          src="./images/licenseback.jpg"
          alt="DefaultImage"
        ></img>
      );
    }
  };

  const handleInsuranceImageAlertClose = () => {
    setInsuranceImageAlert(false);
  };

  console.log(compressedBlob1);

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{ wordWrap: "break-word" }}
          color="#0488B9"
          variant="h4"
          marginTop="3rem"
          fontWeight="bold"
          component="h1"
          fontSize={{ xs: "27px", md: "35px" }}
        >
          Please Upload Your Insurance Details.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Customstepper active={3} />
        </Box>

        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "1.7rem",
            marginLeft: { xs: "12px" },
          }}
        >
          <FormGroup
            sx={{
              textAlign: "left",
              border: "2px solid rgba(4,136,185,1)",
              borderRadius: "12px",
              padding: "3px 1rem",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={insurancechecked}
                  onClick={(e) => handleInsuranceChecked(e)}
                />
              }
              label="Insured person is same as the Patient"
            />
          </FormGroup>
        </Stack>

        <Typography
          variant="h4"
          marginTop="1rem"
          fontWeight="bold"
          component="h1"
          textAlign="center"
          color="#0488B9"
          sx={{ fontSize: { xs: "1.6rem", sm: "2rem" } }}
        >
          Front Page
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              border: "2px dotted rgba(4,136,185,1)",
              borderRadius: "12px",
              width: { xs: "95%", sm: "87%", md: "45%" },
              padding: "12px 0",
              margin: "1rem 0 0",
            }}
          >
            <Box>
              {FrontImagepreview()}

              {/* <img id="insuranceFrontImage" alt="Insurance Front" /> */}

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <div className="registercontainer">
                  <div>
                    <button
                      className="image-button"
                      onClick={() => setinsuranceFrontDialog(true)}
                    >
                      <FlipCameraIosIcon className="icon" />
                      <span className="capturebtn">Take Photo</span>
                    </button>
                  </div>

                  <p className="or">(OR)</p>

                  <div>
                    <button className="image-button">
                      <input
                        type="file"
                        name="frontupload"
                        id="frontuploadbtn"
                        onChange={(e) => insuranceuploadhandler(e, "front")}
                        accept=".jpg, .jpeg, .png"
                      ></input>
                      <CloudUploadIcon className="icon" />
                      <label htmlFor="frontuploadbtn" className="capturebtn">
                        Upload Picture
                      </label>
                    </button>
                  </div>
                </div>
              </Stack>
              {fileSizeErrorFront && (
                <p className="error">{fileSizeErrorFront}</p>
              )}
            </Box>
          </Box>
        </Box>

        <Typography
          variant="h4"
          marginTop="3rem"
          fontWeight="bold"
          component="h1"
          textAlign="center"
          color="#0488B9"
          sx={{ fontSize: { xs: "1.6rem", sm: "2rem" } }}
        >
          Back Page
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              border: "2px dotted rgba(4,136,185,1)",
              borderRadius: "12px",
              width: { xs: "95%", sm: "87%", md: "45%" },
              padding: "12px 0",
              margin: "1rem 0 0",
            }}
          >
            <Box>
              {BackImagepreview()}

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <div className="registercontainer">
                  <div>
                    <button
                      className="image-button"
                      onClick={() => setinsuranceBackDialog(true)}
                    >
                      <FlipCameraIosIcon className="icon" />
                      <span className="capturebtn">Take Photo</span>
                    </button>
                  </div>

                  <p className="or">(OR)</p>

                  <div>
                    <button className="image-button">
                      <input
                        type="file"
                        name="backupload"
                        id="backuploadbtn"
                        onChange={(e) => insuranceuploadhandler(e, "back")}
                        accept=".jpg, .jpeg, .png"
                      ></input>
                      <CloudUploadIcon className="icon" />
                      <label htmlFor="backuploadbtn" className="capturebtn">
                        Upload Picture
                      </label>
                    </button>
                  </div>
                </div>
              </Stack>
              {fileSizeError && <p className="error">{fileSizeError}</p>}
            </Box>
          </Box>
        </Box>

        <Typography
          sx={{ wordWrap: "break-word" }}
          color="#0488B9"
          variant="h4"
          marginTop="3rem"
          fontWeight="bold"
          component="h1"
          fontSize={{ xs: "27px", md: "35px" }}
        >
          Please Upload Your License Details.
        </Typography>

        <Typography
          variant="h4"
          marginTop="3rem"
          fontWeight="bold"
          component="h1"
          textAlign="center"
          color="#0488B9"
          sx={{ fontSize: { xs: "1.6rem", sm: "2rem" } }}
        >
          License Back Page
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              border: "2px dotted rgba(4,136,185,1)",
              borderRadius: "12px",
              width: { xs: "95%", sm: "87%", md: "45%" },
              padding: "12px 0",
              margin: "1rem 0 0",
            }}
          >
            <Box>
              {LicenseBackImagePreview()}

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <div className="registercontainer">
                  <div>
                    <button
                      className="image-button"
                      onClick={() => setLicenseBackDialog(true)}
                    >
                      <FlipCameraIosIcon className="icon" />
                      <span className="capturebtn">Take Photo</span>
                    </button>
                  </div>

                  <p className="or">(OR)</p>

                  <div>
                    <button className="image-button">
                      <input
                        type="file"
                        name="licenseupload"
                        id="licenseuploadbtn"
                        onChange={(e) => insuranceuploadhandler(e, "license")}
                        accept=".jpg, .jpeg, .png"
                      ></input>
                      <CloudUploadIcon className="icon" />
                      <label htmlFor="licenseuploadbtn" className="capturebtn">
                        Upload Picture
                      </label>
                    </button>
                  </div>
                </div>
              </Stack>
              {fileSizeErrorLicense && (
                <p className="error">{fileSizeErrorLicense}</p>
              )}
            </Box>
          </Box>
        </Box>

        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "3rem",
            marginLeft: { xs: "12px" },
          }}
        >
          <FormGroup sx={{ textAlign: "left" }}>
            <FormControlLabel
              control={
                <Checkbox checked={checked} onClick={(e) => handleChecked(e)} />
              }
              label="The above information is correct."
            />
          </FormGroup>
        </Stack>

        <Box sx={{ margin: "0 8%" }}>
          <Custombtn linknxt="/verify" linkbck="/address" checked={checked} />
        </Box>
      </Box>

      <Dialog
        open={insurancefrontdialog}
        onClose={insurancefrontdialogHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
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
            {"Take Picture"}
            <ClearIcon onClick={insurancefrontdialogHandleClose} />
          </DialogTitle>
        </Box>
        <Box sx={{ padding: "0rem" }}>
          <WebCam path="insurance" type="front" />
        </Box>
      </Dialog>

      <Dialog
        open={insurancebackdialog}
        onClose={insurancebackdialogHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
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
            {"Take Picture"}
            <ClearIcon onClick={insurancebackdialogHandleClose} />
          </DialogTitle>
        </Box>
        <Box sx={{ padding: "0rem" }}>
          <WebCam path="insurance" type="back" />
        </Box>
      </Dialog>

      <Dialog
        open={licenseBackDialog}
        onClose={licenseBackDialoghandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
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
            {"Take Picture"}
            <ClearIcon onClick={licenseBackDialoghandleClose} />
          </DialogTitle>
        </Box>
        <Box sx={{ padding: "0rem" }}>
          <WebCam path="insurance" type="license" />
        </Box>
      </Dialog>

      <Dialog
        open={insuranceimagealert}
        onClose={handleInsuranceImageAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <Box sx={{ backgroundColor: "#F7F5FB" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "1rem",
              padding: "8px 1px 1rem 2px",
              margin: { xs: "1.2rem 8px 1rem", sm: "1.2rem 29px 1rem" },
            }}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: "2.1rem", color: "rgba(4,136,185,1) " }}
            />
            <DialogContentText
              id="alert-dialog-description"
              sx={{ fontSize: "16px" }}
            >
              Please Capture or Upload the image.
            </DialogContentText>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: { xs: "0 1rem 1rem", sm: "0 2rem 1rem" },
            }}
          >
            <ColorButton2
              sx={{ width: "30%" }}
              variant="text"
              onClick={handleInsuranceImageAlertClose}
            >
              Ok
            </ColorButton2>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
