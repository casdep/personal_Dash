import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { plannerDialogOpen } from "../../store/slicers/plannerSlice";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "./plannerCreate.css";

export default function PlannerCreate() {
  const dispatch = useDispatch();

  const getPlannerDialogOpen = useSelector(
    (state) => state.planner.plannerDialogOpen
  );

  const getSelectedTask = useSelector((state) => state.planner.selectedTask);

  const [formValue, setFormValue] = useState({
    id: "",
    user: "cas",
    title: "",
    category: "",
    discription: "",
    priority: 1,
  });

  useEffect(() => {
    if (getPlannerDialogOpen === "edit") {
      setEditValues();
    }
  }, []);

  function setEditValues() {
    console.log(" aapwwwwwwwwwwwwwwwwwwwwwwwwwwje");

    for (const key in getSelectedTask) {
      const value = getSelectedTask[key];

      setFormValue((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  }

  function handleInputChange(event) {
    const target = event.target;
    var value = target.value;
    const key = target.name;

    if (key === "priority") {
      if (value === "") {
        //Allows inputfield to be empty
      } else if (value < 1) {
        value = 1;
      } else if (value > 10) {
        value = 10;
      }
    }

    //sets the entered value to their according key in the state
    setFormValue({
      ...formValue,
      [key]: value,
    });
  }

  async function handleSubmit(event) {
    if (getPlannerDialogOpen === "create") {
      createTask();
    } else {
      handleEditSubmit();
    }
  }

  async function createTask() {
    const createTaskFormData = new URLSearchParams();
    // const createTaskFormData = new FormData();

    createTaskFormData.append("user", formValue.user);
    createTaskFormData.append("title", formValue.title);
    createTaskFormData.append("category", formValue.category);
    createTaskFormData.append("discription", formValue.discription);
    createTaskFormData.append("priority", formValue.priority);

    try {
      await axios({
        method: "post",
        url: "http://localhost:3001/task-management/tasks",
        data: createTaskFormData,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        setFormValue({
          user: "cas",
          title: "",
          category: "",
          discription: "",
          priority: 1,
        });
        dispatch(plannerDialogOpen(""));
        //reloads the page to retreive the newly created item
        window.location.reload();
      });
    } catch (error) {
      dispatch(plannerDialogOpen(""));
      console.log(error);
    }
  }

  async function handleEditSubmit(event) {
    console.log(event);
    const editTaskFormData = new URLSearchParams();
    // const createTaskFormData = new FormData();

    console.log(formValue.id);

    editTaskFormData.append("user", formValue.user);
    editTaskFormData.append("title", formValue.title);
    editTaskFormData.append("category", formValue.category);
    editTaskFormData.append("discription", formValue.discription);
    editTaskFormData.append("priority", formValue.priority);

    try {
      await axios({
        method: "put",
        url: "http://localhost:3001/task-management/tasks/" + formValue.id,
        data: editTaskFormData,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        setFormValue({
          id: "",
          user: "cas",
          title: "",
          category: "",
          discription: "",
          priority: 1,
        });
        dispatch(plannerDialogOpen(""));
        //reloads the page to retreive the new item
        window.location.reload();
      });
      console.log(window.location);
    } catch (error) {
      dispatch(plannerDialogOpen(""));
      console.log(error);
    }
  }

  return (
    <Dialog
      open={getPlannerDialogOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleSubmit}>
        <div className="dialog-create-container">
          <div className="dialog-create-item">
            <DialogTitle id="alert-dialog-title">
              {getPlannerDialogOpen === "edit"
                ? "Edit a task"
                : "Create new task"}
            </DialogTitle>
          </div>

          <div className="dialog-create-item_right" size="small">
            <IconButton
              aria-label="close"
              size="large"
              onClick={() => dispatch(plannerDialogOpen(""))}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              required
              type="title"
              name="title"
              id="outlined-basic"
              variant="outlined"
              margin="normal"
              color="primary"
              label="Title"
              value={formValue.title}
              onChange={handleInputChange}
              // onChange={(e) => setName(e.target.value)}
              focused
            />
            <br />
            <TextField
              required
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
          <Button onClick={handleSubmit}>
            {getPlannerDialogOpen === "edit" ? "Save task" : "Create task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
