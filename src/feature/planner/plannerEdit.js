import React, { useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import handleInputChange from "./planner";
import getAllTasks from "./planner";
import setTasks from "./planner";

import { editDialogOpen } from "../../store/slicers/plannerSlice";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "./plannerCreate.css";

export default function PlannerEdit() {
  const dispatch = useDispatch();

  const getEditDialogOpen = useSelector(
    (state) => state.planner.editDialogOpen
  );

  const [formValue, setFormValue] = useState({
    id: "",
    user: "cas",
    title: "",
    category: "",
    discription: "",
    priority: 1,
  });

  return (
    <Dialog
      open={getEditDialogOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="dialog-edit-container">
        <div className="dialog-edit-item">
          <DialogTitle id="alert-dialog-title">Edit a task</DialogTitle>
        </div>

        <div className="dialog-edit-item_right" size="small">
          <IconButton
            aria-label="close"
            size="large"
            onClick={() => dispatch(editDialogOpen(false))}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextField
            type="title"
            name="title"
            id="outlined-basic"
            variant="outlined"
            margin="normal"
            color="primary"
            label="Title"
            value={formValue.title}
            onChange={handleInputChange}
            focused
          />
          <br />
          <TextField
            required
            className="createItemCategoryTextfield"
            type="category"
            name="category"
            id="outlined-basic"
            variant="outlined"
            margin="normal"
            color="primary"
            label="Category"
            value={formValue.category}
            onChange={handleInputChange}
            focused
          />
          <TextField
            required
            className="createItemPriorityTextfield"
            name="priority"
            id="outlined-basic"
            variant="outlined"
            margin="normal"
            color="primary"
            label="Priority"
            type="number"
            value={formValue.priority}
            onChange={handleInputChange}
            focused
            inputProps={{
              min: "0",
              max: "10",
              step: "1",
              inputMode: "numeric",
            }}
          />
          <TextField
            type="discription"
            name="discription"
            id="outlined-basic"
            variant="outlined"
            margin="normal"
            color="primary"
            label="Discription"
            value={formValue.discription}
            onChange={handleInputChange}
            focused
            fullWidth
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={() => handleEditSubmit()} autoFocus> */}
        Save task
        {/* </Button>ll */}
      </DialogActions>
    </Dialog>
  );
}
