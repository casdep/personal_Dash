import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./Home.css";

const image_dark = require("./home_mountain.jpg");
const image_light = require("./home_forest.jpg");

function Home() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  const getAppTheme = useSelector((state) => state.general.appTheme);

  //ToDo Leet checker

  return (
    <div className="Home">
      <div className="imageContainer">
        <img
          className="Image"
          src={getAppTheme === "dark" ? image_dark : image_light}
          alt=""
        />
        <div className="textCenter">
          <h1> HOME </h1>
          <h3> Welcome back Cas! </h3>
          <p>
            {dateState.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          <p>
            {dateState.toLocaleString("en-GB", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: false,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
