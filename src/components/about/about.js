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
      <p>
        Casdepender.nl is a both a tool used for task and note management and a
        portfolio/skill showcase. <br />
        This is done using personal accounts, a ToDo-list and using a note's
        page. All data is secured and only accessible to the respective user.
      </p>
      <br />
      <h2>Website developed with:</h2>
      <div className="container">
        <div className="left-div">
          <h3>Front-end</h3>
          <p>
            - Create-React-app (React and Redux) <br />
            - Material UI <br />
            - SCSS
            <br />
            <br />
          </p>
        </div>
        <div className="right-div">
          <h3>Back-end</h3>
          <p>
            - Prisma - NodeJs Express <br />
            - PostgreSQL- SQLDatabase <br />- JWT
          </p>
        </div>
      </div>
      <div className="container">
        <div className="left-div">
          <h3>Functional</h3>
          <p>
            - User accounts with roles
            <br />
            - Profile browsing (Admin only) <br />
            - Favourite starting pages, loaded per first session visit <br />
            - ToDo items (Planner) with sort and filter <br />
            - Notes using the DraftJs library, including HTML sanitization{" "}
            <br />
            - Custom profile picture or GIF <br />
            - Black and white theme <br />
          </p>
        </div>
        <div className="right-div">
          <h3>Technical</h3>
          <p>
            - Authentication with JSON Web Tokens <br />
            - Hashed user passwords <br />
            - Back-end filtering to reduce unnecessary payload size <br />
            - PWA support <br />- Utilization of both cookies and local stroge
          </p>
        </div>
      </div>
      <div className="socials">
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
    </div>
  );
};

export default About;
