import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { IconButton, Menu, MenuItem } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

export default function Header() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const logo = require("./../../assets/media/logo_white.png");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route) => {
    setAnchorEl(null);
    if (route) {
      navigate("/" + route);
    }
  };

  function isAuthenticated() {
    if (document.cookie.indexOf("token=") !== -1) {
      return (
        <>
          <Link to="/notes">Notes</Link>
          <Link to="/planner">Planner</Link>
        </>
      );
    }
  }

  function profileOrLoginButton() {
    if (document.cookie.indexOf("token=") !== -1) {
      return (
        <Link to="/profile">
          <IconButton aria-label="close" size="large">
            <PersonIcon />
          </IconButton>
        </Link>
      );
    } else {
      return <Link to="/login">Login</Link>;
    }
  }

  return (
    <header>
      <div className="header-wrapper-desktop">
        <div className="left">
          <Link to="/">
            <img className="logo" src={logo} alt="profile" />
          </Link>
        </div>

        <div className="center">
          {isAuthenticated()}
          <Link to="/about">About</Link>
        </div>
        <div className="right">
          <div>{profileOrLoginButton()}</div>
        </div>
      </div>
      <div className="header-wrapper-mobile">
        <IconButton aria-label="menu" size="large" onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          //next line checks if anchorEl is set
          open={Boolean(anchorEl)}
          onClose={() => handleClose()}
        >
          <MenuItem onClick={() => handleClose("notes")}>Notes</MenuItem>
          <MenuItem onClick={() => handleClose("about")}>About</MenuItem>
        </Menu>
        <Link to="/">
          <IconButton aria-label="close" size="large">
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/planner">
          <IconButton aria-label="close" size="large">
            <CalendarMonthIcon />
          </IconButton>
        </Link>

        <div>{profileOrLoginButton()}</div>
      </div>
    </header>
  );
}
