import React from "react";

import "./notes.scss";

export default function Notes() {
  return (
    <div className="notes">
      <div className="pageTitle">
        <h1>Notes</h1>
      </div>
      <div>
        <div className="notesWrapper">
          <div className="note">
            <p>
              First row <br />
              Second row <br />
              Third row
            </p>
          </div>
          <div className="note">
            <p>
              First row <br />
              Second row <br />
              Third row
            </p>
          </div>
          <div className="note">
            <p>
              First row <br />
              Second row <br />
              Third row
            </p>
          </div>
          <div className="note">
            <p>
              First row <br />
              Second row <br />
              Third row
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
