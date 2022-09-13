import { AppBar, Toolbar,styled,Badge, Avatar, Menu, MenuItem, Box, Tooltip } from '@mui/material'
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { GlobalContext } from '../../GlobalContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const StyledToolbar = styled(Toolbar)(()=>({
    display: "flex",
    justifyContent: "space-between", 
}))


const Icons = styled(Box)(({theme})=>({
    gap: "20px",
    alignItems: "center",
    display:"none",
    [theme.breakpoints.up("sm")]:{
        display:"flex"
    },
    padding: "10px"
    
}))
const IconsBox = styled(Box)(({theme})=>({
    gap: "10px",
    alignItems: "center",
    display:"flex",
    [theme.breakpoints.up("sm")]:{
        display:"none"
    }
}))

const CustomNavLink = styled(NavLink)(({theme})=>({
    textDecoration: "none"
}))

function Navbar() {
    const context = useContext(GlobalContext);

    const [anchorElNav, setAnchorElNav] = useState(null);

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logoutUser = async ()=>{
      if(window.confirm('Are you sure to logout')){
        await axios.get(`/api/v1/auth/logout`)
        localStorage.clear();
        if(isAdmin){
            setIsAdmin(false);
        }
        if(isUser){
            setIsUser(false);
        }
        setIsLogged(false)
        toast.success('Successfully Logout');
        navigate(`/`);
      } else{
        toast.warning('Logout Terminated')
      }
    }

    const [isLogged, setIsLogged] = context.authApi.isLogged;
    const [isAdmin, setIsAdmin] = context.authApi.isAdmin;
    const [isUser, setIsUser] = context.authApi.isUser;
    const [userData] = context.authApi.userData;
    const [cart] = context.authApi.cart
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
  
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };


  return (
    <AppBar  sx={{mt: -1, backgroundColor:"transparent" , boxShadow:"none", position:"absolute", top:"20px"}}>

<Container maxWidth="xl">
  <Toolbar disableGutters>  
    <Box sx={{display: { xs: 'none', lg: 'flex', md:"flex"},}}>
      <NavLink
        to={`/`}
        style={{
          mr: 1,
          
          // display: "none",
          fontSize: "25px",
          letterSpacing: '.3rem',
          color: '#DEA057',
          fontWeight:700,
          textDecoration: 'none',
          fontFamily:"Oswald"      
        }}
      >
        FOODI-PANDA
      </NavLink>
    </Box>  
   

    <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent:{xs: 'space-between'}, flexGrow: 2 }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="secondary"
        sx={{}}
      >
      <img height="50px" src="https://res.cloudinary.com/shalu/image/upload/v1662707743/foody%20panda/icon_mu1xeg.png" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' }
        }}
        
      >
        <MenuItem ><NavLink to={`/`} onClick={handleCloseNavMenu} style={{textDecoration:"none",color:"#DEA057"}}>Home</NavLink ></MenuItem>            
           <MenuItem><NavLink to={`/about`} onClick={handleCloseNavMenu} style={{textDecoration:"none",color:"#DEA057"}}>About</NavLink ></MenuItem>
            <MenuItem><NavLink to={`/contact`} onClick={handleCloseNavMenu} style={{textDecoration:"none",color:"#DEA057"}}>Contact</NavLink ></MenuItem>
            
            {!isLogged &&
            <MenuItem><NavLink to={`/login`} onClick={handleCloseNavMenu} style={{textDecoration:"none",color:"#DEA057"}}>Login</NavLink ></MenuItem>
            }
            
            {!isLogged &&
            <MenuItem><NavLink to={`/register`} onClick={handleCloseNavMenu} style={{textDecoration:"none",color:"#DEA057"}}>Register</NavLink ></MenuItem>
            }

      </Menu>
    </Box>
    
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:"center" }}>
            <Icons >
                 <CustomNavLink to={`/`} ><Button variant="outlined" color="secondary" textalign="center">HOME</Button></CustomNavLink> 

                <CustomNavLink  to={`/about`}><Button variant="outlined" color="secondary" textalign="center">ABOUT</Button></CustomNavLink>

                <CustomNavLink  to={`/contact`}><Button variant="outlined" color="secondary" textalign="center">CONTACT</Button></CustomNavLink > 
            </Icons>
            <Icons>
               {!isLogged &&
                <>
               <CustomNavLink  to={`/login`}><Button variant="outlined" color="secondary" textalign="center">LOGIN</Button></CustomNavLink > 
              <CustomNavLink  to={`/register`}><Button variant="outlined" color="secondary" textalign="center">REGISTER</Button></CustomNavLink >
                </>  
                }                          
            </Icons>
    </Box>
    {isLogged &&
    <>
    <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="User Details">
          
          <IconButton 
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
            <Avatar alt="User" src={userData.image.url} />
          </IconButton>
        </Tooltip>
        {
                    isAdmin ? null : (
                      <NavLink to={`/product/cart`}>
                       <Badge badgeContent={cart.length>0 ? cart.length : 0} color="error" >
                        <ShoppingCartIcon sx={{fontSize:"40px", color:"secondary.main"}} />
                      </Badge>
                       </NavLink>
                    )
        }      
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }} 
        >
              <MenuItem  ><NavLink to={`/profile`} onClick={handleClose} style={{textDecoration:"none",color:"#DEA057"}} >Profile</NavLink ></MenuItem>

              {isAdmin && <MenuItem><NavLink  to={`/admin/dashboard`} onClick={handleClose} style={{textDecoration:"none",color:"#DEA057"}}>Admin Dashboard</NavLink ></MenuItem>}

            
              {isUser && <MenuItem><NavLink to={`/orders`} onClick={handleClose} style={{textDecoration:"none",color:"#DEA057"}}>Orders</NavLink ></MenuItem>}

              {isAdmin && <MenuItem><NavLink to={`/admin/allOrders`} onClick={handleClose} style={{textDecoration:"none",color:"#DEA057"}}>All Orders</NavLink ></MenuItem>}            
              
              <MenuItem><NavLink to={`/`} onClick={logoutUser}  style={{textDecoration:"none",color:"#DEA057"}}>Logout</NavLink ></MenuItem>
        </Menu>    
    </Box>
    </>}
  </Toolbar>
</Container>
</AppBar>
  )
}

export default Navbar 