import React,{useContext, useState, useEffect} from 'react'
import {GlobalContext} from "../../GlobalContext"
import {NavLink} from 'react-router-dom'
import axios from 'axios'

import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Container } from '@mui/system'


export default function Cart() {
    const data = useContext(GlobalContext)
    const [cart, setCart] = data.authApi.cart;
     const [token] = data.token
     const orderUpdate = data.authApi.orderUpdate
     const [finalTotal, setFinalTotal] =data.authApi.finalTotal;
  
    const [total, setTotal] = useState(0) // total price
    const [gst, setGst]= useState(5); //can be 5 ,12, 18, 26 // gst => cgst & sgst
    const [dc, setDC] = useState(30); //delivery charge
   
    const [order,setOrder] = data.authApi.order

    useEffect(()=>{
        const getTotal = () =>{
          const total = cart.reduce((prev, item)=>{
            return prev+ (item.price*item.quantity)
          },0)
          setTotal(total)
          let gstTotal  = Math.round(total*(5/100))
          let final = total + gstTotal+ dc; 
          setFinalTotal(final)
    
        }
        getTotal();
      },[cart])
    
       
  //inc count of items 
 
    const incCount = (id) =>{
        cart.forEach(item=>{
          if(item._id===id){
            item.quantity += 1
          }
        });
        setCart([...cart])
        updateCart(cart)

         //order update
      setOrder(cart,finalTotal)
      storeOrder(cart,finalTotal)
      }
  //to dec the count of items
  const decCount = (id) => {
    cart.forEach(item=>{
      if(item._id===id){
        item.quantity === 1 ? item.quantity = 1 : item.quantity -=1;
      }
    });
    setCart([...cart])
    updateCart(cart)

     //order update
     setOrder(cart,finalTotal)
     storeOrder(cart,finalTotal)
  
}

//update the cart
const updateCart = async (cart) =>{
  await axios.patch(`/api/v1/auth/addToCart`, {cart},{
    headers: {Authorization: token}
  })
}

//delete from cart

const delItem = (id) =>{
  if(window.confirm('Do you want to remove the product')){
    cart.forEach((item, index)=>{
      if(item._id===id) {
        cart.splice(index,1)
      }
    });
    setCart([...cart]);
    updateCart(cart)
  }
}

const storeOrder = async (cart,finalTotal) => {
  await orderUpdate(cart,finalTotal)
}


if(cart.length === 0){
  return (
    <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", height:"90vh", bgcolor:"primary.main", color:"white"}}>
      <Typography variant='h2' >Cart is Empty</Typography>
    </Box>
  ) 
}  
  return (
    <Box sx={{ backgroundColor: "primary.main", pt: "50px" }}>
      <Container
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: { xs: "110vh", md: "100vh", lg: "100vh" },
    }}>
      <Grid container gap="50px" >
        <Grid item xs={12} sm={6} md={6} >
        <TableContainer component={Paper}  >
            <Table  bgcolor="#DEA057">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    ITEM NAME
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    IMAGE
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    PRICE
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    WEIGHT
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    NUMBER OF ITEMS
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    CANCEL
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart &&
                  cart.map((item, index) => {
                    const { _id, title, image, price, qnty, quantity } = item;
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{title}</TableCell>
                        <TableCell align="center">
                          <img src={image.url} alt="" height={70} width={90} />
                        </TableCell>
                        <TableCell align="center">&#8377; {price}</TableCell>
                        <TableCell align="center">{qnty}</TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              sx={{ padding: 0, minWidth: "35px" }}
                              onClick={() => decCount(_id)}
                            >
                              <RemoveIcon sx={{ display: "inline-block" }} />
                            </Button>
                            <Typography
                              fontWeight={600}
                              sx={{ padding: "0px 8.9px" }}
                            >
                              {quantity}
                            </Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{ padding: 0, minWidth: "35px" }}
                              onClick={() => incCount(_id)}
                            >
                              <AddIcon />
                            </Button>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <DeleteIcon
                            onClick={() => delItem(_id)}
                            color="error"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
        <Card sx={{backgroundColor:"secondary.main"}}>
            <CardHeader  align="center" title="Order Details" />
            <Divider  sx={{paddingX:'2px',marginY:'10px', backgroundColor:"#ffffff", height:"2px"}}/>

            <CardContent >
              <Box
                sx={{
                  display: "flex",
                  mt: 1.5,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Sub Total
                </Typography>
                <Typography variant="h6">&#8377;{total}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 1.5,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Gst (cgst+sgst)
                </Typography>
                <Typography variant="h6">{gst} %</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 1.5,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Delivery Charges
                </Typography>
                <Typography variant="h6">&#8377;{dc}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 1.5,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Total
                </Typography>
                <Typography variant="h6">&#8377; {finalTotal}</Typography>
              </Box>
            </CardContent>
            <CardActions
              sx={{ display: "flex", mt: 1.5, justifyContent: "center" }}
            >
              <NavLink
                to={'/checkout'}
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined" style={{backgroundColor:"primary.main"}}>Continue</Button>
              </NavLink>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>  
    </Box>
     
  );
}
