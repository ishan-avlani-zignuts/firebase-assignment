import React, { useState } from "react";
import { TextField, Button, Card, Typography, Grid } from "@mui/material";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

import AddBoxIcon from '@mui/icons-material/AddBox';
import { toast } from "react-toastify";

const AddTodo = () => {
  const [task, setTask] = useState("");
  const firebase = useFirebase();
  const navigate = useNavigate();
  const handleAddTodo = async (e) => {
    e.preventDefault();
   // console.log("Adding todo:", task);
   toast.success("Adding todo:", task)
    await firebase.handleAddTodo(task);
   // console.log("Todo added successfully");
    toast.success("todo added successfully")
    setTask("");
    navigate("/manage");
  };

  //console.log("Rendering AddTodo component");

  return (
    <Grid container spacing={0}>
      <Grid
        style={{
          backgroundImage: 'url("/images/bg.avif")',
          backgroundSize: "cover",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.5,
          zIndex: -1,
        }}
      />

      <Grid
        container
        spacing={0}
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ padding: "20px", textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Add Todo
              <AddBoxIcon sx={{ fontSize: "inherit" }} />
            </Typography>

            <form onSubmit={handleAddTodo}>
              <TextField
                label="Task"
                variant="outlined"
                fullWidth
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Task
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddTodo;
