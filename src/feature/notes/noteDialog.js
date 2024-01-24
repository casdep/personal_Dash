import React, { useRef, useState, useEffect } from "react";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

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

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  const getNoteDialogOpen = useSelector(
    (state) => state.planner.noteDialogOpen
  );

  function handleSubmit() {
    if (convertedContent !== "<p></p>") {
      
    }
    dispatch(noteDialogOpen(""));
  }

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
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "fontFamily",
                  "list",
                  "colorPicker",
                  "link",
                  "remove",
                  "history",
                ],
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
