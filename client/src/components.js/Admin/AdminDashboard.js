import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import { GlobalContext } from '../../GlobalContext';
import { NavLink } from 'react-router-dom';


export default function AdminDashboard() {

  const data = useContext(GlobalContext);
  const [products] = data.productApi.products;
  const [allUsers] = data.authApi.allUsers

  return (
    <Grid container bgcolor="primary.main" sx={{display: 'flex', alignItems: 'center', justifyContent:"space-around", height:"100vh"}}>
        <Grid item>          
          <Card sx={{ maxWidth: 400, display: "flex", justifyContent: "space-around" }} component={Paper} elevation={6} >
          <CardContent>
            <Typography variant="h5" component="div">
              Total Products
            </Typography>
            <Box alignItems="center">
              <Button sx={{ marginTop: "10px", fontSize: "40px" }}>{products.length}</Button>
            </Box>
          </CardContent>
          <CardActions >
            <NavLink to={`/product/create`} style={{textDecoration:"none"}} ><Button variant='contained' color='secondary' >Add Product</Button></NavLink>
          </CardActions>
        </Card>        
        </Grid>
      
        <Grid item>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent:"left"}}>
          <Card sx={{ maxWidth: 400, display: "flex", justifyContent: "space-around" }} component={Paper} elevation={6} >
          <CardContent>
            <Typography variant="h5" component="div">
              Total Users
            </Typography>
            <Box alignItems="center">
              <Button sx={{ marginTop: "10px", fontSize: "40px" }}>{allUsers.length}</Button>
            </Box>

          </CardContent>
          <CardActions >
            <NavLink to={`/admin/allUsers`} style={{textDecoration:"none"}} ><Button variant='contained' color='secondary' >See Details</Button></NavLink>
          </CardActions>
        </Card>
        </Box>
        </Grid>
      
    </Grid>



  )}
