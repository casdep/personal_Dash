import * as React from "react";
import { TextField, Button } from "@mui/material";
import "./Header.css";

const dummyOnClick = () => {
  console.log("Dummy onClick for dark mode");
};

function Header() {
  return (
    <div className="header">
      <a href="/" className="logo">
        Cas de Pender
      </a>
      <div className="header-right">
        <a href="/planner">Planner</a>
        <a href="/about">About</a>
        <a href="/login">Login</a>
        <Button className="darkMode-Hover" onClick={dummyOnClick}>
          <span role="img" aria-label="dark mode button">
            🌙
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Header;
