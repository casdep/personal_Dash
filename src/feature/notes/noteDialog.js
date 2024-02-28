import React, { useState, useEffect } from "react";
import axios from "axios";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { convertToHTML } from "draft-convert";
// import DOMPurify from "dompurify";

import "./noteDialog.scss";

import { useSelector, useDispatch } from "react-redux";

import { getCookie } from "../../utils/getCookie";

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

  const getNoteDialogOpen = useSelector((state) => state.note.noteDialogOpen);
  const getSelectedNote = useSelector((state) => state.note.selectedNote);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState("");
  const [isPageAlreadyLoaded, setIsPageAlreadyLoaded] = useState(false);
  const [openNoteDeleteConfirmation, setOpenNoteDeleteConfirmation] =
    useState(false);

  useEffect(() => {
    if (getNoteDialogOpen === "edit" && isPageAlreadyLoaded === false) {
      //this prevents the page from rerendering in this useEffect
      setIsPageAlreadyLoaded(true);
      setEditValue();
    }
    if (editorState) {
      let html = convertToHTML(editorState.getCurrentContent());
      setConvertedContent(html);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState, getNoteDialogOpen]);

  function setEditValue() {
    const editValueToContent = EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(getSelectedNote.content)
      )
    );
    setEditorState(editValueToContent);
  }

  async function handleSubmit() {
    if (convertedContent !== "<p></p>") {
      try {
        await axios({
          method: "post",
          url: process.env.REACT_APP_API_URL + "/note-management/notes",
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
          data: { noteContent: convertedContent },
        }).then((res) => {
          dispatch(noteDialogOpen(""));
          //reloads the page to retreive the new item
          window.location.reload();
        });
      } catch (error) {
        dispatch(noteDialogOpen(""));
      }
    }
    dispatch(noteDialogOpen(""));
  }

  function handleClose(event, reason) {
    if (reason && reason === "backdropClick") {
      dispatch(noteDialogOpen(""));
    }
  }

  function handleCloseDeleteNoteDialog() {
    setOpenNoteDeleteConfirmation(false);
  }

  async function handleDeleteNote() {
    try {
      await axios({
        method: "delete",
        url:
          process.env.REACT_APP_API_URL +
          "/note-management/notes/" +
          getSelectedNote.id,
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
      }).then((res) => {
        setOpenNoteDeleteConfirmation(false);
        //reloads the page to retreive the current items
        window.location.reload();
      });
    } catch (error) {
      setOpenNoteDeleteConfirmation(false);
    }
  }

  return (
    <div>
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
                {getNoteDialogOpen === "edit"
                  ? "Edit a note"
                  : "Create new note"}
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
                    "history",
                  ],
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {getNoteDialogOpen === "edit" && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpenNoteDeleteConfirmation(true)}
              >
                Delete Note
              </Button>
            )}
            <Button variant="contained" onClick={handleSubmit}>
              {getNoteDialogOpen === "edit" ? "Save note" : "Create note"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={openNoteDeleteConfirmation}
        onClose={handleDeleteNote}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseDeleteNoteDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle id="alert-dialog-title">Delete note</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>Are you sure you want to delete this note?</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteNoteDialog}>No</Button>
          <Button onClick={handleDeleteNote}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
