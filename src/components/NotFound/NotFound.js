import React from "react";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="about">
      <div className="pageTitle">
        <h1>404 - NotFound</h1>
      </div>
      <p>How did we get here?</p>

      <Link to="/"> Go Home ... </Link>
    </div>
  );
};

export default NotFound;
