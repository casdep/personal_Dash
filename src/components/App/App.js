import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import Home from "../Home/Home";
import About from "../../feature/about/about";
import Planner from "../../feature/planner/planner";
import PlannerCreate from "../../feature/planner/plannerCreate";
import Login from "../../feature/login/login";
import Register from "../../feature/login/register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="innerApp">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/planner-create-item" element={<PlannerCreate />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    );
  }
}
export default App;
