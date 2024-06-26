import React, { useState, useEffect } from "react";
import axios from "axios";

import "./profileBrowser.scss";

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

import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { getCookie } from "../../utils/getCookie";
import { getTokenValue } from "../../utils/getTokenValue";

const ProfileBrowser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleInputChange = (event) => {
    if (event.target.value.length === 0) {
      setUsers([]);
    }
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
      } catch (error) {}
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
    setSelectedUsername(user.username);
    setSelectedUserId(user.id);
    setSelectedRole(event.target.value);

    setDialogOpen(true);
  }

  function acceptDialog() {
    setUserRule();
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

  async function setUserRule() {
    try {
      await axios({
        method: "put",
        url:
          process.env.REACT_APP_API_URL +
          "/account-management/users/" +
          selectedUserId,
        headers: {
          Authorization: "Bearer " + getCookie("token"),
          "content-type": "application/json",
        },
        data: { action: "editRole", value: selectedRole },
      });
    } catch (error) {}
  }

  return (
    <div>
      {getTokenValue("role") === "admin" && (
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
            message={`Role of ${selectedUsername} has been changed to ${selectedRole}!`}
          />
          <div className="searchInput">
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
          <ul className="resultResultProfileCard">
            {users.map((user, index) => {
              let id = user.id;
              return (
                <Card key={id} className="profileCard">
                  <li>
                    <div className="container">
                      <div className="div-left">
                        <p>
                          <strong>ID:&nbsp;</strong>
                          {user.id}&nbsp;&nbsp;
                          <strong>Date:&nbsp;</strong>
                          {getSimplifiedDate(user.createdAt)}
                        </p>
                        <p>
                          <PersonIcon /> {user.username}
                        </p>
                        <p>
                          <MailOutlineIcon /> {user.email}
                        </p>
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
                        <b>{selectedUsername}</b> to <b>{selectedRole}</b>?
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
      )}
    </div>
  );
};

export default ProfileBrowser;
