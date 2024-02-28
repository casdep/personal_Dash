import React, { useEffect, useState } from "react";
import axios from "axios";

import "./notes.scss";

import { useSelector, useDispatch } from "react-redux";

import { Button, LinearProgress } from "@mui/material";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { getCookie } from "../../utils/getCookie";

import NoteCreate from "./noteDialog";
import { noteDialogOpen, selectedNote } from "../../store/slicers/noteSlice";

export default function Notes() {
  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();

  const getNoteDialogOpen = useSelector((state) => state.note.noteDialogOpen);

  const [notes, setNotes] = useState([]);
  const [notesLoader, setNotesLoader] = useState(false);

  function editNote(event, note) {
    if (event.detail === 2) {
      //removes the selected text, which is a result of doubble clicking
      window.getSelection().removeAllRanges();
      dispatch(selectedNote(note));
      dispatch(noteDialogOpen("edit"));
    }
  }

  function handleClickOpen() {
    dispatch(noteDialogOpen("create"));
  }

  async function getAllNotes(event) {
    setNotesLoader(true);

    await axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "/note-management/notes",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then(function (res) {
        const notes = res.data.data;
        setNotes(notes);
        setNotesLoader(false);
      })
      .catch(function (response) {});
  }

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
      <div className="create-button-mobile">
        <Fab color="primary" aria-label="add" onClick={() => handleClickOpen()}>
          <AddIcon />
        </Fab>
      </div>
      <div className="notesWrapper">
        {notesLoader ? <LinearProgress className="loader" /> : ""}

        <ul className="resultResultProfileCard">
          {notes.map((note, index) => {
            let id = note.id;
            return (
              <li
                onClick={(event) => editNote(event, note)}
                key={id}
                className="note"
              >
                <span dangerouslySetInnerHTML={{ __html: note.content }} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
