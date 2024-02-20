import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { appTheme } from "../../store/slicers/generalSlice";

import { getTokenValue } from "../../utils/getTokenValue";
import { getCookie } from "../../utils/getCookie";

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

  const [openDialogProfilePicture, setOpenDialogProfilePicture] =
    useState(false);
  const [openDialogLogout, setOpenDialogLogout] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const noProfilePicture = require("../../assets/media/noProfilePicture.png");

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.getElementById("checkbox").checked = true;
    }
    getProfilePicture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpenLogout = () => {
    setOpenDialogLogout(true);
  };
  const handleCloseLogout = () => {
    setOpenDialogLogout(false);
  };

  const handleCloseProfilePicture = () => {
    setOpenDialogProfilePicture(false);
  };

  const fileInputRef = useRef(null);

  const editProfilePicture = () => {
    fileInputRef.current.click();
  };

  const handeEditProfilePicture = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageData = e.target.result;

        const img = new Image();
        img.src = imageData;

        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set the maximum width and height
          const maxSize = 300;

          let width = img.width;
          let height = img.height;
          let offsetX = 0;
          let offsetY = 0;

          if (width > height) {
            // Landscape image
            width = height;
            offsetX = (img.width - img.height) / 2;
          } else {
            // Portrait or square image
            height = width;
            offsetY = (img.height - img.width) / 2;
          }

          canvas.width = maxSize;
          canvas.height = maxSize;

          // Draw the image on the canvas
          ctx.drawImage(
            img,
            offsetX,
            offsetY,
            width,
            height,
            0,
            0,
            maxSize,
            maxSize
          );

          // Convert canvas to a compressed base64 string
          const resizedImageData = canvas.toDataURL("image/jpeg", 0.75);

          setSelectedImage(resizedImageData);
          setOpenDialogProfilePicture(true);
        };
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  async function confirmProfilePicture() {
    console.log(getTokenValue("userId"));
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
        setProfileImage(selectedImage);
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
        setProfileImage(noProfilePicture);
        setOpenDialogProfilePicture(false);
      })
      .catch(function (response) {});
  }

  async function getProfilePicture() {
    console.log("get Profile Pic");
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
          console.log(res.data);
          setProfileImage(res.data.profilePicture);
        } else {
          console.log("Profile picture not found");
          setProfileImage(noProfilePicture);
        }
        console.log(profileImage);
        setOpenDialogProfilePicture(false);
      })
      .catch(function (response) {});
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
        <div>
          <div className="profilePictureContainer">
            <img className="profilePicture" src={profileImage} alt="profile" />
            <div className="overlay">
              <div className="buttonWrapper">
                <button className="deleteButton" onClick={deleteProfilePicture}>
                  <strong>Delete</strong>
                </button>
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
            <p>
              <b>Name:</b>
              <br />
              {getTokenValue("username")}
            </p>
            <hr />
            <p>
              <b>E-mail:</b> <br />
              {getTokenValue("email")}
            </p>
            <hr />
            <p>
              <b>Account id:</b> <br />
              {getTokenValue("userId")}
            </p>
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
            <p>
              <b>Click here to log out:</b>
            </p>
            <Link className="logout" onClick={handleClickOpenLogout}>
              Log Out
            </Link>
          </div>
          <Dialog
            open={openDialogLogout}
            onClose={handleCloseLogout}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <IconButton
              aria-label="close"
              onClick={handleCloseLogout}
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
              <Button onClick={handleCloseLogout}>No</Button>
              <Button onClick={confirmLogout}>Yes</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openDialogProfilePicture}
            onClose={handleCloseProfilePicture}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <IconButton
              aria-label="close"
              onClick={handleCloseProfilePicture}
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
              <img src={selectedImage} alt="selected" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseProfilePicture}>Close</Button>
              <Button onClick={confirmProfilePicture}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <div>{profileBroswer()}</div>
    </div>
  );
}
