import "./App.css";
import info from "./assets/info";
import SimpleAppBar from "./components/SimpleAppBar";
import { useState, useEffect } from "react";
import FlickrAPI from "./services/flickrService";
import PhotoDisplay from "./components/PhotoDisplay";
import { useWindowSize } from "@uidotdev/usehooks";
import Works from "./components/Works";
import Contact from "./components/Contact";
import Menu from "./components/Menu";

function App() {
  const [displayPage, setDisplayPage] = useState("Home");
  const [itemData, setItemData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const size = useWindowSize();

  //SETUP
  const siteName = "Photo Portfolio";
  const pages = ["Works", "Info"];
  const visibleTags = ["Landscapes", "Urban", "People", "TouchDesigner", "Morocco", "Yerevan"];
  const infoText = info;

  //photo fetching on app rendering
  useEffect(() => {
    const flickrService = async () => {
      const data = await FlickrAPI.FlickrPhotos();
      setItemData(data.itemData);
    };

    flickrService();
  }, []);

  return (
    <div>
      <SimpleAppBar
        siteName={siteName}
        pages={pages}
        setDisplayPage={setDisplayPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {displayPage === "Home" && menuOpen === false && <PhotoDisplay itemData={itemData} size={size} />}
      {displayPage === "Info" && menuOpen === false && <Contact itemData={itemData} infoText={infoText} size={size} />}
      {displayPage === "Works" && menuOpen === false && (
        <Works itemData={itemData} visibleTags={visibleTags} size={size} />
      )}
      {menuOpen && (
        <Menu pages={pages} displayPage={displayPage} setDisplayPage={setDisplayPage} setMenuOpen={setMenuOpen} />
      )}
    </div>
  );
}

export default App;
