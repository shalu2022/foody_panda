import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

function About() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "primary.main",
        color: "white"
      }}
    >
      <Container
      sx={{       
        height: { xs: "230vh", md: "100vh", lg: "150vh" },
      }}>
        <Grid
          container
          sx={{
            my: "100px",
            px: { sm: "30px", lg: "60px", xs: "10px" },
            textAlign: "left",
            backgroundColor: "primary.main",
            color: "secondary.main"
          }}
        >
          <Grid item lg={6} sm={12} xs={12} sx={{ padding: "24px" }}>
            <Typography
              variant="h3"
              sx={{ textAlign: { sm: "center", lg: "start" }}}
             
            >
              Our Mission
            </Typography>
            <Typography sx={{ fontSize: "1.1rem", paddingTop:"20px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              ullamcorper, nunc a aliquam consequat, massa arcu posuere dui, nec
              pretium libero nibh quis elit. Aenean ac lorem lobortis lectus
              volutpat fringilla nec at nunc. Quisque dignissim tellus vitae
              ultrices aliquam. Donec volutpat est non ante mollis congue.
              Vestibulum et gravida leo, in bibendum nibh. Nam imperdiet, lorem
              at gravida imperdiet, elit enim consequat diam, vel pretium eros
              dolor eget sem.
            </Typography>
          </Grid>

          <Grid item lg={6} sm={12} xs={12} sx={{ padding: "24px" }}>
            <img
              style={{ boxShadow: "-5px 10px 10px #DEA057" }}
              src="https://cdn.pixabay.com/photo/2019/03/12/20/27/business-4051773__340.jpg"
              alt="mission"
              width={"100%"}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            marginBottom: "100px",
            px: { sm: "30px", lg: "60px", xs: "10px" },
            color: "secondary.main",
          }}
        >
          <Grid item md={6} lg={6} sm={12} xs={12} sx={{ paddingX: "24px" }}>
            <img
              style={{ boxShadow: "5px 10px 10px #DEA057" }}
              src="https://cdn.pixabay.com/photo/2015/08/11/23/13/employees-885338__340.jpg"
              alt="Team"
              width={"100%"}
            />
          </Grid>
          <Grid
            item
            md={6}
            lg={6}
            sm={12}
            xs={12}
            sx={{ textAlign: { sm: "center", lg: "end" }, paddingX: "24px" }}
          >
            <Typography
              variant="h3"
              sx={{ textAlign: { xs: "center", sm: "center", lg: "end" } }}
              p="20px"
            >
              About Team
            </Typography>
            <Typography
              sx={{
                fontSize: "1.1rem",
                textAlign: { xs: "end", sm: "center", lg: "end" },
                paddingTop:"20px" 
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              ullamcorper, nunc a aliquam consequat, massa arcu posuere dui, nec
              pretium libero nibh quis elit. Aenean ac lorem lobortis lectus
              volutpat fringilla nec at nunc. Quisque dignissim tellus vitae
              ultrices aliquam. Donec volutpat est non ante mollis congue.
              Vestibulum et gravida leo, in bibendum nibh. Nam imperdiet, lorem
              at gravida imperdiet, elit enim consequat diam, vel pretium eros
              dolor eget sem. Donec dolor tellus, aliquet et lacus vel.{" "}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
