import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./Index.css";
import Customstepper from "../../Layouts/stepper/Stepper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { Contextdata } from "../../context/Context";
import Custombtn from "../../Layouts/custombtn/Custombtn";
import Loading from "../../Layouts/backdrop/Backdrop";
import { Cropjs } from "../cropper/NewCrop";
import WebCam from "../cam/Camera";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Index() {
  const {
    ageChecked,
    setAgeChecked,
    cameradialog,
    setCameraDialog,
    setCapturedImage,
    capturedImage,
    capture,
    setCapture,
    setImageAlert,
    imageralert,
    setLicenseImageBinaryData,
    setFile,
    file,
    ColorButton2,
    setpdChecked,
    sessionToken,
  } = Contextdata();

  const [fileSizeError, setFileSizeError] = React.useState(null);
  const [fileContent, setFileContent] = React.useState(null);
  const [imageSizeKB, setImageSizeKB] = React.useState(0); // Add this state variable
  const maxFileSize = 2000000; // 2MB
  const minFileSize = 10000; // 10KB (you can adjust this as needed)

  const navigate = useNavigate();

  const [croppedImage, setCroppedImage] = useState(null);

  let compressedFile;
  const captureHandle = (e) => {
    setCapturedImage("");
    const file = e.target.files[0];
    if (!file) return; // No file selected

    if (file.size > maxFileSize || file.size < minFileSize) {
      setFileSizeError(
        file.size > maxFileSize
          ? `File size exceeded the limit of ${maxFileSize / 1000} KB`
          : `File size is smaller than the minimum limit of ${
              minFileSize / 1000
            } KB`,
      );
      setFileContent(null);
      setImageSizeKB(0); // Reset image size
      return; // Do not process the file if it exceeds the size limit or is too small
    }
    setCapture(URL.createObjectURL(file));

    if (file) {
      setFile(file);
      console.log("capture file", file);
    }

    // START COMPRESSING THE FILE.
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

          // Apply anti-aliasing for improved image quality
          ctx.imageSmoothingEnabled = true;

          ctx.drawImage(img, 0, 0, width, height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          for (let i = 0; i < imageData.data.length; i += 4) {
            const avg =
              (imageData.data[i] +
                imageData.data[i + 1] +
                imageData.data[i + 2]) /
              3;

            imageData.data[i] = avg;
            imageData.data[i + 1] = avg;
            imageData.data[i + 2] = avg;
          }

          ctx.putImageData(imageData, 0, 0);

          canvas.toBlob(
            function (blob) {
              callback(blob);
            },
            "image/jpeg",
            1.0,
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
        600,
        420,
        async function (compressedBlob) {
          console.log(compressedBlob);
          // Handle the compressed image blob here
          compressedFile = new File([compressedBlob], "compressed_image.jpg", {
            type: "image/jpeg",
          });

          console.log("Compressed file size:", compressedFile.size); // Check the size of the compressed file
          setFile(compressedFile);
        },
      );
    }
  };

  const [checked, setChecked] = useState(false);
  const [cropactive, setcropactive] = useState(false);

  const handleChecked = (e) => {
    setChecked(e.target.checked);
    setpdChecked(e.target.checked);
  };

  const cameradialogHandleClose = () => {
    setCameraDialog(false);
  };

  const handleAgeChecked = (e) => {
    setAgeChecked(e.target.checked);
  };

  const handleCropActive = () => {
    setcropactive(false);
    // setCapture("");
    getCropData();
  };

  const Imagepreview = () => {
    if (capturedImage) {
      return <img className="image" src={capturedImage} alt="capturedImage" />;
    }
    if (capture) {
      return <img className="image" src={capture} alt="capturedImage" />;
    }
    // if (croppedImage) {
    //   return <img className="image" src={croppedImage} />;
    // }
    else {
      return (
        <img
          className="image"
          src="./images/DLSS.webp"
          alt="capturedImage"
        ></img>
      );
    }
  };

  const handleImagerAlertClose = () => {
    setImageAlert(false);
  };

  function compressImage(file, maxWidth, maxHeight, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Handle file read error
      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          let newWidth = img.width;
          let newHeight = img.height;

          // Calculate new dimensions to fit within maxWidth and maxHeight
          if (img.width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (img.height * maxWidth) / img.width;
          }
          if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = (img.width * maxHeight) / img.height;
          }

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          // Convert image to grayscale
          for (let i = 0; i < imageData.data.length; i += 4) {
            const avg =
              (imageData.data[i] +
                imageData.data[i + 1] +
                imageData.data[i + 2]) /
              3;

            imageData.data[i] = avg;
            imageData.data[i + 1] = avg;
            imageData.data[i + 2] = avg;
          }

          ctx.putImageData(imageData, 0, 0);

          // Convert canvas to blob
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/jpeg",
            quality,
          );
        };

        // Handle image load error
        img.onerror = (error) => reject(error);
      };

      // Handle file read abort
      reader.onabort = () => reject(new Error("File read aborted."));
    });
  }

  const handleCrop = (croppedDataUrl) => {
    setCroppedImage(croppedDataUrl);
    setCapture(croppedDataUrl);

    // ONLY EXECUTE ON SUBMISSION
    // const imageFile = new File([croppedDataUrl], 'afterCrop.png', {
    //   type: 'image/png',
    // });
    // setFile(imageFile);
  };

  const [selectedF, setSelectedF] = useState("");

  const handleImageSelect = async (e) => {
    const selectedFile = e.target.files[0];

    const imageFile = new File([selectedFile], "beforecompress.png", {
      type: "image/png",
    });
    setSelectedF(URL.createObjectURL(imageFile));
    // console.log("hello", selectedFile);

    if (selectedFile) {
      // Check if the selected file type is allowed (JPG, PNG, or JPEG)
      if (/\.(jpg|jpeg|png)$/i.test(selectedFile.name)) {
        try {
          const compressedBlob = await compressImage(
            selectedFile,
            360,
            220,
            0.7,
          );
          setSelectedF(URL.createObjectURL(compressedBlob)); // passing to the blob
          setcropactive(true);

          if (compressedBlob) {
            const imageFile = new File([compressedBlob], "Compinit.png", {
              type: "image/png",
            });

            // Do something with the imageFile
            setFile(imageFile);
            setCapture(URL.createObjectURL(imageFile));
            // alert("hello")
          }
        } catch (error) {
          console.error("Image compression error:", error);
        }
      } else {
        // File type is not allowed, you can show an error message
        alert("Please select a JPG, JPEG, or PNG image.");
      }
    } else {
      // Handle the case where the user didn't select a file
      alert("Please select a file.");
    }
  };

  function dataURLtoFile(dataURL, fileName) {
    try {
      // Split the Data URL to get the MIME type and data
      const [mime, data] = dataURL.split(",");

      // Decode the Base64 data to binary data
      const byteString = atob(data);

      // Create an array buffer from the binary data
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // Create a Blob from the array buffer
      const blob = new Blob([ia], { type: mime });

      // Create a File from the Blob
      return new File([blob], fileName, { type: mime });
    } catch (error) {
      // Handle the error
      console.error("Error converting data URL to file:", error);

      // You can show an error message to the user
      alert(
        "There was an error. Please ensure you are Cropping the image correctly.",
      );

      // You can also return null or undefined to indicate the operation failed
      return new File([capturedImage], fileName, { type: "image/png" });
    }
  }
  const [cropData, setCropData] = useState(null);
  const cropperRef = useRef(null);

  const getCropData = () => {
    console.log("Original image data URL:", capture);
    const originalFile = dataURLtoFile(capture, "original_image.png");

    const maxWidth = 360; // Set the maximum width as needed
    const maxHeight = 220; // Set the maximum height as needed
    const quality = 0.9; // Set the desired image quality (0.0 - 1.0)

    // Compress the original image file
    compressImage(originalFile, maxWidth, maxHeight, quality).then(
      (compressedBlob) => {
        // Create a new File from the compressed blob
        const compressedFileName = "compressed_image.png";
        const compressedFile = new File([compressedBlob], compressedFileName, {
          type: "image/png",
        });

        // Now you have the compressed image file
        console.log(
          "Compressed image data URL:",
          URL.createObjectURL(compressedFile),
        );
        setFile(compressedFile);
      },
    );
  };

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  useEffect(() => {
    if (cameradialog) {
      alert("Please click on the screen to focus the Image.");
    }
  }, [cameradialog]);

  return (
    <>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{ wordWrap: "break-word" }}
            color="#0488B9"
            variant="h4"
            marginTop="3rem"
            fontWeight="bold"
            component="h1"
            fontSize={{ xs: "30px", md: "35px" }}
          >
            New Patient Form
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {/* sx={{
                    '& .css-z7uhs0-MuiStepConnector-line':{
                        borderTopWidth: '10px',
                        
                    }
                }} */}
            <Customstepper active={0} />
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
                    checked={ageChecked}
                    onClick={(e) => handleAgeChecked(e)}
                  />
                }
                label="If patient age is under 16 click here."
              />
            </FormGroup>
          </Stack>

          <Box
            sx={{
              margin: { xs: "2rem 4% 0 ", sm: "2rem 9% 0 " },
              minHeight: "50vh",
            }}
          >
            <Box>
              {!ageChecked && (
                <>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: { xs: "1.5rem", sm: "2rem" },
                    }}
                  >
                    Patient's Driver's License
                  </Typography>

                  <div className="nav-bar"></div>
                  <Typography
                    variant="p"
                    component="div"
                    sx={{
                      textAlign: "center",
                      marginTop: "12px",
                      color: "#525252",
                      fontSize: { xs: "1rem", sm: "1.2rem" },
                    }}
                  >
                    Capture a copy of your Driver's license or State
                    ID
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box
                      sx={{
                        border: "2px dotted grey",
                        borderRadius: "12px",
                        width: { xs: "100%", sm: "87%", md: "55%" },
                        padding: "12px 0",
                        margin: "1rem 0 0",
                      }}
                    >
                      <Box>
                        {Imagepreview()}

                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <div className="registercontainer">
                            <div>
                              <button
                                className="image-button"
                                onClick={() => setCameraDialog(true)}
                              >
                                <FlipCameraIosIcon className="icon" />
                                <span className="capturebtn">Take Photo</span>
                              </button>
                            </div>
                          </div>
                        </Stack>
                        {fileSizeError && (
                          <p className="error bold">{fileSizeError}</p>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </>
              )}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                  marginTop: "1.5rem",
                }}
              >
                <Stack>
                  <FormGroup sx={{ textAlign: "left" }}>
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
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <Custombtn linknxt="/personaldetails" checked={checked} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        fullWidth
        open={cameradialog}
        onClose={cameradialogHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .css-22jxwj-MuiPaper-root-MuiDialog-paper": {
            margin: "0px",
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
            {"Take Picture"}
            <ClearIcon onClick={cameradialogHandleClose} />
          </DialogTitle>
        </Box>
        <Box>
          <WebCam path="index" />
        </Box>
      </Dialog>

      {/* Change the above to change the Gamera which is a sidenote..*/}

      <Dialog
        open={cropactive}
        onClose={handleCropActive}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <Cropjs
          selectedFile={selectedF}
          onCrop={handleCrop}
          style={{ height: 400, width: "100%" }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: { xs: "0 1rem 1rem", sm: "0 2rem 1rem" },
          }}
        >
          <ColorButton2
            sx={{ width: "30%", marginTop: "20px" }}
            variant="text"
            onClick={handleCropActive}
          >
            Crop
          </ColorButton2>
        </Box>
      </Dialog>

      <Dialog
        open={imageralert}
        onClose={handleImagerAlertClose}
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
              onClick={handleImagerAlertClose}
            >
              Ok
            </ColorButton2>
          </Box>
        </Box>
      </Dialog>

      <Loading />
    </>
  );
}
