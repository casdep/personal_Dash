import React, { useState } from "react";
import axios from "axios";

import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import "./profileBrowser.scss";
import "../../assets/scss/theme.scss";

const ProfileBrowser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const handleInputChange = (event) => {
    console.log("Watkippie606: " + event.target.value);
    setSearchTerm(event.target.value);

    findUsers(event.target.value);
  };

  async function findUsers(searchTerm) {
    const userIdentifier = searchTerm;
    console.log(userIdentifier);

    if (userIdentifier && userIdentifier.trim().length > 0) {
      try {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}/account-management/users?userIdentifier=${userIdentifier}`,
        }).then((res) => {
          console.log(res.data.data);
          const users = res.data.data;
          setUsers(users);
        });
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

  function handleChange(e) {
    console.log(e);
  }

  return (
    <div className="profileBrowser">
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
            <Card>
              <li key={id}>
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
                    onChange={handleChange}
                  >
                    <MenuItem value="user" selected={user.role === "User"}>
                      User
                    </MenuItem>
                    <MenuItem value="member" selected={user.role === "member"}>
                      Member
                    </MenuItem>
                    <MenuItem value="admin" selected={user.role === "admin"}>
                      Admin
                    </MenuItem>
                  </Select>
                </FormControl>
              </li>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfileBrowser;
