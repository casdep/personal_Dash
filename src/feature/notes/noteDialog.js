import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import "./noteDialog.scss";

import { useSelector, useDispatch } from "react-redux";

import { noteDialogOpen } from "../../store/slicers/noteSlice";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

export default function NoteCreate() {
  const dispatch = useDispatch();

  const getNoteDialogOpen = useSelector(
    (state) => state.planner.noteDialogOpen
  );

  const editorRef = useRef(null);
  if (editorRef.current) {
    console.log(editorRef.current.getContent());
  }

  function handleSubmit() {}

  function handleClose(event, reason) {
    if (reason && reason === "backdropClick") {
      dispatch(noteDialogOpen(""));
    }
  }

  return (
    <Dialog
      className="notesDialog"
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form className="createNoteForm" onSubmit={handleSubmit}>
        <div className="dialog-create-container">
          <div className="dialog-create-item">
            <DialogTitle id="alert-dialog-title">
              {getNoteDialogOpen === "edit" ? "Edit a note" : "Create new note"}
            </DialogTitle>
          </div>
          <div className="dialog-create-item_right" size="small">
            <IconButton
              aria-label="close"
              size="large"
              onClick={() => dispatch(noteDialogOpen(""))}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Editor
              apiKey="your-api-key"
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit}>
            {getNoteDialogOpen === "edit" ? "Save note" : "Create note"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
