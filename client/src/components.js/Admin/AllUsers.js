import React, { useContext, useState } from "react";
import { GlobalContext } from "../../GlobalContext";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container } from "@mui/system";

function AllUsers() {
  const data = useContext(GlobalContext);
  const [allUsers] = data.authApi.allUsers;

  return (
    <Box
      height="100vh"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      bgcolor="primary.main"
    >
      <Container>
        <Typography
          component="h1"
          variant="h2"
          textAlign="center"
          mb={5}
          color="secondary.main"
        >
          All Users' Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item lg={12} xs={12} md={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.5em",
                        color: "primary.main",
                      }}
                    >
                      NAME
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.5em",
                        color: "primary.main",
                      }}
                    >
                      EMAIL
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.5em",
                        color: "primary.main",
                      }}
                    >
                      MOBILE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.5em",
                        color: "primary.main",
                      }}
                    >
                      ROLE
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allUsers &&
                    allUsers.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell
                            align="center"
                            sx={{
                              color: "secondary.main",
                              textTransform: "uppercase",
                            }}
                          >
                            {item.name}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "secondary.main" }}
                          >
                            {item.email}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "secondary.main" }}
                          >
                            {item.mobile}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color: "secondary.main",
                              textTransform: "uppercase",
                            }}
                          >
                            {item.role}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AllUsers;
