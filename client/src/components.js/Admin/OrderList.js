import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";

import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";

function OrderList() {
  const context = useContext(GlobalContext);
  const [token] = context.token;
  const [orders, setOrders] = useState([]);
  const [userData] = context.authApi.userData;

  useEffect(() => {
    const getOrders = async () => {
      let res = await axios.get(`/api/v1/order/allOrders`, {
        headers: { Authorization: token },
      });
      setOrders(res.data.orders);
    };
    getOrders();
  }, []);

  if (orders.length === 0) {
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
          <Typography
            variant="h3"
            sx={{ display: "flex" }}
            component="div"
          >
            Hi,
            <Typography variant="h3" fontWeight={600} mx={2} color="#fff">
              {userData.name}
            </Typography>
          </Typography>
          <Typography mt={2} variant="h4"> No Orders Yet....</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      paddingTop="80px"
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
          All Orders
        </Typography>
        <Grid container spacing={1}>
          <Grid item lg={12} xs={12} md={12}>
            <TableContainer component={Paper} overflow="auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      ORDER ID
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      ADDRESSS
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      DATE
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      STATUS
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      CART
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Total
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      PAYMENT STATUS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders &&
                    orders.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">{item.orderId}</TableCell>
                          <TableCell align="center">{item.address}</TableCell>
                          <TableCell align="center">
                            {new Date(item.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell align="center">
                            {item.orderStatus}
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>
                              <details>
                                <summary>Details</summary>
                                <Box
                                  sx={{
                                    height: "200px",
                                    width: "200px",
                                    overflow: "auto",
                                  }}
                                >
                                  {item.cart.map((item, index) => {
                                    return (
                                      <Box key={index}>
                                        <Box >
                                          <img
                                            src={item.image.url}
                                            height="150vh"
                                            width="150px"
                                          />
                                        </Box>
                                        <Box>
                                          <Typography component="h5">
                                            {item.title}
                                          </Typography>
                                          <Typography
                                            component="p"
                                            variant="span"
                                          >
                                            &#8377; {item.price}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    );
                                  })}
                                </Box>
                              </details>
                        
                          </TableCell>
                          <TableCell align="center">
                            {item.finalTotal}
                          </TableCell>
                          <TableCell align="center">
                            {item.paymentStatus}
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

export default OrderList;
