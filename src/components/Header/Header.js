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
  const [open, setOpen] = useState(false);

  const handleClick = function (event) {
    setOpen(true);
  };

  const handleClose = function (route) {
    setOpen(false);
    navigate("/" + route);
  };

  const linkColorProfile = "#F2F2F2";
  const linkColorHome = "#1976d2";
  const linkColorPlanner = "#1976d2";
  const linkColorHamburgerMenu = "#1976d2";

  function isAuthenticated() {
    if (document.cookie.indexOf("token=") !== -1) {
      return (
        //this empty tag is needed as a parent tag
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
            <PersonIcon sx={{ color: linkColorProfile }} />
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
            <b>Cas de Pender</b>
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
        <IconButton
          aria-label="close"
          size="large"
          onClick={() => handleClick()}
        >
          <MenuIcon sx={{ color: linkColorHamburgerMenu }} />
        </IconButton>
        <Menu
          id="basic-menu"
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleClose("notes")}>Notes</MenuItem>
          <MenuItem onClick={() => handleClose("about")}>About</MenuItem>
        </Menu>
        <Link to="/">
          <IconButton aria-label="close" size="large" color={linkColorHome}>
            <HomeIcon color="secondary" />
          </IconButton>
        </Link>
        <Link to="/planner">
          <IconButton aria-label="close" size="large">
            <CalendarMonthIcon sx={{ color: linkColorPlanner }} />
          </IconButton>
        </Link>

        <div>{profileOrLoginButton()}</div>
      </div>
    </header>
  );
}
