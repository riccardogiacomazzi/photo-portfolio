import "./MosaicDisplay.css";
import { useEffect, useRef } from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";

const MosaicDisplay = ({ itemData, setSelectedImage, size }) => {
  const handleMosaicClick = (index) => {
    setSelectedImage(itemData[index]);
  };

  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div ref={scrollRef} className="horizontal-list">
      {itemData && (
        <List role="menubar" orientation="horizontal">
          {itemData.map((item, index) => (
            <div key={index}>
              <ListItem role="none">
                <ListItemButton
                  className="no-bg-hover"
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
    </div>
  );
};

export default MosaicDisplay;
