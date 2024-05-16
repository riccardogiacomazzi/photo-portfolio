import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

const SimpleAppBar = ({ menuOpen, setMenuOpen, setDisplayPage, siteName, pages }) => {
  const handlePageChange = (page) => {
    setDisplayPage(page);
  };

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* WEB VIEW NAME */}

          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => handlePageChange("Home")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".01rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
              border: "none",
              outline: "none",
            }}
          >
            {siteName}
          </Typography>

          {/* Menu Icon on mobile view */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => handleMenuOpen()}
              color="inherit"
            >
              {menuOpen === false ? <MenuIcon /> : <CloseIcon />}
            </IconButton>
          </Box>

          {/* MOBILE VIEW NAME */}

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => handlePageChange("Home")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "sans-serif",
              fontWeight: 300,
              letterSpacing: ".0.5rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {siteName}
          </Typography>
          {/* WEB VERSION PAGE BUTTONS */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default SimpleAppBar;
