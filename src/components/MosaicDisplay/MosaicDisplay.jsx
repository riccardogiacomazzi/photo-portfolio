import "./MosaicDisplay.css";
import { useEffect, useRef } from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";

const MosaicDisplay = ({ itemData, selectedImage, setSelectedImage, size }) => {
  const scrollRef = useRef(null);
  const itemRefs = useRef([]); // store refs for each item

  const handleMosaicClick = (index) => {
    setSelectedImage(itemData[index]);
  };

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

  useEffect(() => {
    const selectedIndex = itemData.findIndex((item) => item.title === selectedImage?.title);
    const selectedRef = itemRefs.current[selectedIndex];

    if (selectedRef) {
      selectedRef.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedImage, itemData]);

  return (
    <div ref={scrollRef} className="horizontal-list">
      {itemData && (
        <List role="menubar" orientation="horizontal">
          {itemData.map((item, index) => (
            <div key={index} ref={(el) => (itemRefs.current[index] = el)}>
              <ListItem role="none">
                <ListItemButton
                  className="no-bg-hover"
                  onClick={() => handleMosaicClick(index)}
                  role="menuitem"
                  component="a"
                  aria-label="item-list"
                >
                  <img
                    className={selectedImage?.title === item.title ? "image-small-selected" : "image-small"}
                    src={item.img.small}
                    alt={item.title}
                    loading="lazy"
                  />
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
