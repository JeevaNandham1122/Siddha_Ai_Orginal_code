import Jimp from "jimp";
import React, { useState } from "react";

export const useImageProcessing = () => {
  const { greyScale, setGreyScale } = useState(null);
  const processImage = async (blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const image = await Jimp.read(Buffer.from(arrayBuffer));

      image.greyscale();

      // Get the result as a buffer
      const processedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
      setGreyScale(processedBuffer);
    } catch (error) {
      alert("error processing image" + error.message);
    }
  };
  // Function to get the processed image as a File
  const getProcessedFile = () => {
    if (greyScale) {
      // Create a File from the buffer
      return new File([greyScale], "processed-image.jpg", {
        type: Jimp.MIME_JPEG,
      });
    }
    return null;
  };
  return { greyScale, processImage, getProcessedFile };
};
