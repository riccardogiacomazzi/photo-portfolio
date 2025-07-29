import React, { createContext, useContext, useState, useEffect } from "react";
import FlickrAPI from "../services/flickrService";

const ImageContext = createContext();

export const useImages = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await FlickrAPI.FlickrPhotos();
        setImages(data.itemData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  return <ImageContext.Provider value={images}>{children}</ImageContext.Provider>;
};
