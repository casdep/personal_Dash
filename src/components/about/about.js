import React from "react";

import "./about.scss";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const About = () => {
  return (
    <div className="about">
      <div className="pageTitle">
        <h1>About</h1>
      </div>
      <div className="socials">
        <b>
          <p>Cas de Pender</p>
        </b>
        <a href="https://github.com/casdep" target="_blank" rel="noreferrer">
          <p>
            <GitHubIcon />
            Casdep
          </p>
        </a>
        <a
          href="https://nl.linkedin.com/in/cas-de-pender"
          target="_blank"
          rel="noreferrer"
        >
          <p>
            <LinkedInIcon />
            Cas de Pender
          </p>
        </a>
      </div>
      <br />
      <h2>Website developed with:</h2>
      <h3>Front-end</h3>
      <p>
        <b>Tech-stack</b> <br />
        Create-React-app <br />
        Material UI <br />
        SCSS
        <br />
        <b></b> <br />
      </p>
      <h3>Back-end</h3>
      <p>
        <b>Tech-stack</b> <br />
        Prisma - NodeJs Express <br />
        PostgreSQL- SQLDatabase <br />
        JWT
      </p>
    </div>
  );
};

export default About;
