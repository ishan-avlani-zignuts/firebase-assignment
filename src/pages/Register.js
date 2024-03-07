import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Typography, TextField, Button, Box, Card } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useFirebase } from "../context/Firebase";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //console.log(firebase);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await firebase.signupUserWithEmailAndPassword(
      email,
      password
    );
   // console.log("signup done", result);
   toast.success("signup done")
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
              Signup
              <AccountCircleIcon sx={{ fontSize: "inherit" }} />
            </Typography>

            <form>
              <TextField
                id="email"
                label="Email address"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleEmailChange}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handlePasswordChange}
              />
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<KeyIcon />}
                  sx={{ marginRight: "10px" }}
                  onClick={handleSubmit}
                  href="/login"
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AddCircleIcon />}
                  href="/login"
                >
                  Back
                </Button>
              </Box>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
