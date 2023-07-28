import React from "react";

import "./Header.scss";

import { IconButton } from "@mui/material";
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
      <div className="header-wrapper">
        <a href="/" className="logo">
          Cas de Pender
        </a>
        <div className="header-right">
          {isAuthenticated()}

          <a href="/about">About</a>
          <div className="profile-desktop">{profileOrLoginButton()}</div>
          <a href="/" className="home">
            Home
          </a>
          <div className="profile-phone">{profileOrLoginButton()}</div>
        </div>
      </div>
    </header>
  );
}
