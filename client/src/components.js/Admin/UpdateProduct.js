import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../GlobalContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import MenuItem from "@mui/material/MenuItem";
import { Button, TextField, Typography, Box, Grid, Card, CardActions, CardContent, Select, FormControl, InputLabel,  } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const LoadingSpinner = () => {
    return (
      <div className="spinner-border text-success" style={{ width: '3em', height: '3em' }} role="status">
        <span className='visually-hidden'>Loading....</span>
      </div>
    )
  }


export default function UpdateProduct() {

  const data = useContext(GlobalContext)
  const [categories] = data.categoryApi.categories;
  const [token] = data.token
  const [products] = data.productApi.products;
 
  //ref for navigation
  const navigate = useNavigate()
  const params = useParams()

  //state
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(false)
  const [product, setProduct] = useState({
    title: '',
    category: '',
    price: 0,
    qnty: '',
    desc: '',
    stock: 0
  })
   
  useEffect(()=>{
    let single = products.find(item => item._id === params.id)
    setProduct(single)
    setImage(single.image)
},[])

 
  //image upload handler
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      //to read file content from input
      const file = e.target.files[0];
      if (!file)
        return toast.error("file not exists..")
      //file size
      if (file.size > 1 * 1024 * 1024)
        return toast.error("file size is too large");
      //ref formData
      let formData = new FormData()
      formData.append('productImg', file)

      setLoading(true)
      const res = await axios.post(`/api/v1/image/product/upload`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token
        }
      })
      //after upload
      setLoading(false);
      setImage(res.data)
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }

  //image delete handler
  const handleDestroy = async (e) => {
    try {
      if (window.confirm("are you sure to delete image?")) {
        setLoading(true)
        await axios.post(`/api/v1/image/product/destroy`, { public_id: image.public_id }, {
          headers: { Authorization: token }
        })
        setImage(false)
        setLoading(false)
      } else {
        toast.warning('delete terminated')
      }
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }
  const readValue = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!image)
      return toast.error("Image doesn't exists")

    const res = await axios.put(`/api/v1/product/update/${params.id}`, { ...product, image }, {
      headers: {
        Authorization: token
      }
    })
    setImage(false)
    toast.success("Product Updated successfully")
    navigate(`/`)
  }

  return (
    <Box bgcolor="primary.main" sx={{display: 'flex', alignItems: 'center', justifyContent:"space-around", height:"100%"}}>

    <Box  m={15}>
      <Typography variant="h3" align="center" color="secondary.main" >Update Product</Typography>
      <Grid container>
      <Grid item lg={5} sm={12} md={12} xs={12} mt={2} ml={1} >
          <Card >
            <CardContent >
              <input
                lg={5} sm={12} md={6}
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
                <Box>
                  <img width={'95%'} src={image ? image.url : ""} alt="" />
                  <Box onClick={handleDestroy}>
                    <Button
                      variant="contained"
                      sx={{
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

        <Grid item  ml={1} lg={6} sm={12} md={12} mt={2}>
          <Card sx={{ margin: "0px", padding: "20px" }}>
            <Box variant="form" >
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
                   {
                    categories && categories.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.title}>{item.title}</MenuItem>
                    )
                }) 
                }
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
              <Button variant="contained" color="primary" sx={{ marginTop: "20px", padding: "10px" }} type="submit" fullWidth onClick={(event) => submitHandler(event)}>
                Submit
              </Button>
            </Box >
          </Card>
        </Grid>
      </Grid>
    </Box>
  </Box>
  );
}
