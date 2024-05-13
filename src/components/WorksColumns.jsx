import { Box, Button, Typography, ImageList, ImageListItem, Skeleton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const WorkColumns = ({ setIndexShow }) => {
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

  return (
    <Box className="main-flex" sx={{ flexDirection: "row", overflowX: "auto" }}>
      <Button onClick={handlePrevAlbum} className="button-works" style={{ border: "none", outline: "none" }}>
        <ArrowBackIosIcon />
      </Button>
      {itemByTag.slice(indexShow.min, indexShow.max).map((item, index) => {
        return (
          <Box
            key={index}
            className="box-tag"
            ref={boxRef}
            onClick={() => handleTagSelect(item)}
            sx={{ position: "relative" }}
          >
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

export default WorkColumns;
