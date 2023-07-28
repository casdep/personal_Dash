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
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [userIdentifierError, setUserIdentifierError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  async function handleSubmit() {
    const loginFormData = new URLSearchParams();

    if (!formValue.userIdentifier) {
      setUserIdentifierError(true);
    } else {
      setUserIdentifierError(false);
    }

    if (!formValue.password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (!formValue.userIdentifier || !formValue.password) {
      return;
    }

    loginFormData.append("userIdentifier", formValue.userIdentifier);
    loginFormData.append("password", formValue.password);

    try {
      await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/account-management/authenticate",
        data: loginFormData,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        document.cookie = `token=${res.data.token}`;
        navigate("/");
        window.location.reload();
      });
    } catch (error) {
      setWrongCredentials(true);
    }
  }

  function handleChange(event) {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="login">
      <div className="pageTitle">
        <h1>Login</h1>
      </div>

      <div className="login_container">
        <div className="login_container--content">
          <div className="input_fields">
            {wrongCredentials && (
              <p>The username/email or password provided is incorrect</p>
            )}
            <TextField
              inputProps={{ style: { color: "white" } }}
              type="text"
              name="userIdentifier"
              variant="outlined"
              margin="normal"
              label="Username or email"
              defaultValue={formValue.userIdentifier}
              onChange={handleChange}
              fullWidth
              error={userIdentifierError}
              helperText={
                userIdentifierError ? "Please enter your username or email" : ""
              }
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
              error={passwordError}
              helperText={passwordError ? "Please enter your password" : ""}
            />
          </div>
          <div className="footer_items">
            <div className="footer_item_one">
              <Button variant="contained" onClick={() => handleSubmit()}>
                Log in
              </Button>

              <Typography
                gutterBottom
                variant="body1"
                component={"span"}
                inputProps={{ style: { color: "red" } }}
              >
                <Link href="/register" underline="hover">
                  {"Forgot password?"}
                </Link>
              </Typography>
            </div>
            <hr />
            <div className="footer_item_two">
              <Button variant="contained" href="/register">
                Create new account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
