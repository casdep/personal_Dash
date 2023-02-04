import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./Header.css";

function Header() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="header">
      <a href="/" className="logo">
        Cas de Pender
      </a>
      <div className="header-right">
        <a href="/planner">Planner</a>
        <a href="/about">About</a>
        <a href="/login">Login</a>
        <Button className="darkMode-Hover" onClick={toggleTheme}>
          <span role="img" aria-label="dark mode button">
            🌙
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Header;
