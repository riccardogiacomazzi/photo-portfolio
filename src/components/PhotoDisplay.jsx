import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MosaicDisplay from "./MosaicDisplay";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { SettingsInputHdmiOutlined } from "@mui/icons-material";

const PhotoDisplay = ({ itemData, size }) => {
  const [active, setActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [zoom, setZoom] = useState(false);

  //automatic scroll on first render - WIP
  const handleInitialClick = () => {
    if (active === false) {
      setActive(true);
    }
  };

  useEffect(() => {
    function getRandomInt(min, max) {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    if (itemData.length > 0) {
      setSelectedImage(itemData[getRandomInt(0, itemData.length)]);
    }
  }, [itemData]);

  //NAVIGATION
  const index = selectedImage ? itemData.findIndex((item) => item.img.small === selectedImage.img.small) : 0;

  const handlePrevPic = () => {
    if (index > 0) {
      setSelectedImage(itemData[index - 1]);
    } else {
      setSelectedImage(itemData[itemData.length - 1]);
    }
  };

  const handleNextPic = () => {
    if (index < itemData.length - 1) {
      setSelectedImage(itemData[index + 1]);
    } else {
      setSelectedImage(itemData[0]);
    }
  };

  //zoom
  const handleZoom = () => {
    setZoom(!zoom);
  };

  useEffect(() => {
    setZoom(false);
  }, [itemData, selectedImage]);

  //mobile user input
  //swipe
  const handlers = useSwipeable({
    onSwipedLeft: zoom === false && handleNextPic,
    onSwipedRight: zoom === false && handlePrevPic,
    onSwipedUp: zoom === false && handleNextPic,
    onSwipedDown: zoom === false && handlePrevPic,
  });

  //pinch zoom

  return (
    <div onClick={handleInitialClick} className="main-flex">
      <Box
        {...handlers}
        className="big-photo-container"
        sx={{
          display: zoom === false && "flex",
          justifyContent: zoom === false && "center",
          alignItems: zoom === false && "center",
        }}
      >
        {zoom === false && size.width > 700 && (
          <Button
            onClick={handlePrevPic}
            className="button-display"
            style={{ border: "none", outline: "none", position: "absolute", left: "0" }}
          >
            <ArrowBackIosIcon />
          </Button>
        )}
        {selectedImage && (
          <img
            className={zoom === false ? "image-big" : "image-big-zoom"}
            onClick={handleZoom}
            src={`${selectedImage.img.original}`}
            alt={`${selectedImage.title}`}
            loading="lazy"
          />
        )}
        {zoom === false && size.width > 700 && (
          <Button
            onClick={handleNextPic}
            className="button-display"
            style={{ border: "none", outline: "none", position: "absolute", right: "0" }}
          >
            <ArrowForwardIosIcon />
          </Button>
        )}
      </Box>
      <Box>
        <MosaicDisplay itemData={itemData} size={size} setSelectedImage={setSelectedImage} />
      </Box>
    </div>
  );
};

export default PhotoDisplay;
