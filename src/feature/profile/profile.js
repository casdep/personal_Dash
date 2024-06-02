import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { appTheme } from "../../store/slicers/generalSlice";

import { getTokenValue } from "../../utils/getTokenValue";
import { getCookie } from "../../utils/getCookie";
import { setCookie } from "../../utils/setCookie";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import "./profile.scss";
import profileBroswer from "./profileBrowser";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedStartPage, setSelectedStartPage] = useState("Home page");
  const [openDialogProfilePicture, setOpenDialogProfilePicture] =
    useState(false);
  const [openDialogProfilePictureDelete, setOpenDialogProfilePictureDelete] =
    useState(false);
  const [editUsernameMode, setEditUsernameMode] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [editEmailMode, setEditEmailMode] = useState(false);

  const [openDialogLogout, setOpenDialogLogout] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const noProfilePicture = require("../../assets/media/noProfilePicture.png");

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.getElementById("checkbox").checked = true;
    }
    getProfilePicture();
    getStartPage();
    setUsername(getTokenValue("username"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fileInputRef = useRef(null);

  function getStartPage() {
    if (localStorage.getItem("startPage")) {
      const startPageFromStorage = localStorage.getItem("startPage");
      if (startPageFromStorage === "/") {
        setSelectedStartPage("Home page");
      } else {
        const startPageFromStorageFormatted = startPageFromStorage.substring(1);
        setSelectedStartPage(startPageFromStorageFormatted);
      }
    }
  }

  function handleStartPageChange(event) {
    let startPage = event.target.value;
    setSelectedStartPage(startPage);
    if (startPage === "Home page") {
      startPage = "";
    }
    localStorage.setItem("startPage", "/" + startPage);
  }

  const editProfilePicture = () => {
    fileInputRef.current.click();
  };

  const handeEditProfilePicture = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageData = e.target.result;

        setSelectedImage(imageData);
        setOpenDialogProfilePicture(true);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  async function confirmProfilePicture() {
    await axios({
      method: "put",
      url:
        process.env.REACT_APP_API_URL +
        "/account-management/users/" +
        getTokenValue("userId"),
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
      data: { action: "editProfilePicture", value: selectedImage },
    })
      .then(function (res) {
        setProfilePicture(selectedImage);
        setOpenDialogProfilePicture(false);
      })
      .catch(function (response) {});
  }

  async function deleteProfilePicture() {
    await axios({
      method: "put",
      url:
        process.env.REACT_APP_API_URL +
        "/account-management/users/" +
        getTokenValue("userId"),
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
      data: { action: "editProfilePicture", value: null },
    })
      .then(function (res) {
        setProfilePicture(noProfilePicture);
        setOpenDialogProfilePictureDelete(false);
      })
      .catch(setOpenDialogProfilePictureDelete(false));
  }

  async function getProfilePicture() {
    await axios({
      method: "get",
      url:
        process.env.REACT_APP_API_URL +
        "/account-management/users/profile-picture/" +
        getTokenValue("userId"),
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then(function (res) {
        if (res.data.profilePicture && res.status === 200) {
          setProfilePicture(res.data.profilePicture);
        } else {
          setProfilePicture(noProfilePicture);
        }
        setOpenDialogProfilePicture(false);
      })
      .catch(setProfilePicture(noProfilePicture));
  }

  function handleUsernameInputChange(e) {
    console.log(e.target.value);
    setUsername(e.target.value);
  }

  function handleEditUsername() {
    if (editUsernameMode === true) {
      return (
        <div className="usernameEdit">
          <b>Name:</b>
          <br />
          <TextField
            type="text"
            name="newUsername"
            label="New username"
            className="usernameTextfield"
            margin="normal"
            fullWidth
            helperText={usernameError}
            onChange={handleUsernameInputChange}
            value={username}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleEditUsernameChange()}>
                    <CheckOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={() => setEditUsernameMode(false)}>
                    <CloseOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="username" onClick={() => setEditUsernameMode(true)}>
          <div className="container">
            <div className="left">
              <p>
                <b>Name:</b> <br />
                {getTokenValue("username")}
              </p>
            </div>
            <div className="right">
              <ModeEditOutlinedIcon className="ModeEditOutlinedIcon" />
            </div>
          </div>
        </div>
      );
    }
  }

  async function handleEditUsernameChange() {
    if (username.includes("@")) {
      setUsernameError("Username cannot contain the @ sign");
      console.log("a");
    } else {
      await axios({
        method: "put",
        url:
          process.env.REACT_APP_API_URL +
          "/account-management/users/" +
          getTokenValue("userId"),
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
        data: { action: "editUsername", value: username },
      })
        .then(function (res) {
          const token = res.data.token;
          setCookie("token", token, 365 * 10);
          setEditUsernameMode(false);
        })
        .catch(function (response) {});
    }
  }

  function handleEditEmail() {
    if (editEmailMode === true) {
      return (
        <div>
          <b>Email:</b>
          <br />
          <TextField
            type="text"
            name="email"
            label="New email"
            className="emailTextfield"
            margin="normal"
            fullWidth
            value={getTokenValue("email")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleEditEmailChange()}>
                    <CheckOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={() => setEditEmailMode(false)}>
                    <CloseOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="email" onClick={() => setEditEmailMode(true)}>
          <div className="container">
            <div className="left">
              <p>
                <b>Email:</b> <br />
                {getTokenValue("email")}
              </p>
            </div>
            <div className="right">
              <ModeEditOutlinedIcon className="ModeEditOutlinedIcon" />
            </div>
          </div>
        </div>
      );
    }
  }

  async function handleEditEmailChange(newEmail) {
    try {
      await axios({
        method: "put",
        url:
          process.env.REACT_APP_API_URL +
          "/account-management/users/" +
          getTokenValue("userId"),
        headers: {
          Authorization: "Bearer " + getCookie("token"),
          "content-type": "application/json",
        },
        data: { action: "editEmail", value: newEmail },
      }).then(setEditEmailMode(false));
    } catch (error) {}
  }

  function handleChange(e) {
    if (e.target.checked === false) {
      dispatch(appTheme("light"));
      localStorage.setItem("theme", "light");
    } else {
      dispatch(appTheme("dark"));
      localStorage.setItem("theme", "dark");
    }
  }

  function confirmLogout() {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setOpenDialogLogout(false);
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="profile">
      <div className="pageTitle">
        <h1>Profile</h1>
      </div>
      <div className="profileContainer">
        <div className="profilePictureContainer">
          <img className="profilePicture" src={profilePicture} alt="profile" />
          <div className="overlay">
            <div className="buttonWrapper">
              {profilePicture !== noProfilePicture && (
                <button
                  className="deleteButton"
                  onClick={() => setOpenDialogProfilePictureDelete(true)}
                >
                  <strong>Delete</strong>
                </button>
              )}
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handeEditProfilePicture}
              />
              <button className="editButton" onClick={editProfilePicture}>
                <strong>Edit</strong>
              </button>
            </div>
          </div>
        </div>
        <div className="profile--content">
          <b>Account id: &nbsp;</b>
          {getTokenValue("userId")} <br />
          <hr />
          {handleEditUsername()}
          <hr />
          {handleEditEmail()}
          <hr />
          <div>
            <p>
              <b>Start page</b> <br />
              Default page when opening the app
            </p>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel htmlFor="grouped-native-select">Page</InputLabel>
              <Select
                className="sortingItemsSelector"
                label="Sorting"
                labelId="demo-simple-select-standard-label"
                displayEmpty
                value={selectedStartPage}
                onChange={handleStartPageChange}
              >
                <MenuItem value="Home page">Home page</MenuItem>
                <MenuItem value="planner">Planner</MenuItem>
                <MenuItem value="notes">Notes</MenuItem>
              </Select>
            </FormControl>
          </div>
          <hr />
          <p>
            <b>Theme</b>
          </p>
          <div className="dark-light-wrapper">
            <div className="toggle">
              <input
                className="toggle-input"
                type="checkbox"
                id="checkbox"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <div className="toggle-bg"></div>
              <div className="toggle-switch">
                <div className="toggle-switch-figure"></div>
                <div className="toggle-switch-figureAlt"></div>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <br />
            <b>Click here to log out:&nbsp;</b> <br />
            <Link className="logout" onClick={() => setOpenDialogLogout(true)}>
              Log Out
            </Link>
          </div>
        </div>
        <Dialog
          open={openDialogLogout}
          onClose={() => setOpenDialogLogout(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialogLogout(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogTitle id="alert-dialog-title">{"Log Out"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to Log Out from Dashboard?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialogLogout(false)}>No</Button>
            <Button onClick={confirmLogout}>Yes</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDialogProfilePicture}
          onClose={() => setOpenDialogProfilePicture(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialogProfilePicture(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogTitle id="alert-dialog-title">Selected Image</DialogTitle>
          <DialogContent>
            <img
              src={selectedImage}
              className="profilePicture"
              alt="selected"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialogProfilePicture(false)}>
              Close
            </Button>
            <Button onClick={confirmProfilePicture}>Confirm</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogProfilePictureDelete}
          onClose={() => setOpenDialogProfilePictureDelete(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialogProfilePictureDelete(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogTitle id="alert-dialog-title">
            Delete profile picture?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete your profile picture?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialogProfilePictureDelete(false)}>
              No
            </Button>
            <Button onClick={deleteProfilePicture}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>{profileBroswer()}</div>
    </div>
  );
}
