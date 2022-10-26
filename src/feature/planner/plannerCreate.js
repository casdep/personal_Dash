import React from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import "./plannerCreate.css";

const plannerCreate = () => {
  const [formValue, setformValue] = React.useState({
    title: "",
    category: "",
    discription: "",
  });

  async function submitLoginCredentials() {
    const createTaskFormData = new URLSearchParams();

    createTaskFormData.append("username", formValue.user);
    createTaskFormData.append("password", formValue.title);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/login",
        data: createTaskFormData,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    console.log(event);
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={submitLoginCredentials}>
      <h1> Create item </h1>

      <div className="container">
        <div className="item">
          <div>
            <TextField
              inputProps={{ style: { color: "white" } }}
              id="outlined-basic"
              variant="outlined"
              margin="normal"
              color="primary"
              label="Title"
              defaultValue={formValue.title}
              onChange={handleChange()}
              focused
            />
          </div>
        </div>
        <div className="item_right">
          <div>
            <TextField
              inputProps={{ style: { color: "white" } }}
              id="outlined-basic"
              variant="outlined"
              margin="normal"
              color="primary"
              label="Category"
              defaultValue={formValue.category}
              onChange={handleChange}
              focused
            />
          </div>
        </div>
      </div>

      <div>
        <TextField
          inputProps={{ style: { color: "white" } }}
          id="outlined-basic"
          variant="outlined"
          margin="normal"
          color="primary"
          label="Discription"
          defaultValue={formValue.discription}
          onChange={handleChange}
          focused
          fullWidth
        />
      </div>

      <br />

      <Button variant="contained" onClick={() => submitLoginCredentials()}>
        Submit
      </Button>
    </form>
  );
};

export default plannerCreate;
