import React from "react";
import { NavLink } from "react-router-dom";
import './product.css'

import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Box,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StarIcon from "@mui/icons-material/Star";
import { Container } from "@mui/material";

const noImage =
  "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png";

function product(props) {
  const { _id, title, price, image, desc, stock, qnty, rating, isAdmin, del } =
    props;

  return (
    <React.Fragment>
      {stock === 0 ? null : (
        <Grid item lg={3} xs={12} sm={4}>
          <Card
            className="menuCard"
            sx={{ position: "relative", width: "100%" }}
          >
            <Chip
              sx={{
                fontSize: "1.3rem",
                position: "absolute",
                border: "none",
                zIndex: "100",
                color: "white",
              }}
              label="5"
              variant="outlined"
              icon={<StarIcon style={{ color: "#ffcf3f" }} />}
            />
            <Typography
              className="sale"
              variant="h6"
              sx={{ position: "absolute", right: "2%", fontWeight: 600 }}
            >
              Order Now!
            </Typography>

            {image.url ? (
              <Box
                className="menu_Card_Media"
                sx={{ overflow: "hidden", height: 230 }}
              >
                <CardMedia
                  className="menu_CardMedia_img"
                  component="img"
                  height={"100%"}
                  image={image.url}
                  alt={title}
                  sx={{ transition: "0.7s" }}
                />
              </Box>
            ) : (
              <Box
                className="menu_Card_Media"
                sx={{ overflow: "hidden", height: 230 }}
              >
                <CardMedia
                  className="menu_CardMedia_img"
                  component="img"
                  image={noImage}
                  height={"100%"}
                  alt={"No Image Found"}
                  sx={{ transition: "0.7s" }}
                />
              </Box>
            )}
            <CardContent style={{ backgroundColor: "#f5f6fb" }}>
              <Typography align="center" variant="h6" fontWeight={600}>
                {title}
              </Typography>
              <Typography align="center" color={"secondary.main"} fontWeight={600} variant="h4">
                &#8377; {price}
              </Typography>
            </CardContent>
            <Box
              className="action"
     
            >
              <NavLink
                to={`/product/details/${_id}`}
                style={{ textDecoration: "none" }}
              >              
                <Button variant="contained" color="primary" fullWidth>
                  See Details
                </Button>
              </NavLink>
            </Box>
            {isAdmin ? (
              <CardActions
                style={{ backgroundColor: "#f5f6fb" }}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <NavLink
                  to={`/product/update/${_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" endIcon={<EditIcon />}>
                    Edit
                  </Button>
                </NavLink>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => del(_id)}
                  endIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </CardActions>
            ) : null}
          </Card>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default product;
