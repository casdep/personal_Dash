import React from "react";

const About = () => {
  return (
    <div className="about">
      <div className="pageTitle">
        <h1>About</h1>
      </div>
      <b>
        <p>Cas de Pender</p>
      </b>
      <a href="https://github.com/casdep" target="_blank" rel="noreferrer">
        <p>Github</p>
      </a>
      <a
        href="https://nl.linkedin.com/in/cas-de-pender"
        target="_blank"
        rel="noreferrer"
      >
        <p>LinkedIn</p>
      </a>
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
