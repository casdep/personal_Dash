import React, { useEffect, useState } from "react";
import axios from "axios";

import getAllTasks from "./planner";
import handleInputChange from "./planner";
import setFormValue from "./planner";
import setTasks from "./planner";

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

import { CloseIcon } from "@mui/icons-material/Close";

import "./plannerCreate.css";

export default function plannerCreate() {
  const plannerCreate = () => {
    const [formValue, setformValue] = React.useState({
      title: "",
      category: "",
      discription: "",
    });

    const handleChange = (event) => {
      console.log(event);
      // setformValue({
      //   ...formValue,
      //   [event.target.name]: event.target.value,
      // });
    };

    async function handleCreateSubmit(event) {
      console.log("Aap waterkippie11 " + event);

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
          setCreateDialogOpen(false);
          setTasks([]);
          getAllTasks();
          setFormValue({
            user: "cas",
            title: "",
            category: "",
            discription: "",
            priority: 1,
          });
        });
        console.log(window.location);
      } catch (error) {
        setCreateDialogOpen(false);
        console.log(error);
      }
    }

    return (
      <Dialog
        open={openCreateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleCreateSubmit}>
          <div className="dialog-create-container">
            <div className="dialog-create-item">
              <DialogTitle id="alert-dialog-title">Create new task</DialogTitle>
            </div>

            <div className="dialog-create-item_right" size="small">
              <IconButton
                aria-label="close"
                size="large"
                onClick={() => dismissDialog()}
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
            <Button type="submit" value="Submit">
              Create task
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
}
