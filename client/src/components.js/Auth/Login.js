import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Card } from "@mui/material";
import useValidate from "../../helpers/validateReg";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();
  const {errors, validate} = useValidate()

  const readValue = (e) => {
    const { name, value } = e.target;
    validate(name, value)    
    setUser({...user, [name]:value})
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/v1/auth/login`, user).then(res=>{
          toast.success("User Login Successfull")
          localStorage.setItem('loginToken', true)
          navigate("/")
          window.location.reload()
      }).catch(err => toast.error(err.response.data.msg))
  }catch(error){
      toast.error(error.response.data.msg)
      }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
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
            height: "100vh",
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
                  <VpnKeyIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Log In
                </Typography>
              </Box>
              <Box
                component="form"
                autoComplete="off"
                onSubmit={submitHandler}
                sx={{ mt: 3 }}
              >
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  sx={{ mt: 3 }}
                  value={user.email}
                  onChange={readValue}
                />
                  {
                        errors && errors.email ? (
                            <p style={{color:"red"}}>{errors.email}</p>
                        ) : null
                    }
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={readValue}
                  sx={{ mt: 3 }}
                />
                  {
                        errors && errors.password ? (
                            <p style={{color:"red"}}>{errors.password}</p>
                        ) : null
                    }
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
