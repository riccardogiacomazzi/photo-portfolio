import "./NavBar.css";

const NavBar = ({ size, menuOpen, setMenuOpen, setDisplayPage, siteName, pages }) => {
  const handlePageChange = (page) => {
    setDisplayPage(page);
  };

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  return (
    <div className="test">
      <div className="site-name" onClick={() => handlePageChange("Home")}>
        {siteName}
      </div>
      {pages.map((page, index) => (
        <div className="button" key={index} onClick={() => handlePageChange(page)}>
          {page}
        </div>
      ))}
      {size.width > 764 && <div className={`menu-button ${menuOpen ? "" : "clicked"}`} onClick={handleMenuOpen}></div>}
    </div>
  );
};

export default NavBar;
