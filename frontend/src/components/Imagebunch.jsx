import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import Imageinnerbunch from "./../components/Imageinnerbunch";
import "./../styles/imagebunch.css";
import Imageupload from "./Imageupload";

function Imagebunch() {
  return (
    <div className="imagebunch-outerbox">
      <StyledEngineProvider injectFirst>
        <Imageinnerbunch />
        {/* <Imageupload /> */}
      </StyledEngineProvider>
    </div>
  );
}
export default Imagebunch;
