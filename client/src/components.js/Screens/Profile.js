import React, { useContext } from "react";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import { GlobalContext } from "../../GlobalContext";
import { NavLink } from "react-router-dom";

import { Container} from "@mui/system";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

export default function Profile() {
  const data = useContext(GlobalContext);
  const [user] = data.authApi.userData;
  const [isUser] = data.authApi.isUser;

  return (
    <Box sx={{ backgroundColor: "primary.main", pt: "50px" }}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: { xs: "140vh", md: "100vh", lg: "100vh" },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign="center">
            <Typography
              sx={{
                py: 2,
                color: "primary.main",
                backgroundColor: "secondary.main",
                fontWeight: "bold",
              }}
              variant="h4"
            >
              My Profile
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <Card sx={{ height: "100%" }}>
              {user.image ? (
                <Box sx={{display:"flex", justifyContent:"center", height:"360px"}}>
                <img
                  height="100%"
                  src={user.image.url}
                  alt={user.name}
                />
                </Box>
              ) : (
                <CardContent>
                  <Typography variant="h5"> No image found </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={7}>
            <Card sx={{ height: "370px", color: "primary.main" }}>
              <CardHeader
                component="h1"
                sx={{
                  textAlign: "center",
                  textTransform: "capitalize",
                  background: "#DEA057",
                  fontWeight: "15px",
                }}
                title={user.name}
              />

              <CardContent sx={{ color: "primary.main" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <Typography>
                    <EmailRoundedIcon /> <strong>Email</strong>{" "}
                  </Typography>
                  <Box
                    component="span"
                    sx={{ color: "secondary.main", fontWeight: "bolder" }}
                  >
                    {user.email}
                  </Box>
                </div>
                <Divider />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <Typography>
                    <PhoneAndroidRoundedIcon /> <strong>Mobile</strong>{" "}
                  </Typography>
                  <Box
                    component="span"
                    sx={{ color: "secondary.main", fontWeight: "bolder" }}
                  >
                    {user.mobile}
                  </Box>
                </div>
                <Divider />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <Typography>
                    <PersonRoundedIcon /> <strong>Role</strong>{" "}
                  </Typography>
                  <Box
                    component="span"
                    sx={{ color: "secondary.main", fontWeight: "bolder" }}
                  >
                    {user.role}
                  </Box>
                </div>
                <Divider />

                <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                  <NavLink
                    to={`/profile/update/${user._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="large" variant="contained">Edit</Button>
                  </NavLink>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
