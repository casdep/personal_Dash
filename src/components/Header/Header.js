import React from "react";

import "./Header.scss";

import { IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

export default function Header() {
  function isAuthenticated() {
    if (document.cookie.indexOf("token=") !== -1) {
      return <a href="/planner">Planner</a>;
    }
  }

  function profileOrLoginButton() {
    if (document.cookie.indexOf("token=") !== -1) {
      return (
        <a href="/profile">
          <IconButton aria-label="close" size="large">
            <PersonIcon sx={{ color: "#1976d2" }} />
          </IconButton>
        </a>
      );
    } else {
      return <a href="/login">Login</a>;
    }
  }

  return (
    <header>
      <div className="header-wrapper-desktop">
        <div className="left">
          <a href="/">Cas de Pender</a>
        </div>

        <div className="center">
          {isAuthenticated()}
          <a href="/about">About</a>
        </div>
        <div className="right">
          <div>{profileOrLoginButton()}</div>
        </div>
      </div>
      <div className="header-wrapper-mobile">
        <IconButton aria-label="close" size="large">
          <MenuIcon sx={{ color: "#1976d2" }} />
        </IconButton>
        <a href="/">
          <IconButton aria-label="close" size="large">
            <HomeIcon sx={{ color: "#1976d2" }} />
          </IconButton>
        </a>
        <a href="/planner">
          <IconButton aria-label="close" size="large">
            <CalendarMonthIcon sx={{ color: "#1976d2" }} />
          </IconButton>
        </a>

        <div>{profileOrLoginButton()}</div>
      </div>
    </header>
  );
}
