import React, { createContext, useContext, useState, useEffect } from "react";
import FlickrAPI from "../services/flickrService";

const ImageContext = createContext();

export const useImages = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (images.length === 0) {
      flickrService(); // Function to fetch images from API
    }
  }, [images]);

  const flickrService = async () => {
    try {
      const data = await FlickrAPI.FlickrPhotos();
      setImages(data.itemData);
    } catch (error) {
      console.log(error);
    }
  };

  return <ImageContext.Provider value={images}>{children}</ImageContext.Provider>;
};
