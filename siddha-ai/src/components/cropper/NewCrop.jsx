
import React, { useRef, useState } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'

export const Cropjs = (props) => {
    const [image] = useState(props.selectedFile);
    const cropperRef = useRef(null);

    // console.log(props.selectedFile);

    const onChange = (CropperRef) => {
        console.log(CropperRef.getCoordinates(), CropperRef.getCanvas());
        // console.log("hello", CropperRef.getCanvas() ? CropperRef.getCanvas()?.toDataURL() : "hi");
        props.onCrop(CropperRef.getCanvas()?.toDataURL()); 
    };
    // const onCrop = (CropperRef) => {
        
    //   };
    // const handleCrop = () => {
    //     const cropper = cropperRef.current;
    //     if (cropper) {
    //       const canvas = cropper.getCanvas();
    //       const croppedImageData = canvas.toDataURL();
    //       console.log(croppedImageData, "data")
    //       const cropimg = URL.createObjectURL(canvas);
    //       const cropimg2 = URL.createObjectURL(croppedImageData);
    //       console.log("img2", cropimg2);
    //       console.log("img1", cropimg);

    //       props.onCrop(croppedImageData);
    //     }
    //   };

    return (
        <>
        <Cropper
            src={image}
            onChange={onChange}
            
            className={'cropper'}
        />
       
        </>
    )
};