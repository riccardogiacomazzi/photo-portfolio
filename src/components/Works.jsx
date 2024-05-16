import { useEffect, useRef, useState, Component } from "react";
import { Box, Button, Typography, ImageList, ImageListItem, Skeleton, Modal } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Works = ({ itemData, visibleTags, size }) => {
  const [indexShow, setIndexShow] = useState({ min: 0, max: 1 });
  const [selectedImage, setSelectedImage] = useState();
  const [zoom, setZoom] = useState(false);

  const boxRef = useRef(null);

  const uniqueTags = itemData.reduce((tags, item) => {
    item.tag.forEach((tag) => {
      if (!tags.includes(tag) && visibleTags.includes(tag)) {
        tags.push(tag);
      }
    });
    return tags;
  }, []);

  const itemByTag = [];

  uniqueTags.forEach((tag) => {
    const filteredItems = itemData.filter((item) => item.tag.includes(tag));
    const images = filteredItems.map((item) => item.img);
    itemByTag.push({ tag: tag, img: images });
  });

  //scroll on top automatically on render, and when Index of album displayed is changed
  const triggerScrollTop = () => {
    if (boxRef.current) {
      boxRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    triggerScrollTop();
  }, [indexShow]);

  //album navigation
  const handlePrevAlbum = () => {
    if (indexShow.min > 0) {
      setIndexShow({ min: indexShow.min - 1, max: indexShow.max - 1 });
      triggerScrollTop();
    } else {
      setIndexShow({ min: itemByTag.length - 1, max: itemByTag.length });
    }
  };

  const handleNextAlbum = () => {
    if (indexShow.max < itemByTag.length) {
      setIndexShow({ min: indexShow.min + 1, max: indexShow.max + 1 });
      triggerScrollTop();
    } else {
      setIndexShow({ min: 0, max: 1 });
    }
  };

  //picture navigation - up and down - web version
  let links = [];

  //KEYBOARD navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          handlePrevAlbum();
          break;
        case "ArrowRight":
          handleNextAlbum();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrevAlbum, handleNextAlbum]);

  //selection of image to display
  const handleSelectImage = (item) => {
    if (!selectedImage) {
      setZoom(true);
    } else setZoom(false);
    setSelectedImage(item);
  };

  //zoom for main image
  const handleClickZoom = () => {
    setZoom(!zoom);
  };

  //swipe on bottom menu on mobile
  const handlers = useSwipeable({
    onSwipedLeft: handlePrevAlbum,
    onSwipedRight: handleNextAlbum,
  });

  return (
    // RENDER TAG COLUMNS VIEW

    <Box
      className="main-flex"
      sx={{
        flexDirection: "row",
      }}
    >
      {size.width > 700 && (
        <Button onClick={handlePrevAlbum} className="button-works" style={{ border: "none", outline: "none" }}>
          <ArrowBackIosIcon />
        </Button>
      )}
      {itemByTag.slice(indexShow.min, indexShow.max).map((item, index) => {
        return (
          <Box
            key={index}
            className="box-tag"
            sx={{
              width: selectedImage ? (size.width > 700 ? "25%" : "100%") : size.width > 700 ? "50%" : "100%",
              cursor: selectedImage ? "pointer" : "zoom-in",
            }}
            ref={boxRef}
          >
            <ImageList variant="masonry" cols={1} gap={5}>
              {item.img.map((img, index) => (
                <ImageListItem key={index} onClick={() => handleSelectImage(img)}>
                  <img srcSet={`${img.original}`} src={`${img.original}`} alt={img.title} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>

            {/* Opaque bottom box with tag and nav buttons - ONLY MOBILE */}
            <Box className="bottom-fixed-box" {...handlers}>
              {size.width < 700 && (
                <Button onClick={handlePrevAlbum} className="button-works" style={{ border: "none", outline: "none" }}>
                  <ArrowBackIosIcon />
                </Button>
              )}

              <Typography color={"white"}>{item.tag}</Typography>

              {size.width < 700 && (
                <Button onClick={handleNextAlbum} className="button-works" style={{ border: "none", outline: "none" }}>
                  <ArrowForwardIosIcon />
                </Button>
              )}
            </Box>
          </Box>
        );
      })}
      {size.width > 700 && (
        <Button onClick={handleNextAlbum} className="button-works" style={{ border: "none", outline: "none" }}>
          <ArrowForwardIosIcon />
        </Button>
      )}

      {/* big photo container - rendered on WEB and only when a picture is selected */}
      {size.width > 700 && selectedImage && (
        <Box
          className="big-photo-container-works"
          sx={{
            flexGrow: !selectedImage ? "initial" : 1,
            cursor: zoom === true ? "zoom-out" : "zoom-in",
          }}
        >
          {/* conditionally renderes big image clicked */}
          {size.width > 700 && (
            <img
              className={zoom === false ? "image-big" : "image-big-zoom-works"}
              style={{ margin: " auto" }}
              onClick={handleClickZoom}
              srcSet={`${selectedImage.original}`}
              src={`${selectedImage.original}`}
              loading="lazy"
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Works;
