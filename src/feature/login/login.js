import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { TextField, Button } from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import "../../assets/scss/theme.scss";
import "./login.scss";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formValue, setformValue] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit() {
    const loginFormData = new URLSearchParams();

    loginFormData.append("userIdentifier", formValue.userIdentifier);
    loginFormData.append("password", formValue.password);

    try {
      await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/account-management/authenticate",
        data: loginFormData,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
        document.cookie = `token=${res.data.token}`;
        navigate("/");
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
            type="userIdentifier"
            name="userIdentifier"
            variant="outlined"
            margin="normal"
            label="Username or E-mail"
            defaultValue={formValue.userIdentifier}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            inputProps={{ style: { color: "white" } }}
            type="password"
            name="password"
            variant="outlined"
            margin="normal"
            label="Password"
            defaultValue={formValue.password}
            onChange={handleChange}
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
              New user?
              <br />
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
