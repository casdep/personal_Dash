import React, { useEffect, useState } from "react";
import axios from "axios";

import "./planner.scss";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useSelector, useDispatch } from "react-redux";

import PlannerCreate from "./plannerCreate";

import {
  plannerDialogOpen,
  selectedTask,
} from "../../store/slicers/plannerSlice";

import { getCookie } from "../../utils/getCookie";

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
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

export default function Planner() {
  const dispatch = useDispatch();

  const getPlannerDialogOpen = useSelector(
    (state) => state.planner.plannerDialogOpen
  );

  const getSelectedTask = useSelector((state) => state.planner.selectedTask);

  const [anchorEl, setAnchorEl] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [tasksLoader, setTasksLoader] = useState(false);
  const [tasksCategories, setTasksCategories] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const [selectedSortingOption, setSelectedSortingOption] = useState("");
  const [queryParamUrl, setQueryParamUrl] = useState(
    new URL(process.env.REACT_APP_API_URL + "/task-management/tasks")
  );
  const [open, setOpen] = useState(false);
  const [taskToDeleteName, setTaskToDeleteName] = useState("");

  const openHamburgerMenu = Boolean(anchorEl);

  const handleHambuerMenuClick = (e, task) => {
    dispatch(selectedTask(task));
    setAnchorEl(e.currentTarget);
  };

  useEffect(() => {
    getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then(function (res) {
        const tasks = res.data.data;
        setTasks(tasks);
        setTasksLoader(false);

        const uniqueCategories = [
          ...new Set(tasks.map((task) => task.category)),
        ].sort();
        if (tasksCategories.length === 0) {
          setTasksCategories(uniqueCategories);
        }
      })
      .catch(function (response) {});
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
    dispatch(plannerDialogOpen("create"));
  }

  function handleHamburgerMenuClose() {
    setAnchorEl(null);
  }

  function handleDeleteOpen() {
    setTaskToDeleteName(getSelectedTask.title);
    setOpen(true);
  }

  async function acceptDeleteDialog() {
    try {
      await axios({
        method: "delete",
        url:
          process.env.REACT_APP_API_URL +
          "/task-management/tasks/" +
          getSelectedTask.id,
        headers: {
          Authorization: "Bearer " + getCookie("token"),
          "content-type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        setOpen(false);
        setTasks([]);
        getAllTasks();
      });
    } catch (error) {}
  }

  function handleEditOpen() {
    dispatch(plannerDialogOpen("edit"));
  }

  function dismissDialog() {
    setOpen(false);
    dispatch(plannerDialogOpen(""));
  }

  return (
    <div className="planner">
      <div className="pageTitle">
        <h1>Planner</h1>
      </div>
      {getPlannerDialogOpen !== "" ? <PlannerCreate /> : ""}
      <div className="top-bar-wrapper">
        <div className="top-bar item-one">
          <FormControl fullWidth>
            <InputLabel htmlFor="grouped-native-select">Filter</InputLabel>
            <Select
              className="filterItemsSelector"
              label="Filter"
              labelId="demo-simple-select-standard-label"
              value={selectedCategoryFilter}
              onChange={handleSelectedCategoryChange}
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
            <InputLabel htmlFor="grouped-native-select">Sorting</InputLabel>
            <Select
              className="sortingItemsSelector"
              label="Sorting"
              labelId="demo-simple-select-standard-label"
              value={selectedSortingOption}
              onChange={handleSelectedSortChange}
            >
              <MenuItem selected value="">
                None
              </MenuItem>
              <MenuItem value="priority_asc">
                <strong>Priority</strong> &nbsp; - Lowest first
              </MenuItem>
              <MenuItem value="priority_desc">
                <strong>Priority</strong> &nbsp; - Highest first
              </MenuItem>
              <MenuItem value="createdAt_asc">
                <strong>Created</strong> &nbsp; - Oldest first
              </MenuItem>
              <MenuItem value="createdAt_desc">
                <strong>Created</strong> &nbsp; - Newest first
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="top-bar item-three">
          <Button
            variant="contained"
            onClick={() => createHandleClickOpen()}
            size="large"
          >
            Create task
          </Button>
        </div>
      </div>
      <div className="create-button-mobile">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => createHandleClickOpen()}
        >
          <AddIcon />
        </Fab>
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
                          variant="h6"
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
                        <MoreVertIcon
                          id="basic-button"
                          aria-controls={
                            openHamburgerMenu ? "basic-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={openHamburgerMenu ? "true" : undefined}
                          onClick={(e) => handleHambuerMenuClick(e, value)}
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
                        {value.description}
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
                      Are you sure you want to delete the task:&nbsp;
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
    </div>
  );
}
