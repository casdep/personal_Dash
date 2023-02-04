import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  MenuRoundedIcon,
} from "@mui/icons-material/Close";

import "./planner.css";

export default function Planner() {
  const [anchorEl, setAnchorEl] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [tasksLoader, setTasksLoader] = useState(false);
  const [tasksCategories, setTasksCategories] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const [selectedSortingOption, setSelectedSortingOption] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [queryParamUrl, setQueryParamUrl] = useState(
    new URL("http://localhost:3001/task-management/tasks")
  );
  const [open, setOpen] = useState(false);
  const [openEditDialog, setEditDialogOpen] = useState(false);
  const [taskToDeleteName, setTaskToDeleteName] = useState("");

  const [formValue, setFormValue] = useState({
    id: "",
    user: "cas",
    title: "",
    category: "",
    discription: "",
    priority: 1,
  });

  const openHamburgerMenu = Boolean(anchorEl);

  const handleHambuerMenuClick = (e, id) => {
    setSelectedTaskId(id);
    setAnchorEl(e.currentTarget);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  async function getAllTasks(event) {
    setTasksLoader(true);
    let url = queryParamUrl;

    if (event) {
      let urlNew = queryParamUrl.href;
      let newUrl = new URL(urlNew);

      if (event[1] === "") {
        newUrl.searchParams.delete(event[0]);
      } else {
        newUrl.searchParams.set(event[0], event[1]);
      }

      let lastUrl = new URL(newUrl.href);
      url = lastUrl.href;

      setQueryParamUrl(lastUrl);
    }

    await axios({
      method: "get",
      url: url,
    })
      .then(function(res) {
        const tasks = res.data.data;
        setTasks(tasks);
        setTasksLoader(false);

        const uniqueCategories = [
          ...new Set(tasks.map((task) => task.category)),
        ];
        if (tasksCategories.length === 0) {
          setTasksCategories(uniqueCategories);
        }
      })
      .catch(function(response) {
        console.log(response);
      });
  }

  function handleSelectedCategoryChange(event) {
    const filteredCategory = event.target.value;
    setSelectedCategoryFilter(filteredCategory);
    getAllTasks(["category", filteredCategory]);
  }

  function handleSelectedSortChange(event) {
    const sortingOption = event.target.value;
    setSelectedSortingOption(sortingOption);
    getAllTasks(["sort", sortingOption]);
  }

  function createHandleClickOpen() {
    setCreateDialogOpen(true);
  }

  function handleHamburgerMenuClose() {
    setAnchorEl(null);
  }

  function handleDeleteOpen() {
    const selectedItem = tasks.find((key) => key.id === selectedTaskId);

    setTaskToDeleteName(selectedItem.title);
    setOpen(true);
  }

  async function acceptDeleteDialog(event) {
    try {
      await axios({
        method: "delete",
        url: "http://localhost:3001/task-management/tasks/" + selectedTaskId,
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

  function handleInputChange(event) {
    const target = event.target;
    var value = target.value;
    const key = target.name;

    console.log("Handle Change event: " + key);

    if (key === "priority") {
      if (value === "") {
        //Allows inputfield to be empty
      } else if (value < 1) {
        value = 1;
      } else if (value > 10) {
        value = 10;
      }
    }

    console.log([key]);
    console.log(value);

    //sets the entered value to their according key in the state

    setFormValue({
      ...formValue,
      [key]: value,
    });
  }

  function handleEditOpen() {
    const selectedItem = tasks.find((key) => key.id === selectedTaskId);
    console.log(selectedItem);

    for (const key in selectedItem) {
      const value = selectedItem[key];

      setFormValue((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }

    setEditDialogOpen(true);
  }

  function dismissDialog() {
    setOpen(false);
    setCreateDialogOpen(false);
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
        setEditDialogOpen(false);
        setTasks([]);
        getAllTasks();
        setFormValue({
          id: "",
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
              sx={{
                color: "white",
              }}
            >
              <MenuItem value="">
                <i>None</i>
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
              value={selectedSortingOption}
              onChange={handleSelectedSortChange}
              sx={{
                color: "white",
              }}
            >
              <MenuItem selected value="">
                <i>None</i>
              </MenuItem>
              <MenuItem value="id_asc">
                <em>Id, lowest first</em>
              </MenuItem>
              <MenuItem value="id_desc">
                <em>Id, highest first</em>
              </MenuItem>
              <MenuItem value="createdAt_desc">
                <em>Created, newest first</em>
              </MenuItem>
              <MenuItem value="createdAt_asc">
                <em>Created, oldest first</em>
              </MenuItem>
              <MenuItem value="priority_desc">
                <em>Priority, highest first</em>
              </MenuItem>
              <MenuItem value="priority_asc">
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
          let id = value.id;
          return (
            <li key={id}>
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
                      <div className="card-content-top-category">
                        <Typography
                          gutterBottom
                          variant="body1"
                          component={"span"}
                        >
                          {value.category}
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

                      <div className="card-content-top-menu">
                        <MenuRoundedIcon
                          id="basic-button"
                          aria-controls={
                            openHamburgerMenu ? "basic-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={openHamburgerMenu ? "true" : undefined}
                          onClick={(e) => handleHambuerMenuClick(e, id)}
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
                              onClick={() => handleDeleteOpen(value)}
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
          <Button onClick={() => handleEditSubmit()} autoFocus>
            Save task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
