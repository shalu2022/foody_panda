import styled from '@emotion/styled';
import { Box, Typography, Stack, Container, Grid, Button, Divider, IconButton } from '@mui/material';
import React from 'react'
// import Footerimage from './../../assets/images/footerimg2.jpg'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { NavLink } from 'react-router-dom';

const Banner = styled(Box)(({ theme }) => ({
 
color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
height:"100%"

}))



const FooterStyle = () => {
  return (

    <Banner sx={{position:"relative", bottom:0}} >
        <Container  >
            <Grid container spacing={2} sx={{display:'flex',justifyContent:'center'}} >
                <Grid item xs={10}>
                    <Typography variant='h4' color='secondary' sx={{textAlign:'center'}}>Let's Be Business Partners</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography sx={{textAlign:'center'}} color='secondary'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id hic, ex aspernatur iusto error corporis omnis itaque ullam nemo eum temporibus optio nihil eos architecto corrupti, laboriosam rerum et quae.  </Typography>
                </Grid>
                <Grid item xs={10} sx={{display:'flex',justifyContent:'center'}}>
                    <Button variant='contained' color='secondary' > <NavLink to={`/contact`} style={{textDecoration:"none", color: "#2b4826"}}> Contact Us </NavLink></Button>
                </Grid>

               
            </Grid>

            <Divider sx={{paddingY:'1px',marginY:'20px'}}/>

            <Grid container spacing={1} sx={{display:'flex',justifyContent:{xs:'flex-start',md:'center'}}}>
                <Grid item xs={6} sm={3} md={2} sx={{color:"secondary.main"}}>
                    <Typography variant='h6'> Support </Typography>
                    <Typography variant="subtitle1">Get Help</Typography>
                    <Typography variant="subtitle1">Feedback</Typography>
                    <Typography variant="subtitle1">Contact us</Typography>
                    <Typography variant="subtitle1">Privacy Policy</Typography>
                </Grid >        
                <Grid item xs={6} sm={3} md={2} sx={{color:"secondary.main"}}>
                    <Typography variant='h6'> Legal </Typography>
                    <Typography variant="subtitle1">Terms and Condition</Typography>
                    <Typography variant="subtitle1">Privacy Policy</Typography>
                    <Typography variant="subtitle1">Disclaimer</Typography>
                    <Typography variant="subtitle1">Caution notice</Typography>
                </Grid>
                       
                <Grid item xs={6} sm={3} md={2} sx={{color:"secondary.main"}}>
                    <Typography variant='h6'>FOODI PANDA</Typography>
                    <Typography variant="subtitle1">About</Typography>
                    <Typography variant="subtitle1">Care</Typography>
                    <Typography variant="subtitle1">Careers</Typography>
                    <Typography variant="subtitle1">Our Golden Past</Typography>
                </Grid>

                <Grid item xs={12} md={3} sx={{color:'white',textAlign:{xs:'center',md:'left'}}}>
                    <Typography variant='h6' sx={{color:"secondary.main"}}>Follow Us</Typography>
                    <IconButton >
                        <FacebookIcon sx={{color:"secondary.main", fontSize:"50px"}}/>
                    </IconButton> 
                    <IconButton >
                        <InstagramIcon sx={{color:"secondary.main", fontSize:"50px"}}/>
                    </IconButton> 
                    <IconButton >
                        <TwitterIcon sx={{color:"secondary.main", fontSize:"50px"}}/>
                    </IconButton> 
                    <IconButton >
                        <YouTubeIcon sx={{color:"secondary.main", fontSize:"50px"}}/> 
                    </IconButton> 
                    
                </Grid>              

            </Grid>

            <Divider  sx={{paddingY:'1px',marginY:'20px'}}/>

            <Grid container spacing={2} sx={{color:"secondary.main"}}>
                <Grid item xs={12} md={12} sx={{display:'flex',justifyContent:"center"}}>
                    <Typography variant='p'>Copyright © FOODI PANDA 2022 All Rights Reserved</Typography>
                </Grid>
            </Grid>

            

        </Container>
    </Banner>
   
  )
}

export default FooterStyle






// import React from "react";
// import {
//   Box,
//   MenuItem,
//   MenuList,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";

// import { styled } from "@mui/material/styles";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import { Container } from "@mui/system";
// import { NavLink } from "react-router-dom";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// function Footer() {
//   return (
//     <Box sx={{bgcolor: 'primary.main', marginTop:"20px"}}>
//       <Container >
//         <Grid container p={5}>
//         <Grid item xs={12} lg={3} sm={6} padding={1}  textAlign="center" >
//           <Typography variant="h5" component="p" sx={{padding:"10px"}} >About</Typography>
//             <MenuList sx={{ display: "inline-block", margin:"0", padding:"10px"}} >            
//               <MenuItem ><NavLink to={`/`}>Profile</NavLink></MenuItem>
//               <MenuItem ><NavLink to={`/`}>Profile</NavLink></MenuItem>
//               <MenuItem ><NavLink to={`/`}>Profile</NavLink></MenuItem>
//             </MenuList>
//           </Grid>
//           <Grid item xs={12} lg={3}  sm={6}  padding={1} textAlign="center" >
//           <Typography variant="h5" component="p" sx={{padding:"10px"}} >About</Typography>
//             <MenuList sx={{ display: "inline-block", margin:"0", padding:"10px"}} >            
//             <MenuItem ><NavLink to={`/`}>Profile</NavLink></MenuItem>
//               <MenuItem ><NavLink to={`/`}>Profile</NavLink></MenuItem>
//               <MenuItem ><NavLink to={`/`}>Profile</NavLink></MenuItem>
//             </MenuList>
//           </Grid>
//           <Grid item xs={12} lg={3}  sm={6}  padding={1} textAlign="center" >
//           <Typography variant="h5" component="p" sx={{padding:"10px"}} >About</Typography>
//             <MenuList sx={{ display: "inline-block", margin:"0", padding:"10px"}} >            
//             <MenuItem ><NavLink to={`/`}>Profile</NavLink></MenuItem>
//               <MenuItem ><NavLink to={`/`}>Profile</NavLink></MenuItem>
//               <MenuItem ><NavLink to={`/`}>Profile</NavLink></MenuItem>
//             </MenuList>
//           </Grid>
//           <Grid item xs={12} lg={3}  sm={6}  padding={1} textAlign="center" >
//           <Typography variant="h5" component="p" sx={{padding:"10px"}} >About</Typography>
//             <MenuList sx={{ display: "inline-block", margin:"0", padding:"10px"}} >            
//             <MenuItem ><NavLink to={`/`}>Profile</NavLink></MenuItem>
//               <MenuItem ><NavLink to={`/`}>Profile</NavLink></MenuItem>
//               <MenuItem ><NavLink to={`/`}>Profile</NavLink></MenuItem>
//             </MenuList>
//           </Grid>
//           </Grid>
          
//       </Container>
//     </Box>
//   );
// }

// export default Footer;
