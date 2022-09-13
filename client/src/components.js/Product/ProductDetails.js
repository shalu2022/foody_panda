import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Button, Chip, CssBaseline, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";

export default function ProductDetails() {
  const data = useContext(GlobalContext);
  const [isAdmin] = data.authApi.isAdmin;

  const params = useParams();

  const [product, setProduct] = useState("");
  const addToCart = data.authApi.addToCart;

  const getSingle = async (id) => {
    let res = await axios.get(`/api/v1/product/get/${id}`);
    setProduct(res.data.product);
    console.log(product);
  };

  useEffect(() => {
    getSingle(params.id);
  }, []);

  return (
    <Box sx={{ backgroundColor: "primary.main", pt: "50px" }}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: { xs: "110vh", md: "100vh", lg: "100vh" },
        }}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={12} textAlign="center">
            <Typography
              sx={{
                py: 2,
                color: "primary.main",
                backgroundColor: "secondary.main",
                fontWeight: "bold",
              }}
              variant="h4"
            >
              {product.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ height: "100%" }}>
              {product ? (
                <CardMedia
                  height="100%"
                  component="img"
                  image={product.image.url}
                  alt={product.title}
                />
              ) : (
                <CardContent>
                  <Typography variant="h5"> No image found </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ height: "350px", color: "primary.main" }}>  
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "10px",
                    }}
                  >
                    <CardContent >                    
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Typography
                          variant="h4"
                          color="secondary.main"
                          component="div"
                        >
                          &#8377; {product.price}
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            component="del"
                            ml={2}
                          >
                            {" "}
                            &#8377; {product.price +
                              product.price * (10 / 100)}{" "}
                          </Typography>
                        </Typography>

                        <Chip
                          variant="outlined"
                          label="5 Rating"
                          color="error"
                          icon={<StarIcon style={{ color: "#ffd965" }} />}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Box>
                          <Typography component="div" variant="h5" mt={1}>
                            {product.quantity}
                          </Typography>

                          <Button variant="outlined" sx={{ marginTop: "10px" }}>
                            {product.qnty}
                          </Button>
                        </Box>
                        <Box
                          sx={{
                            mt: 1,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                    
                        </Box>
                      </Box>

                      <Typography component="div" variant="h5" mt={2}>
                        {product.desc}
                      </Typography>
                      {isAdmin ? null : (
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          sx={{ marginTop: 3 }}
                          onClick={() => addToCart(product)}
                        >
                          Buy Now
                        </Button>
                      )}
                    </CardContent>
                  </Box>
                </Box>
              </Typography>
            </CardContent>
          </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
