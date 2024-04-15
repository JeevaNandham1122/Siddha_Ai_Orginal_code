import React, { useRef } from "react";

const ImageProcessor = () => {
  const imageRef = useRef(null);

  const upload = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = imageRef.current;
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0, img.width, img.height);
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  };

  const makeGray = () => {
    const canvas = imageRef.current;
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

  return (
    <div>
      <input type="file" id="finput" onChange={upload} />
      <br />
      <canvas ref={imageRef}></canvas>
      <br />
      <button onClick={makeGray}>Make Gray</button>
    </div>
  );
};

export default ImageProcessor;
