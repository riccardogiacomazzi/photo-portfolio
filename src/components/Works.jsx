import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, ImageList, ImageListItem, Skeleton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Works = ({ itemData, visibleTags, size }) => {
  // const maxIndex = size.width > 700 ? 3 : 1;
  const [maxIndex, setMaxIndex] = useState(size.width > 700 ? 3 : 1);
  const [indexShow, setIndexShow] = useState({ min: 0, max: maxIndex });
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
    if (indexShow.max > 3) {
      setIndexShow({ min: indexShow.min - maxIndex, max: indexShow.max - maxIndex });
      triggerScrollTop();
    }
  };

  const handleNextAlbum = () => {
    if (indexShow.max !== itemByTag.length) {
      setIndexShow({ min: indexShow.min + maxIndex, max: indexShow.max + maxIndex });
      triggerScrollTop();
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

  return (
    <Box className="main-flex" sx={{ flexDirection: "row", overflowX: "auto" }}>
      <Button onClick={handlePrevAlbum} className="button-works" style={{ border: "none", outline: "none" }}>
        <ArrowBackIosIcon />
      </Button>
      {itemByTag.slice(indexShow.min, indexShow.max).map((item, index) => {
        return (
          <Box key={index} className="box-tag" ref={boxRef} sx={{ position: "relative" }}>
            <ImageList variant="masonry" cols={1} gap={5}>
              {item.img.map((img, index) => (
                <ImageListItem key={index}>
                  <img srcSet={`${img.original}`} src={`${img.original}`} alt={img.title} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
            <Box className="bottom-fixed-box">
              <Typography color={"white"}>{item.tag}</Typography>
            </Box>
          </Box>
        );
      })}
      <Button onClick={handleNextAlbum} className="button-works" style={{ border: "none", outline: "none" }}>
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};

export default Works;
