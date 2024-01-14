import React, { useState } from "react";

import { Link } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";

import "./resetPassword.scss";

export default function ResetPassword() {
  const [userIdentifierError, setUserIdentifierError] = useState(false);

  function handleSubmit() {
    console.log("lol");
    //todo
    setUserIdentifierError("lol");
  }

  return (
    <div className="resetPassword">
      <div className="pageTitle">
        <h1>Reset Password</h1>
      </div>
      <div className="resetPasswordWrapper">
        <div className="resetPasswordWrapper--content">
          <TextField
            type="text"
            name="userIdentifier"
            margin="normal"
            label="Email address"
            fullWidth
            error={userIdentifierError}
            helperText={
              userIdentifierError ? "Please enter your email address" : ""
            }
          />
          <div className="footer_items">
            <div className="footer_item_one">
              <Typography
                gutterBottom
                variant="body1"
                component={"span"}
                inputProps={{ style: { color: "red" } }}
              >
                <Link to="/login" underline="hover">
                  {"Return to log in"}
                </Link>
              </Typography>
              <Button variant="contained" onClick={() => handleSubmit()}>
                Submit password reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
