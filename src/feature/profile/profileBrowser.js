import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";

import "./profileBrowser.scss";
import "../../assets/scss/theme.scss";

import { getCookie } from "../../utils/getCookie";

const ProfileBrowser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserSnackbarMessage, setSelectedUserSnackbarMessage] =
    useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    findUsers(searchTerm);
  }, [searchTerm]);

  async function findUsers(searchTerm) {
    const userIdentifier = searchTerm.trim();

    if (userIdentifier.length > 0) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/account-management/users?userIdentifier=${userIdentifier}`,
          {
            headers: {
              Authorization: "Bearer " + getCookie("token"),
              "content-type": "application/x-www-form-urlencoded",
            },
          }
        );
        const users = res.data.data;
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function getSimplifiedDate(createdAt) {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based months
    const day = date.getDate();

    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    return formattedDate;
  }

  function handleRoleChange(user, event) {
    setSelectedUserSnackbarMessage({
      username: user.username,
      role: event.target.value,
    });
    setDialogOpen(true);
  }

  function acceptDialog() {
    setDialogOpen(false);
    setSnackbarOpen(true);
    findUsers(searchTerm);
  }

  function dismissDialog() {
    setDialogOpen(false);
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  return (
    <div className="profileBrowser">
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={10000}
        sx={{ margin: "75px 0 0" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        severity="success"
        message={`Role of ${selectedUserSnackbarMessage.username} has been changed to ${selectedUserSnackbarMessage.role}!`}
      />
      <div>
        <TextField
          type="text"
          name="category"
          label="Search for user"
          className="searchForUser"
          margin="normal"
          fullWidth
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <ul>
        {users.map((user, index) => {
          let id = user.id;
          return (
            <Card key={id}>
              <li>
                <div className="container">
                  <div className="div-left">
                    <p>
                      <strong>Username:</strong>
                      <br />
                      {user.username}
                    </p>
                    <p>
                      <strong>ID: </strong>
                      {user.id}
                    </p>
                  </div>
                  <div className="div-right">
                    <p>
                      <strong>Email:</strong>
                      <br />
                      {user.email}
                    </p>
                    <p>{getSimplifiedDate(user.createdAt)}</p>
                  </div>
                </div>
                <FormControl size="small" fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    labelId="select-small-label"
                    id="demo-select-small"
                    label="Role"
                    value={user.role}
                    onChange={(event) => handleRoleChange(user, event)}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="member">Member</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </li>
              <Dialog
                open={dialogOpen}
                onClose={dismissDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Change User Role?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to set the role of{" "}
                    <b>{selectedUserSnackbarMessage.username}</b> to{" "}
                    <b>{selectedUserSnackbarMessage.role}</b>?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={dismissDialog}>Cancel</Button>
                  <Button onClick={acceptDialog} autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfileBrowser;
