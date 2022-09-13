import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const Checkout = () => {
  const navigate = useNavigate();

  const context = useContext(GlobalContext);
  const [token] = context.token;
  const [order, setOrder] = context.authApi.order;
  const [finalTotal] = context.authApi.finalTotal;
  const [cart, setCart] = context.authApi.cart;

  const [data, setData] = useState({
    address: "",
    paymentMode: "",
  });

  const readValue = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `/api/v1/order/newOrder`,
      {
        cart: cart,
        address: data.address,
        finalTotal: finalTotal,
        paymentMode: data.paymentMode,
        paymentId: Math.floor(Math.random() * 12345689),
        paymentStatus: "unpaid",
      },
      {
        headers: { Authorization: token },
      }
    );
    toast.success("order updated successfully");
    setCart([]);
    navigate(`/`);
  };

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
          <Grid item lg={6} xs={12} md={6} sx={{ boxShadow: 20}} >
            <Card sx={{backgroundColor:"secondary.main"}}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding:"10px",
                  marginTop:"20px",
                  color:"primary.main"
                }}
              >               
                    <Typography variant="h4">Checkout Window</Typography>
                    <Typography
                     
                      variant="h5"
                     
                    >
                      Cart Total = &#8377; {finalTotal ? finalTotal : null}
                    </Typography>
               </Box>
                 <Box
                    component="form"
                    onSubmit={submitHandler}
                    sx={{ display: "flex", flexDirection: "column", padding:"30px" }}
                  >
                    <FormControl >
                      <FormLabel sx={{fontSize:"25px", color:"primary.main"}}>Address:</FormLabel>
                      <TextareaAutosize                     
                        minRows={5}
                        name="address"
                        onChange={readValue}
                      />
                    </FormControl>

                    <FormControl sx={{ width: "500px", marginTop: "5" }}>
                      <FormLabel id="pay" sx={{fontSize:"25px", color:"primary.main"}}>Payment Mode:</FormLabel>
                      <RadioGroup
                        aria-labelledby="pay"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="cod"
                          control={<Radio />}
                          label="Cash on Delivery"
                          name="paymentMode"
                          checked={data.paymentMode === "cod"}
                          onChange={readValue}
                        />
                        {/* <FormControlLabel value="card" control={<Radio /> } label="Credit/Debit Card" name="paymentMode" checked={data.paymentMode === "card"} onChange ={readValue} /> */}
                      </RadioGroup>
                    </FormControl>

                    <Button
                      variant="contained"
                      color="primary"
                      mt={3}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Box>
             
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Checkout;
