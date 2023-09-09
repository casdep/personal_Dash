import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./App.scss";
import "../../assets/scss/theme.scss";

import Snackbar from "@mui/material/Snackbar";

import { privateRoute as PrivateRoute } from "../privateRoute";
import Header from "../Header/Header";
import Home from "../Home/Home";
import About from "../../feature/about/about";
import Profile from "../../feature/profile/profile";
import Planner from "../../feature/planner/planner";
import Login from "../../feature/login/login";
import Register from "../../feature/login/register";
import ResetPassword from "../../feature/login/resetPassword";

export default function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTheme();
    checkStartPage();
    checkServerStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setTheme() {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "dark");
    }
  }

  function checkStartPage() {
    if (!sessionStorage.getItem("isNewSession")) {
      sessionStorage.setItem("isNewSession", "false");
      navigate("/planner");
    }
  }
  async function checkServerStatus() {
    try {
      await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL,
      }).then((res) => {});
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setSnackbarOpen(true);
      }
    }
  }
  function handleClose() {
    setSnackbarOpen(false);
  }

  const getAppTheme = useSelector((state) => state.general.appTheme);
  return (
    <div className={getAppTheme || "dark"}>
      <Header />
      <div className="innerApp">
        <Snackbar
          open={snackbarOpen}
          onClose={handleClose}
          autoHideDuration={6000}
          sx={{ margin: "75px 0 0" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          severity="info"
          message="There appears to be a problem with the server. Please try again later."
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/planner" element={<Planner />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}
