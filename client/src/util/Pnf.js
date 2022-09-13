import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function Pnf() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "primary.main",
        flexDirection: "column",
        color: "secondary.main",
      }}
    >
      <Box>
        <Typography mt={2} variant="h4">
          Page Not Found ...
        </Typography>
      </Box>
      <NavLink to={`/`} style={{ textDecoration: "none", color: "black" }}>
        <Button
          variant="contained"
          sx={{
            padding: " 10px",
            marginY: "20px",
            backgroundColor: "secondary.main",
            color: "primary.main",
            ":hover": {
              color: "secondary.main",
            },
          }}
        >
          Go back to Home Page
        </Button>
      </NavLink>
    </Box>
  );
}

export default Pnf;
