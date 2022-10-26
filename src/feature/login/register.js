import React, { useEffect, useState } from "react";
import axios from "axios";

import { TextField, Button } from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import "./register.css";

export default function Register() {
  const [formValue, setformValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleSubmit() {
    const registerFormData = new URLSearchParams();

    registerFormData.append("Username", formValue.username);
    registerFormData.append("password", formValue.password);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/task",
        data: registerFormData,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(event) {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="Register">
      <h1>Register</h1>

      <div className="Register_container">
        <div className="input_fields">
          <div className="input_field_top_bar">
            <div className="input_field_top_bar_username">
              <TextField
                inputProps={{ style: { color: "white" } }}
                type="username"
                name="username"
                id="outlined-basic"
                variant="outlined"
                margin="normal"
                color="primary"
                label="Username"
                defaultValue={formValue.username}
                onChange={handleChange}
                focused
                fullWidth
              />
            </div>
            <div className="input_field_top_bar_email">
              <TextField
                inputProps={{ style: { color: "white" } }}
                type="email"
                name="email"
                id="outlined-basic"
                variant="outlined"
                margin="normal"
                color="primary"
                label="E-maildress"
                defaultValue={formValue.email}
                onChange={handleChange}
                focused
                fullWidth
              />
            </div>
          </div>

          <TextField
            inputProps={{ style: { color: "white" } }}
            type="password"
            name="password"
            id="outlined-basic"
            variant="outlined"
            margin="normal"
            color="primary"
            label="Password"
            defaultValue={formValue.password}
            onChange={handleChange}
            focused
            fullWidth
          />
          <TextField
            inputProps={{ style: { color: "white" } }}
            type="password"
            name="confirm_password"
            id="outlined-basic"
            variant="outlined"
            margin="normal"
            color="primary"
            label="Confirm Password"
            defaultValue={formValue.password}
            onChange={handleChange}
            focused
            fullWidth
          />
        </div>

        <br />
        <div className="footer_items">
          <div className="footer_item_one">
            <Button variant="contained" onClick={() => handleSubmit()}>
              Register account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
