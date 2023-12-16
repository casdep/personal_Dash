import React, { useState } from "react";

import "./notes.scss";

import { useSelector, useDispatch } from "react-redux";

import { Button } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import NoteCreate from "./noteDialog";

import { noteDialogOpen, selectedNote } from "../../store/slicers/noteSlice";

export default function Notes() {
  const dispatch = useDispatch();

  const getNoteCreateOpen = useSelector(
    (state) => state.planner.plannerDialogOpen
  );

  const getNoteDialogOpen = useSelector((state) => state.note.noteDialogOpen);

  function editNote(id) {
    console.log(id);
  }

  function handleInputChange() {}

  function handleClickOpen() {
    dispatch(noteDialogOpen("create"));
  }

  function handleClose() {
    dispatch(noteDialogOpen(""));
  }

  function handleSubmit() {}

  const formValue = "";

  const notes = [
    {
      id: 1,
      content: "This is a simple string without any line breaks.",
    },
    {
      id: 2,
      content:
        "Here is a<br /> string<br /> with<br /> a<br /> line <br />break.<br />It continues on the next line.",
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
      content:
        "This <br />is<br /> a <br />simple<br /> string <br />without <br />any<br /> line<br /> breaks This <br />is<br /> a <br />simple<br /> string <br />without <br />any<br /> line<br /> breaks",
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
    {
      id: 9,
      content:
        "Another string without line breaks for variety and simplicity Another string without line breaks for variety and simplicity Another string without line breaks for variety and simplicity Another string without line breaks for variety and simplicity",
    },
  ];

  return (
    <div className="notes">
      <div className="pageTitle">
        <h1>Notes</h1>
      </div>
      {getNoteDialogOpen !== "" ? <NoteCreate /> : ""}
      <div className="topBar">
        <Button
          className="createButton"
          variant="contained"
          onClick={() => handleClickOpen()}
          size="large"
        >
          Create note
        </Button>
      </div>
      <div className="noteCreate"></div>
      <div className="notesWrapper">
        <ul>
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
    </div>
  );
}
