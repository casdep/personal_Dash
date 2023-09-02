import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { appTheme } from "../../store/slicers/generalSlice";

import { getTokenValue } from "../../utils/getTokenValue";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import "./profile.scss";
import profileBroswer from "./profileBrowser";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.getElementById("checkbox").checked = true;
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editProfilePicture = () => {
    console.log("edited");
  };

  const deleteProfilePicture = () => {
    console.log("deleted");
  };

  function handleChange(e) {
    if (e.target.value === false) {
      dispatch(appTheme("light"));
      localStorage.setItem("theme", "light");
    } else {
      dispatch(appTheme("dark"));
      localStorage.setItem("theme", "dark");
    }
  }

  function logout() {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    handleClose();
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="profile">
      <div className="pageTitle">
        <h1>Profile</h1>
      </div>
      <div className="profileContainer">
        <div>
          <img
            className="profilePicture"
            src="https://i.stack.imgur.com/W4LQr.jpg?s=256&g=1"
            alt="profile"
          />
          <br />
          <Link
            className="deleteProfilePicture"
            onClick={() => deleteProfilePicture()}
          >
            Delete profile picture
          </Link>
          &nbsp;|&nbsp;
          <Link
            className="editProfilePicture"
            onClick={() => editProfilePicture()}
          >
            Edit profile picture
          </Link>
          <p className="profile--content">
            <b>Name:</b> <br />
            {getTokenValue("username")}
            <hr />
            <b>Account id:</b> <br />
            {getTokenValue("userId")}
            <hr />
            <b>Theme:</b>
            <div class="dark-light-wrapper">
              <div class="toggle">
                <input
                  class="toggle-input"
                  type="checkbox"
                  id="checkbox"
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: e.target.name,
                        value: e.target.checked,
                      },
                    });
                  }}
                />
                <div class="toggle-bg"></div>
                <div class="toggle-switch">
                  <div class="toggle-switch-figure"></div>
                  <div class="toggle-switch-figureAlt"></div>
                </div>
              </div>
            </div>
            <hr />
            <b>Click here to log out:</b>
            <br />
            <Link className="logout" onClick={handleClickOpen}>
              Log Out
            </Link>
          </p>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
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
              <Button onClick={handleClose}>No</Button>
              <Button onClick={logout}>Yes</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <div>{profileBroswer()}</div>
    </div>
  );
}
