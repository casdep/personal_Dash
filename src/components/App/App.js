import React from "react";
import { Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

import "./App.scss";
import "../../assets/scss/theme.scss";

import Header from "../Header/Header";
import Home from "../Home/Home";
import About from "../../feature/about/about";
import Planner from "../../feature/planner/planner";
import Login from "../../feature/login/login";
import Register from "../../feature/login/register";

export default function App() {
  const getAppTheme = useSelector((state) => state.general.appTheme);
  return (
    <div className={getAppTheme}>
      <Header />
      <div className="innerApp">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}
