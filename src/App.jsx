import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import info from "./assets/info";
import NavBar from "./components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { useImages } from "./components/ImageContext";
import PhotoDisplay from "./components/PhotoDisplay/PhotoDisplay";
import { useWindowSize } from "@uidotdev/usehooks";
import Works from "./components/Works/Works";
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

  const cachedImages = useImages();

  useEffect(() => {
    const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomImage = randomIntBetween(0, cachedImages.length - 1);
    setBgImage(cachedImages[randomImage]);
  }, []);

  return (
    <BrowserRouter>
      <div className="master">
        <div className="navbar-container">
          <NavBar size={size} siteName={siteName} pages={pages} setMenuOpen={setMenuOpen} />
        </div>

        {menuOpen && <Menu pages={pages} setMenuOpen={setMenuOpen} />}

        {!menuOpen && (
          <Routes>
            <Route path="/" element={<PhotoDisplay itemData={cachedImages} size={size} setBgImage={setBgImage} />} />
            <Route path="/info" element={<Contact infoText={infoText} size={size} bgImage={bgImage} />} />
            <Route path="/albums" element={<Works itemData={cachedImages} visibleTags={visibleTags} size={size} />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
