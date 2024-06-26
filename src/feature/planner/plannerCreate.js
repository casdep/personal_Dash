import React, { useState, useEffect } from "react";
import axios from "axios";

import "./plannerCreate.scss";

import { useSelector, useDispatch } from "react-redux";

import { plannerDialogOpen } from "../../store/slicers/plannerSlice";
import { getCookie } from "../../utils/getCookie";

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

export default function PlannerCreate() {
  const dispatch = useDispatch();

  const getPlannerDialogOpen = useSelector(
    (state) => state.planner.plannerDialogOpen
  );

  const getSelectedTask = useSelector((state) => state.planner.selectedTask);

  const [formValue, setFormValue] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    priority: 1,
  });
  const [titleError, setTitleError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    if (getPlannerDialogOpen === "edit") {
      setEditValues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setEditValues() {
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
      if (value.match(".") || value.match(",")) {
        value = parseInt(value);
      }
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

    if (!formValue.title) {
      setTitleError("Please enter a title");
    } else {
      setTitleError();
    }

    if (!formValue.category) {
      setCategoryError("Please enter a category");
    } else {
      setCategoryError();
    }

    createTaskFormData.append("title", formValue.title);
    createTaskFormData.append("category", formValue.category);
    createTaskFormData.append("priority", formValue.priority);
    createTaskFormData.append("description", formValue.description);

    try {
      await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/task-management/tasks",
        data: createTaskFormData,
        headers: {
          Authorization: "Bearer " + getCookie("token"),
          "content-type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        setFormValue({
          title: "",
          category: "",
          description: "",
          priority: 1,
        });
        dispatch(plannerDialogOpen(""));
        //reloads the page to retreive the newly created item
        window.location.reload();
      });
    } catch (error) {
      dispatch(plannerDialogOpen(""));
    }
  }

  async function handleEditSubmit(event) {
    const editTaskFormData = new URLSearchParams();

    editTaskFormData.append("user", formValue.user);
    editTaskFormData.append("title", formValue.title);
    editTaskFormData.append("category", formValue.category);
    editTaskFormData.append("description", formValue.description);
    editTaskFormData.append("priority", formValue.priority);

    try {
      await axios({
        method: "put",
        url:
          process.env.REACT_APP_API_URL +
          "/task-management/tasks/" +
          formValue.id,
        data: editTaskFormData,
        headers: {
          Authorization: "Bearer " + getCookie("token"),
          "content-type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        setFormValue({
          id: "",
          title: "",
          category: "",
          description: "",
          priority: 1,
        });
        dispatch(plannerDialogOpen(""));
        //reloads the page to retreive the new item
        window.location.reload();
      });
    } catch (error) {
      dispatch(plannerDialogOpen(""));
    }
  }

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") {
      dispatch(plannerDialogOpen(""));
    }
  };

  return (
    <div className="plannerCreate">
      <Dialog
        open={true}
        onClose={handleClose}
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
                type="text"
                name="title"
                label="Title*"
                id="outlined-basic"
                margin="normal"
                fullWidth
                value={formValue.title}
                onChange={handleInputChange}
                error={titleError}
                helperText={titleError}
              />
              <br />
              <TextField
                type="text"
                name="category"
                label="Category*"
                className="createItemCategoryTextfield"
                margin="normal"
                value={formValue.category}
                onChange={handleInputChange}
                error={categoryError}
                helperText={categoryError}
              />

              <TextField
                type="number"
                name="priority"
                label="Priority*"
                className="createItemPriorityTextfield"
                id="outlined-basic"
                margin="normal"
                value={formValue.priority}
                onChange={handleInputChange}
              />
              <TextField
                type="text"
                name="description"
                label="Description"
                id="outlined-basic"
                margin="normal"
                value={formValue.description}
                onChange={handleInputChange}
                fullWidth
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleSubmit}>
              {getPlannerDialogOpen === "edit" ? "Save task" : "Create task"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
