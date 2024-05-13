import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";

const MosaicDisplay = ({ itemData, setSelectedImage, size }) => {
  const handleMosaicClick = (index) => {
    setSelectedImage(itemData[index]);
  };

  return (
    <Box
      className="horizontal-list"
      id="horizontal-scroll"
      component="nav"
      aria-label="My site"
      sx={{
        overflowX: "auto",
      }}
    >
      {itemData && (
        <List role="menubar" orientation="horizontal">
          {itemData.map((item, index) => (
            <div key={index}>
              <ListItem role="none">
                <ListItemButton
                  onClick={() => handleMosaicClick(index)}
                  role="menuitem"
                  component="a"
                  aria-label="item-list"
                >
                  <img className="image-small" src={`${item.img.small}`} alt={`${item.title}`} loading="lazy" />
                </ListItemButton>
              </ListItem>
            </div>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MosaicDisplay;
