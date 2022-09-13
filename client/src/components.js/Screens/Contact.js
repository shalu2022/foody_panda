import { Typography, Container, Box, Stack } from '@mui/material'

import React from 'react';



function Contact() {

  return (
    <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      bgcolor: "primary.main",
    }}
  >
      <Container sx={{ textAlign:"center", color:"primary.main" ,backgroundColor:"secondary.main", boxShadow: "2px 5px 5px #DEA057" }}>
        <Stack sx={{marginY:{xs: "50px", sm: "100px"}, padding:"20px"}}>
          <Typography variant="h2" mb={3} >Get in touch</Typography>
          <Typography variant="p" fontSize={20} sx={{ fontSize:"22px"}}>Have you got a suggestion or an idea? Or maybe you represent a company and would like to work on a partnership? We would love to hear from you!</Typography>
          <Typography variant="h5"  >foodypanda22@gmail</Typography>
          <Typography variant="p">123-456-7890</Typography>
        </Stack>
      </Container>
    </Box> 
  )
}

export default Contact