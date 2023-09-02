import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.scss";
import "../../assets/scss/theme.scss";

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
  const navigate = useNavigate();

  useEffect(() => {
    setTheme();
    checkStartPage();
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

  const getAppTheme = useSelector((state) => state.general.appTheme);
  return (
    <div className={getAppTheme || "dark"}>
      <Header />
      <div className="innerApp">
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
