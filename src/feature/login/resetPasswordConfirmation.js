import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";

import "./resetPasswordConfirmation.scss";

export default function ResetPasswordConfirmation() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityCode, setSecurityCode] = useState(Array(6).fill(""));
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    securityCode: "",
  });

  function handleSubmit() {
    const newErrors = {};

    if (!password) {
      newErrors.password = "Please enter a password";
    } else if (password.length < 8) {
      newErrors.password = "Password must be atleast 8 charachters long";
    } else {
      newErrors.password = "";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const securityCodeString = securityCode.join("");
    if (!securityCodeString) {
      newErrors.securityCode = "Please enter the security code";
    } else if (!/^\d{6}$/.test(securityCodeString)) {
      newErrors.securityCode = "Security code must be 6 digits";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", {
        password,
        confirmPassword,
        securityCode: securityCodeString,
      });
    }

    const payload = {
      securityCode: securityCodeString,
    };

    axios
      .post("https://dummyapi.com/verify", payload)
      .then((response) => {
        if (response.status === 200) {
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("There was an error with the API call:", error);
      });
  }

  const handleSecurityCodeChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...securityCode];
    newCode[index] = value;
    setSecurityCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(
        `input[name=securityCode-${index + 1}]`
      );
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !securityCode[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[name=securityCode-${index - 1}]`
      );
      if (prevInput) {
        prevInput.focus();
        const newCode = [...securityCode];
        newCode[index - 1] = "";
        setSecurityCode(newCode);
      }
    }
  };

  return (
    <div className="resetPassword">
      <div className="pageTitle">
        <h1>Reset Password</h1>
      </div>
      <div className="resetPasswordWrapper">
        <div className="resetPasswordWrapper--content">
          <TextField
            type="password"
            name="password"
            margin="normal"
            label="New Password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            type="password"
            name="confirmPassword"
            margin="normal"
            label="Confirm Password"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p>
            <b>Security Code</b>
          </p>

          <div className="security-code-input">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <TextField
                  key={index}
                  name={`securityCode-${index}`}
                  type="text"
                  value={securityCode[index]}
                  onChange={(e) =>
                    handleSecurityCodeChange(index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  inputProps={{ maxLength: 1 }}
                  error={!!errors.securityCode && index === 0}
                />
              ))}
          </div>
          {errors.securityCode && (
            <Typography
              color="error"
              variant="caption"
              style={{ marginLeft: "14px", color: "red" }}
            >
              {errors.securityCode}
            </Typography>
          )}
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
                Confirm Password Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
