import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ImageProcessor from "./imageprocess";
// import { Crop } from './components/cropper/cropper';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*<Crop /> */}
    {/*<ImageProcessor />*/}
    <App />
  </React.StrictMode>,
);
