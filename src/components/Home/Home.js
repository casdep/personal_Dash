import React, { useState, useEffect } from "react";

import "./Home.css";

const image = require("./home_mountain.jpg");

function Home() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  //ToDo Leet checker

  return (
    <div className="Home">
      <div class="shadow">
        <img className="Image" src={image} alt="" />
      </div>
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
  );
}

export default Home;
