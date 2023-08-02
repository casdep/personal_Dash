import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { TextField, Button } from "@mui/material";

import "./register.scss";
import "../../assets/scss/theme.scss";

export default function Register() {
  const navigate = useNavigate();

  const [formValue, setformValue] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmed: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  async function handleSubmit() {
    const registerFormData = new URLSearchParams();

    if (!formValue.username) {
      setUsernameError("Please enter an username");
    } else if (formValue.username.length < 3) {
      setUsernameError("Username must be atleast 3 charachters long");
    } else {
      setUsernameError();
    }

    if (!formValue.email) {
      setEmailError("Please enter your email");
    } else if (!formValue.email.match(/^\S+@\S+\.\S+$/)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError();
    }

    if (!formValue.password) {
      setPasswordError("Please enter a password");
    } else if (formValue.password.length < 8) {
      setPasswordError("Password must be atleast 8 charachters long");
    } else {
      setPasswordError();
    }

    if (!formValue.passwordConfirmed) {
      setPasswordConfirmError("Please confirm your password");
    } else if (formValue.passwordConfirmed !== formValue.password) {
      setPasswordConfirmError("Passwords do not match");
    } else {
      setPasswordConfirmError();
    }

    if (
      !formValue.username ||
      formValue.username.length < 3 ||
      !formValue.email ||
      !formValue.email.match(/^\S+@\S+\.\S+$/) ||
      !formValue.password ||
      formValue.password.length < 8 ||
      !formValue.passwordConfirmed ||
      formValue.passwordConfirmed !== formValue.password
    ) {
      return;
    }

    registerFormData.append("email", formValue.email);
    registerFormData.append("username", formValue.username);
    registerFormData.append("password", formValue.password);

    try {
      await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/account-management/users",
        data: registerFormData,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        navigate("/login");
      });
    } catch (error) {}
  }

  function handleChange(event) {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="register">
      <div className="pageTitle">
        <h1>Register</h1>
      </div>
      <div className="register_container">
        <div className="register_container--content">
          <div className="input_fields">
            <TextField
              type="text"
              name="username"
              margin="normal"
              label="Username"
              defaultValue={formValue.username}
              onChange={handleChange}
              fullWidth
              error={usernameError}
              helperText={usernameError}
            />
            <TextField
              type="email"
              name="email"
              margin="normal"
              label="E-maildress"
              defaultValue={formValue.email}
              onChange={handleChange}
              fullWidth
              error={emailError}
              helperText={emailError}
            />

            <TextField
              type="password"
              name="password"
              margin="normal"
              label="Password"
              defaultValue={formValue.password}
              onChange={handleChange}
              fullWidth
              error={passwordError}
              helperText={passwordError}
            />
            <TextField
              type="password"
              name="passwordConfirmed"
              margin="normal"
              label="Confirm Password"
              defaultValue={formValue.passwordConfirmed}
              onChange={handleChange}
              fullWidth
              error={passwordConfirmError}
              helperText={passwordConfirmError}
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
    </div>
  );
}
