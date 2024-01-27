import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { TextField, Button, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
  const [showPassword, setShowPassword] = useState(false);

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
        const expirationDate = new Date();
        //sets the cookie for one year
        expirationDate.setFullYear(expirationDate.getFullYear() + 10);
        document.cookie = `token=${
          res.data.token
        }; expires=${expirationDate.toUTCString()};`;
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

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleKeyPress(event) {
    console.log(event);
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();

      if (event.target.name === "userIdentifier") {
        // If Enter is pressed in the username field, focus on the password field
        document.getElementById("passwordField").focus();
      } else if (event.target.name === "password") {
        // If Enter is pressed in the password field, submit the form
        handleSubmit();
      }
    }
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
              type="text"
              name="userIdentifier"
              margin="normal"
              label="Username or email"
              defaultValue={formValue.userIdentifier}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              fullWidth
              error={userIdentifierError}
              helperText={
                userIdentifierError ? "Please enter your username or email" : ""
              }
            />
            <div className="passwordRow">
              <TextField
                id="passwordField"
                type={showPassword ? "text" : "password"}
                name="password"
                margin="normal"
                label="Password"
                defaultValue={formValue.password}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                fullWidth
                error={passwordError}
                helperText={passwordError ? "Please enter your password" : ""}
              />
              <div className="showPassword">
                <IconButton
                  onClick={togglePasswordVisibility}
                  style={{ color: "#4299ff" }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </div>
            </div>
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
                <Link to="/resetPassword" underline="hover">
                  {"Forgot password?"}
                </Link>
              </Typography>
            </div>
            <hr />
            <div className="footer_item_two">
              <Link to="/register">
                <Button variant="contained">Create new account</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
