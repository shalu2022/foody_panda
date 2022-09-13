import React from 'react'
import "./Home.css"

import { styled } from '@mui/material'
import { Box, Typography } from '@mui/material'
import ProductList from '../Product/productList';

function Home() {
  const CustomBox = styled("div")(({ theme }) => ({
    textAlign: "center"   
  }))

  const Banner = styled(Box)(() => ({
    background: `linear-gradient(rgb(0,0,0,0.9), rgb(43, 72, 38, 0.6)),url("https://res.cloudinary.com/shalu/image/upload/v1662707689/foody%20panda/banner1_vlyz9b.jpg ")`,
    maxWidth: "100vw",
    height: "100vh",
    display: "flex",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignItems: "center",
    justifyContent:"center"
  }));

  return (
    <div>
      <Banner sx={{ height: { sm: "100vh" } }}>
        <CustomBox className='heading' >
          <Typography variant="h1" color="secondary" fontWeight="900">FOODI PANDA</Typography>
        </CustomBox>
      </Banner>
      <ProductList />
    </div>
  )
}

export default Home