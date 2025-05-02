import "./App.css";

import info from "./assets/info";
import SimpleAppBar from "./components/SimpleAppBar";
import NavBar from "./components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { useImages } from "./components/ImageContext";
import FlickrAPI from "./services/flickrService";
import PhotoDisplay from "./components/PhotoDisplay";
import { useWindowSize } from "@uidotdev/usehooks";
import Works from "./components/Works";
import Contact from "./components/Contact/Contact";
import Menu from "./components/Menu/Menu";

function App() {
  const [displayPage, setDisplayPage] = useState("Home");
  const [itemData, setItemData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgImage, setBgImage] = useState();

  const size = useWindowSize();

  //SETUP
  const siteName = "Riccardo Giacomazzi";
  const pages = ["Albums", "Info"];
  const visibleTags = ["Landscapes", "Urban", "People", "TouchDesigner"];
  const infoText = info;

  //photo fetching and caching

  // useEffect(() => {
  //   const flickrService = async () => {
  //     const data = await FlickrAPI.FlickrPhotos();
  //     setItemData(data.itemData);
  //   };

  //   flickrService();
  // }, []);

  useEffect(() => {
    console.log(displayPage);
  }, [displayPage]);

  const cachedImages = useImages();

  return (
    <div>
      {/* <SimpleAppBar
        siteName={siteName}
        pages={pages}
        setDisplayPage={setDisplayPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      /> */}
      <NavBar
        size={size}
        siteName={siteName}
        pages={pages}
        setDisplayPage={setDisplayPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      {menuOpen && (
        <Menu pages={pages} displayPage={displayPage} setDisplayPage={setDisplayPage} setMenuOpen={setMenuOpen} />
      )}
      {displayPage === "Home" && menuOpen === false && (
        <PhotoDisplay itemData={cachedImages} size={size} setBgImage={setBgImage} />
      )}
      {displayPage === "Info" && menuOpen === false && <Contact infoText={infoText} size={size} bgImage={bgImage} />}
      {displayPage === "Albums" && menuOpen === false && (
        <Works itemData={cachedImages} visibleTags={visibleTags} size={size} />
      )}
    </div>
  );
}

export default App;
