import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Snackbar, Alert } from "@mui/material";

import "./register.scss";
import "../../assets/scss/theme.scss";

export default function Register() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [formValue, setformValue] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmed: "",
  });

  async function handleSubmit() {
    const registerFormData = new URLSearchParams();

    if (
      formValue.password === formValue.passwordConfirmed &&
      formValue.email.match(/^\S+@\S+\.\S+$/) &&
      formValue.username.length > 2 &&
      formValue.password.length > 7
    ) {
      registerFormData.append("email", formValue.email);
      registerFormData.append("username", formValue.username);
      registerFormData.append("password", formValue.password);
      registerFormData.append("role", "Member");

      try {
        await axios({
          method: "post",
          url: process.env.REACT_APP_API_URL + "/account-management/users",
          data: registerFormData,
          headers: { "content-type": "application/x-www-form-urlencoded" },
        }).then((res) => {
          console.log(res);
          navigate("/login");
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      //todo alert wrong input
      handleClick();
    }
  }

  function handleChange(event) {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="Register">
      <h1>Register</h1>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        severity="error"
        onClose={handleClose}
        message="I love snacks"
      >
        <Alert severity="error">wejooo broer</Alert>
      </Snackbar>

      <div className="Register_container">
        <div className="input_fields">
          <div className="input_field_top_bar">
            <div className="input_field_top_bar_username">
              <TextField
                type="username"
                name="username"
                margin="normal"
                label="Username"
                defaultValue={formValue.username}
                onChange={handleChange}
                fullWidth
                helperText="Incorrect entry."
              />
            </div>
            <div className="input_field_top_bar_email">
              <TextField
                type="email"
                name="email"
                margin="normal"
                label="E-maildress"
                defaultValue={formValue.email}
                onChange={handleChange}
                fullWidth
              />
            </div>
          </div>

          <TextField
            inputProps={{ style: { color: "white" } }}
            type="password"
            name="password"
            margin="normal"
            label="Password"
            defaultValue={formValue.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            inputProps={{ style: { color: "white" } }}
            type="password"
            name="passwordConfirmed"
            margin="normal"
            label="Confirm Password"
            defaultValue={formValue.passwordConfirmed}
            onChange={handleChange}
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
