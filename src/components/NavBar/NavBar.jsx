import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = ({ size, menuOpen, setMenuOpen, setDisplayPage, siteName, pages }) => {
  const navigate = useNavigate();
  const handlePageChange = (page) => {
    const path = page === "Home" ? "/" : `/${page.toLowerCase()}`;
    navigate(path);
  };

  return (
    <div className="main">
      <div className="site-name" onClick={() => handlePageChange("Home")}>
        {siteName}
      </div>
      {pages.map((page, index) => (
        <div className="button" key={index} onClick={() => handlePageChange(page)}>
          {page}
        </div>
      ))}
    </div>
  );
};

export default NavBar;
