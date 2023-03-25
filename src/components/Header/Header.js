import React from "react";
import { Button } from "@mui/material";
import "./Header.css";

import { useDispatch, useSelector } from "react-redux";

import { appTheme } from "../../store/slicers/generalSlice";

export default function Header() {
  const dispatch = useDispatch();

  const getAppTheme = useSelector((state) => state.general.appTheme);

  function switchDarkmode() {
    if (getAppTheme === "dark") {
      dispatch(appTheme("light"));
    } else {
      dispatch(appTheme("dark"));
    }
  }

  return (
    <div className="header">
      <a href="/" className="logo">
        Cas de Pender
      </a>
      <div className="header-right">
        <a href="/planner">Planner</a>
        <a href="/about">About</a>
        <a href="/login">Login</a>
        <Button className="darkMode-Hover" onClick={() => switchDarkmode()}>
          <span role="img" aria-label="dark mode button">
            🌙
          </span>
        </Button>
      </div>
    </div>
  );
}
