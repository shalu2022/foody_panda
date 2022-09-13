import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";

import useValidate from "../../helpers/validateReg";

function Register() {
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { errors, validate } = useValidate();

  const readValue = (e) => {
    const { name, value } = e.target;
    validate(name, value);
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`/api/v1/auth/register`, user)
        .then((res) => {
          toast.success("User registerted successfully");
          navigate("/");
        })
        .catch((err) => toast.error(err.response.data.msg));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "120vh",
        bgcolor: "primary.main",
        color: "white",
      }}
    >
      <Container>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <Grid item lg={5} sx={{ boxShadow: 20 }}>
            <Card sx={{ backgroundColor: "secondary.main", padding: "24px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  <AddReactionIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Register
                </Typography>
              </Box>
              <Box
                component="form"
                autoComplete="off"
                onSubmit={submitHandler}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      name="name"
                      required
                      fullWidth
                      type="text"
                      id="name"
                      label="Name"
                      autoFocus
                      value={user.name}
                      onChange={readValue}
                    />
                    {errors && errors.name ? (
                      <p style={{ color: "red", padding: "0", margin: "0" }}>
                        {errors.name}
                      </p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="mobile"
                      label="Mobile"
                      name="mobile"
                      type="number"
                      required
                      autoComplete="off"
                      value={user.mobile}
                      onChange={readValue}
                    />
                    {errors && errors.mobile ? (
                      <p style={{ color: "red" }}>{errors.mobile}</p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      autoComplete="off"
                      value={user.email}
                      onChange={readValue}
                    />
                    {errors && errors.email ? (
                      <p style={{ color: "red" }}>{errors.email}</p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="off"
                      value={user.password}
                      onChange={readValue}
                    />
                    {errors && errors.password ? (
                      <p style={{ color: "red" }}>{errors.password}</p>
                    ) : null}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item >
                    <Link
                      href="/login"
                      variant="body2"
                      sx={{ "&:hover": { color: "primary.main" } }}
                    >
                      <Typography>Already have an account? Sign in</Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default Register;
