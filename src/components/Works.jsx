import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, ImageList, ImageListItem, Skeleton, Modal } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Works = ({ itemData, visibleTags, size }) => {
  // const maxIndex = size.width > 700 ? 3 : 1;
  const [maxIndex, setMaxIndex] = useState(size.width > 700 ? 3 : 1);
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

  //scroll on top automatically on render, and when Index of album displayed is changed
  const triggerScrollTop = () => {
    if (boxRef.current) {
      boxRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    triggerScrollTop();
  }, [indexShow]);

  //selection of image to display
  const handleSelectImage = (item) => {
    setZoom(false);
    setSelectedImage(item);
    console.log(item);
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
          <Box key={index} className="box-tag" ref={boxRef}>
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
