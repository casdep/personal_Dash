import React, { useState } from "react";
import axios from "axios";

import { TextField, Button } from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import "./login.css";

export default function LoginForm() {
  const [formValue, setformValue] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit() {
    const loginFormData = new URLSearchParams();

    loginFormData.append("Username", formValue.username);
    loginFormData.append("password", formValue.password);

    try {
      await axios({
        method: "post",
        url: "http://localhost:3001/task",
        data: loginFormData,
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
    <div className="Login">
      <h1>Login</h1>

      <div className="Login_container">
        <div className="input_fields">
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
        </div>

        <br />
        <div className="footer_items">
          <div className="footer_item_one">
            <Typography
              gutterBottom
              variant="body1"
              component={"span"}
              inputProps={{ style: { color: "red" } }}
            >
              New user?&nbsp;
              <Link href="/register" underline="hover">
                {"Register here"}
              </Link>
            </Typography>
          </div>
          <div className="footer_item_two">
            <Button variant="contained" onClick={() => handleSubmit()}>
              Log in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
