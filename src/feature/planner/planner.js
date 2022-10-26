import React, { useEffect, useState } from "react";

import axios from "axios";

import { TextField, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import "./planner.css";

export default function Planner() {
  const [anchorEl, setAnchorEl] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [tasksCategories, setTasksCategories] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(
    "Select filter"
  );
  const [tasksLoader, setTasksLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCreateDialog, setCreateDialogOpen] = useState(false);
  const [openEditDialog, setEditDialogOpen] = useState(false);
  const [taskToDeleteName, setTaskToDeleteName] = useState("");

  const [formValue, setformValue] = useState({
    user: "cas",
    title: "",
    category: "",
    discription: "",
    priority: 0,
  });

  const openHamburgerMenu = Boolean(anchorEl);
  const handleHambuerMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  async function getAllTasks() {
    setTasksLoader(true);
    await axios({
      method: "get",
      url: "http://localhost:3001/tasks",
    })
      .then(function(res) {
        const tasks = res.data.data;
        setTasks(tasks);
        setTasksLoader(false);

        const uniqueCategories = [
          ...new Set(tasks.map((task) => task.category)),
        ];
        setTasksCategories(uniqueCategories);
      })
      .catch(function(response) {
        console.log(response);
      });
  }

  function createHandleClickOpen() {
    setCreateDialogOpen(true);
  }

  function handleHamburgerMenuClose() {
    setAnchorEl(null);
  }

  function handleClickOpen(value) {
    setTaskToDeleteName(value.title);
    setOpen(true);
  }

  function handleEditOpen(value) {
    setEditDialogOpen(true);
  }

  function dismissDialog() {
    setOpen(false);
    setCreateDialogOpen(false);
  }

  async function acceptDeleteDialog(value) {
    try {
      const response = await axios({
        method: "delete",
        url: "http://localhost:3001/task/" + value.id,
        headers: { "Content-Type": "form-data" },
      }).then((res) => {
        setOpen(false);
        setTasks([]);
        getAllTasks();
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function acceptCreateTask() {
    const createTaskFormData = new URLSearchParams();

    createTaskFormData.append("user", formValue.user);
    createTaskFormData.append("title", formValue.title);
    createTaskFormData.append("category", formValue.category);
    createTaskFormData.append("discription", formValue.discription);
    createTaskFormData.append("priority", formValue.priority);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/task",
        data: createTaskFormData,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        setCreateDialogOpen(false);
        setTasks([]);
        getAllTasks();
      });
    } catch (error) {
      setCreateDialogOpen(false);
      console.log(error);
    }
  }

  function handleChange(event) {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  }

  function handleSelectedCategoryChange(event) {
    setSelectedCategoryFilter(event.target.value);
  }

  return (
    <div className="Planner">
      <h1>PLANNER</h1>

      <div className="top-bar-wrapper">
        <div className="top-bar item-one">
          <FormControl fullWidth>
            <InputLabel htmlFor="grouped-native-select">
              Select filter
            </InputLabel>
            <Select
              className="filterItemsSelector"
              color="primary"
              label="Select filter"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedCategoryFilter}
              onChange={handleSelectedCategoryChange}
              focused
              sx={{
                borderColor: "Blue",
                color: "white",
              }}
            >
              <MenuItem disabled value="Select filter">
                <em>None</em>
              </MenuItem>
              {tasksCategories.map((tasksCategorie) => {
                return (
                  <MenuItem key={tasksCategorie} value={tasksCategorie}>
                    {tasksCategorie}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="top-bar item-two">
          <FormControl fullWidth>
            <InputLabel htmlFor="grouped-native-select">
              Select sorting
            </InputLabel>
            <Select
              className="sortingItemsSelector"
              color="primary"
              label="Select sorting"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedCategoryFilter}
              onChange={handleSelectedCategoryChange}
              focused
              sx={{
                borderColor: "Blue",
                color: "white",
              }}
            >
              <MenuItem value="oldest_first">
                <em>Id, oldest first</em>
              </MenuItem>
              <MenuItem value="newest_first">
                <em>Id, newest first</em>
              </MenuItem>
              <MenuItem value="highest_priority_first">
                <em>Priority, highest first</em>
              </MenuItem>
              <MenuItem value="lowest_priority_first">
                <em>Priority, lowest first</em>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="top-bar item-three">
          <Button
            variant="contained"
            onClick={() => createHandleClickOpen()}
            size="medium"
          >
            Create Item
          </Button>
        </div>
      </div>

      <ul>
        {tasksLoader ? <LinearProgress className="loader" /> : ""}

        {tasks.map((value, index) => {
          return (
            <li key={index}>
              <Card>
                <div className="card-container">
                  <CardContent>
                    <div className="card-content-top">
                      <div className="card-content-top-title">
                        <Typography
                          gutterBottom
                          variant="h5"
                          component={"span"}
                        >
                          {value.title}
                        </Typography>
                      </div>
                      <div className="card-content-top-rating">
                        <Typography
                          gutterBottom
                          variant="body1"
                          component={"span"}
                        >
                          {value.priority}/10
                        </Typography>
                      </div>
                      <div className="card-content-top-category">
                        <Typography
                          gutterBottom
                          variant="h6"
                          component={"span"}
                        >
                          {value.category}
                        </Typography>
                      </div>

                      <div className="card-content-top-menu">
                        <MenuRoundedIcon
                          id="basic-button"
                          aria-controls={
                            openHamburgerMenu ? "basic-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={openHamburgerMenu ? "true" : undefined}
                          onClick={handleHambuerMenuClick}
                        />
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={openHamburgerMenu}
                          onClose={handleHamburgerMenuClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={handleHamburgerMenuClose}>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              onClick={() => handleClickOpen(value)}
                            >
                              <DeleteIcon fontSize="inherit" />
                              &nbsp; Delete item
                            </IconButton>
                          </MenuItem>
                          <MenuItem onClick={handleHamburgerMenuClose}>
                            <IconButton
                              aria-label="edit"
                              size="small"
                              onClick={() => handleEditOpen(value)}
                            >
                              <EditIcon fontSize="inherit" />
                              &nbsp; Edit item
                            </IconButton>
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>

                    <div className="card-content-bottom">
                      <Typography variant="body1" color="text.secondary">
                        {value.discription}
                      </Typography>
                    </div>
                  </CardContent>
                </div>

                <Dialog
                  open={open}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Delete task?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete the task:
                      <b>{taskToDeleteName}</b>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => dismissDialog()}>Dismiss</Button>
                    <Button onClick={() => acceptDeleteDialog(value)} autoFocus>
                      Accept
                    </Button>
                  </DialogActions>
                </Dialog>
              </Card>
            </li>
          );
        })}
      </ul>
      <Dialog
        open={openCreateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
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
              type="title"
              name="title"
              id="outlined-basic"
              variant="outlined"
              margin="normal"
              color="primary"
              label="Title"
              defaultValue={formValue.title}
              onChange={handleChange}
              focused
            />
            <br />
            <TextField
              type="category"
              name="category"
              id="outlined-basic"
              variant="outlined"
              margin="normal"
              color="primary"
              label="Category"
              defaultValue={formValue.category}
              onChange={handleChange}
              focused
            />

            <TextField
              className="createItemPriorityTextfield"
              name="priority"
              id="outlined-basic"
              variant="outlined"
              margin="normal"
              color="primary"
              label="Priority"
              type="number"
              defaultValue={formValue.priority}
              onChange={handleChange}
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
              defaultValue={formValue.discription}
              onChange={handleChange}
              focused
              fullWidth
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => acceptCreateTask()} autoFocus>
            Create task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit a task */}
      <Dialog
        open={openEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialog-create-container">
          <div className="dialog-create-item">
            <DialogTitle id="alert-dialog-title">Edit a task</DialogTitle>
          </div>

          <div className="dialog-create-item_right" size="small">
            <IconButton
              aria-label="close"
              size="large"
              onClick={() => setEditDialogOpen(false)}
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
              defaultValue={formValue.title}
              onChange={handleChange}
              focused
            />
            <br />
            <TextField
              type="category"
              name="category"
              id="outlined-basic"
              variant="outlined"
              margin="normal"
              color="primary"
              label="Category"
              defaultValue={formValue.category}
              onChange={handleChange}
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
              defaultValue={formValue.discription}
              onChange={handleChange}
              focused
              fullWidth
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => acceptCreateTask()} autoFocus>
            Save task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
