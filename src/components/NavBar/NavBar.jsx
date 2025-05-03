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
