import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Typography, TextField, Button, Box, Card } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GoogleIcon from "@mui/icons-material/Google";
import { useFirebase } from "../context/Firebase";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginPage = () => {
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  //console.log(firebase);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await firebase.loginUserWithEmailAndPassword(
      email,
      password
    );
   // console.log("login done", result);
   toast.success("login done", result)
    navigate("/add");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    const result1 = await firebase.loginWithGoogle();
  //  console.log("google login done", result1);
  toast.success("google login done", result1)
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
              Login
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
                  onClick={handleLogin}
                >
                  Submit
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  startIcon={<GoogleIcon />}
                  sx={{ marginRight: "10px" }}
                  onClick={handleGoogleLogin}
                >
                  Login with Google
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AddCircleIcon />}
                  href="/register"
                >
                  New Account
                </Button>
              </Box>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
