import React, { useState, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
// import "./Crop.css"; // You can create a CSS file for styling

const Crops = ({ selectedFile, onCrop }) => {
  const [cropData, setCropData] = useState(null);
  const cropperRef: ReactCropperElement | null = useRef(null);

  const getCropData = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      if (croppedCanvas) {
        const croppedDataUrl = croppedCanvas.toDataURL();
        setCropData(croppedDataUrl);
        onCrop(croppedDataUrl); // Call the callback with the cropped image
      }
    }
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <Cropper
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={1}
          preview=".img-preview"
          src={selectedFile}
          ref={cropperRef}
          viewMode={1}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          checkOrientation={false}
        />
      </div>
      <div>
        <div className="box" style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>
        <div
          className="box"
          style={{ width: "50%", float: "right", height: "300px" }}
        >
          <h1>
            <span>Crop</span>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img
            style={{ width: "100%" }}
            src={cropData || selectedFile}
            alt="cropped"
          />
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default Crops;