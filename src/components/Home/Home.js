import React from "react";
import { useSelector } from "react-redux";

import { Button } from "@mui/material";

import "./Home.scss";

import { getTokenValue } from "../../utils/getTokenValue";

const image_dark = require("./image_dark.png");
const image_light = require("./image_light.jpg");

function Home() {
  const getAppTheme = useSelector((state) => state.general.appTheme);

  function welcomBack() {
    if (document.cookie.indexOf("token=") !== -1) {
      return "Welcome back " + getTokenValue("username");
    }
  }

  //ToDo Leet checker

  return (
    <div className="home">
      <div className="intro">
        <div className="left">
          <h1 className="slogan">
            One dashboard, <br /> one portfolio
          </h1>
          <div className="undertext">
            <p className="welcomeBack">{welcomBack()}</p>
          </div>
          <div className="details">
            <p>See full overview of information</p>
            <a href="/about>">
              <Button variant="contained">View details here</Button>
            </a>
          </div>
        </div>
        <div className="right">
          <img
            className="image"
            src={getAppTheme === "light" ? image_light : image_dark}
            alt="homepage"
          />
        </div>
      </div>
      <hr />

      <div className="homeBody">
        <p>Jump right back in</p>
      </div>
    </div>
  );
}

export default Home;
