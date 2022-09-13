import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalContext";

import axios from "axios";
import { toast } from "react-toastify";
import Product from "./product";

import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/system";

const ProductList = () => {
  const data = useContext(GlobalContext);
  const [products, setProducts] = data.productApi.products;
  const [isUser] = data.authApi.isUser;
  const [isAdmin] = data.authApi.isAdmin;

  const [token] = data.token;

  const navigate = useNavigate();


  const delHandler = async (id) => {
    if (window.confirm(`Are you sure to delete product?`)) {
      try {
        let product = await axios.get(`/api/v1/product/get/${id}`);
        if (!product) {
          toast.error("no product found");
        } else {
          // delete image
          axios.post(
            `/api/v1/image/product/destroy`,
            { public_id: product.public_id },
            {
              headers: { Authorization: token },
            }
          );
          await axios
            .delete(`/api/v1/product/delete/${id}`, {
              headers: { Authorization: token },
            })
            .then((res) => {
              toast.success("Product deleted succssfully");
              // navigate("/products")
              window.location.reload();
            })
            .catch((err) => toast.error(err.message));
        }
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.warning("delete terminated");
    }
  };

  return (
    <>
      <Box sx={{ backgroundColor: "secondary.main", padding: "20px" }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", color: "primary.main", fontWeight: 900 }}
        >
          Menu
        </Typography>
        <Grid container spacing={3} sx={{ padding: "20px 0 40px 0 " }}>
          {products &&
            products.map((item, index) => {
              return (
                <Product
                  key={index}
                  {...item}
                  isUser={isUser}
                  isAdmin={isAdmin}
                  del={delHandler}
                />
              );
            })}
        </Grid>
      </Box>
    </>
  );
};

export default ProductList;
