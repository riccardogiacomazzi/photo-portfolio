import { Box, Button, Typography } from "@mui/material";

const Menu = ({ pages, setDisplayPage, setMenuOpen }) => {
  const handlePageSelect = (page) => {
    setDisplayPage(page);
    setMenuOpen(false);
  };

  return (
    <Box className="main-flex">
      <Button onClick={() => handlePageSelect("Home")}>
        <Typography>Home</Typography>
      </Button>
      {pages.map((page, index) => {
        return (
          <Button onClick={() => handlePageSelect(page)} key={index}>
            <Typography>{page}</Typography>
          </Button>
        );
      })}
    </Box>
  );
};

export default Menu;
