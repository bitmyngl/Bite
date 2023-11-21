// Import useState and useEffect
import React, { useState, useEffect } from "react";
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    // Fetch item data when the component mounts
    fetchItemData();
  }, []);

  const fetchItemData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getImages");
      if (response.ok) {
        const images = await response.json();
        setItemData(images);
      } else {
        console.error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch("http://localhost:5000/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("Image uploaded successfully");

        // Fetch updated item data after uploading
        fetchItemData();
      } else {
        setUploadStatus("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("Internal Server Error");
    }
  };

  const renderImageItems = () => {
    itemData.forEach((item) => {
      console.log('item.data:', item.data);
      console.log('base64:', item.data.toString('base64'));
    });
    return itemData.map((item) => (
     
      <ImageListItem key={item._id}>
       
       <img
        src={`http://localhost:5000${item.imageUrl}`}  // Update the server URL
        alt={item.filename}
        loading="lazy"
      />
      </ImageListItem>
    ));
  };

  return (
    <div>
      <ImageList variant="quilted" cols={4} rowHeight={121}>
        {renderImageItems()}
      </ImageList>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button
          component="label"
          variant="contained"
          size="large"
          startIcon={<CloudUploadIcon />}
          onClick={handleImageUpload}
        >
          Upload Image
          <VisuallyHiddenInput
            accept="image/*"
            type="file"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
        </Button>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default Imageinnerbunch;
