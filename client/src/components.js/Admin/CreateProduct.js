import React, { useState, useContext } from "react";
import { GlobalContext } from "../../GlobalContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import {
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const noImage =
  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

const LoadingSpinner = () => {
  return (
    <div
      className="spinner-border text-success"
      style={{ width: "3em", height: "3em" }}
      role="status"
    >
      <span className="visually-hidden">Loading....</span>
    </div>
  );
};

export default function CreateProduct() {
  const data = useContext(GlobalContext);
  const [categories] = data.categoryApi.categories;
  const [token] = data.token;

  //ref for navingation
  const navigate = useNavigate();
  
  //state
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: 0,
    qnty: "",
    desc: "",
    stock: 0,
  });

  //image upload handler
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      //to read file content from input
      const file = e.target.files[0];
      if (!file) return toast.error("file not exists..");
      //file size
      if (file.size > 1 * 1024 * 1024)
        return toast.error("file size is too large");
      //ref formData
      let formData = new FormData();
      formData.append("productImg", file);

      setLoading(true);
      const res = await axios.post(`/api/v1/image/product/upload`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      //after upload
      setLoading(false);
      setImage(res.data);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //image delete handler
  const handleDestroy = async (e) => {
    try {
      if (window.confirm("are you sure to delete image?")) {
        setLoading(true);
        await axios.post(
          `/api/v1/image/product/destroy`,
          { public_id: image.public_id },
          {
            headers: { Authorization: token },
          }
        );
        setImage(false);
        setLoading(false);
      } else {
        toast.warning("delete terminated");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const readValue = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Image doesn't exists");

    const res = await axios.post(
      `/api/v1/product/create`,
      { ...product, image },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setImage(false);
    toast.success("Product created successfully");
    navigate(`/`);
  };

  return (
    <Box
      
      sx={{
        backgroundColor:"primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%",
      }}
    >
      <Box m={15}>
        <Typography variant="h3" align="center" color="secondary.main">
          Add New Product
        </Typography>
        <Grid container bgColor="primary.main" gap={2}>
          <Grid item lg={5} sm={12} md={12} xs={12} mt={2} m={1}>
            <Card sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
              <CardContent>
                <input
                  lg={5}
                  sm={12}
                  md={6}
                  variant="filled"
                  type="file"
                  name="productImg"
                  onChange={handleUpload}
                  required
                  style={{
                    border: "2px solid #726f6f",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                />
              </CardContent>
              <CardActions>
                {loading ? (
                  <Box>
                    <LoadingSpinner />
                  </Box>
                ) : (
                  <Box  sx={{alignItems:"center", display:"flex", flexDirection:"column"}}>
                    <img width={"340px"} height={"342px"} src={image ? image.url : noImage } alt="" />
                    <Box onClick={handleDestroy}>
                      <Button
                        variant="contained"
                        sx={{
                          marginTop:"20px",
                          backgroundColor: "#f4474a",
                          ":hover": { backgroundColor: "#f4474a" },
                        }}
                        endIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                )}
              </CardActions>
            </Card>
          </Grid>

          <Grid item ml={1} lg={6} sm={12} md={12} mt={2} m={1}>
            <Card sx={{ margin: "0px", padding: "20px" }}>
              <Box variant="form">
                <TextField
                  style={{ marginTop: "10px" }}
                  type="text"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={product.title}
                  onChange={readValue}
                  name="title"
                  required
                />
                <FormControl fullWidth>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    style={{ marginTop: "10px" }}
                    labelId="category"
                    id="demo-simple-select"
                    name="category"
                    value={product.category}
                    label="Age"
                    onChange={readValue}
                  >
                    {categories &&
                      categories.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.title}>
                            {item.title}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>

                <TextField
                  style={{ marginTop: "10px" }}
                  type="text"
                  label="Price"
                  variant="outlined"
                  onChange={readValue}
                  fullWidth
                  name="price"
                  value={product.price}
                  required
                />

                <TextField
                  style={{ marginTop: "10px" }}
                  type="text"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  onChange={readValue}
                  name="desc"
                  value={product.desc}
                  required
                />

                <TextField
                  style={{ marginTop: "10px" }}
                  type="text"
                  label="Quantity"
                  variant="outlined"
                  onChange={readValue}
                  fullWidth
                  name="qnty"
                  value={product.qnty}
                  required
                />

                <TextField
                  sx={{ marginTop: "10px" }}
                  type="number"
                  label="Stock"
                  variant="outlined"
                  onChange={readValue}
                  fullWidth
                  name="stock"
                  value={product.stock}
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "20px", padding: "10px" }}
                  fullWidth
                  onClick={(event) => submitHandler(event)}
                >
                  Submit
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
