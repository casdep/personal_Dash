import React from "react";

import "./notes.scss";

export default function Notes() {
  function editNote(id) {
    console.log(id);
  }

  const notes = [
    {
      id: 1,
      content: "This is a simple string without any line breaks.",
    },
    {
      id: 2,
      content:
        "Here is a string with a line break.<br />It continues on the next line.",
    },
    {
      id: 3,
      content:
        "This string<br />has multiple<br />line breaks<br />spread across<br />several lines.",
    },
    {
      id: 4,
      content: "Another string without line breaks for variety and simplicity.",
    },
    {
      id: 5,
      content: "This is a simple string without any line breaks.",
    },
    {
      id: 6,
      content:
        "Here is a string with a line break.<br />It continues on the next line.",
    },
    {
      id: 7,
      content:
        "This string<br />has multiple<br />line breaks<br />spread across<br />several lines.",
    },
    {
      id: 8,
      content: "Another string without line breaks for variety and simplicity.",
    },
  ];

  return (
    <div className="notes">
      <div className="pageTitle">
        <h1>Notes</h1>
      </div>
      <ul className="notesWrapper">
        {notes.map((note, index) => {
          let id = note.id;
          return (
            <li onClick={() => editNote(id)} key={id} className="note">
              <span dangerouslySetInnerHTML={{ __html: note.content }} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
