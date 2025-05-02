import "./Menu.css";

const Menu = ({ pages, setDisplayPage, setMenuOpen }) => {
  const handlePageSelect = (page) => {
    setDisplayPage(page);
    setMenuOpen(false);
  };

  return (
    <div className="menu-gradient">
      <div className="button" onClick={() => handlePageSelect("Home")}>
        Home
      </div>
      {pages.map((page, index) => {
        return (
          <div className="button" onClick={() => handlePageSelect(page)} key={index}>
            {page}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
