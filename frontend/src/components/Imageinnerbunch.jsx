// Import useState and useEffect
import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Imageinnerbunch = () => {

  const [image, setImage] = useState();
    const [allImage, setAllImage] = useState([]);


    useEffect(() =>{
        getImage();
    },[]);
    const submitImage = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        const result = await axios.post(
            "http://localhost:5000/upload-image",
            formData,
            {
                headers:{"Content-Type": "multipart/form-data"},
            }
        );
    };

    const onInputChange = (e) =>{
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }

    const getImage = async() =>{
        const result = await axios.get("http://localhost:5000/get-image");
        console.log(result);
        setAllImage(result.data.data);
    }

  
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "5px",
          marginBottom: "20px",
        }}
      >
        {allImage == null
          ? ""
          : allImage.map((data, index) => (
              <div key={index} style={{ width: "100%", height: "100%" }}>
                <img
                  src={require(`./../images/${data.image}`)}
                  alt={data.image}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "" }}>
  <form
    onSubmit={submitImage}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
    }}
  >
    <label
      style={{
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: "#f0f0f0",
      }}
    >
      Choose Image
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={onInputChange}
        style={{ display: "none" }}
      />
    </label>
    <button
      type="submit"
      style={{
        backgroundColor: "#4caf50",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Submit
    </button>
  </form>
</div>

    </div>
  );
};

export default Imageinnerbunch;
