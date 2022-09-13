import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' //imrr

//react toast

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

//components

import AdminDashboard from '../Admin/AdminDashboard'
import About from '../Screens/About'
import Contact from '../Screens/Contact'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import Profile from '../Screens/Profile'
import Home from '../Screens/Home'
import Pnf from '../../util/Pnf'
import Menu1 from '../Screens/Menu1'
import { Switch, ThemeProvider } from '@mui/material';
import theme from '../theme';
import Footer from '../Screens/Footer'
import ProductDetails from '../Product/ProductDetails'
import CreateProduct from '../Admin/CreateProduct'
import Cart from "../Product/Cart"
import { GlobalContext } from '../../GlobalContext'
import ProtectedRoute from '../../middleware/ProtectedRoute'
import Order from '../Screens/Order'
import Checkout from '../Product/Checkout'
import AllUsers from '../Admin/AllUsers'
import OrderList from '../Admin/OrderList'
import UpdateProduct from '../Admin/UpdateProduct'
import ProfileUpdate from '../Screens/ProfileUpdate'


function Main(props) {
  const context = useContext(GlobalContext)

  const [isLogged, setIsLogged] = context.authApi.isLogged;
  const [isAdmin, setIsAdmin] = context.authApi.isAdmin;
  const [isUser, setIsUser ] = context.authApi.isUser

  return (
    <Router>
      {<ThemeProvider theme={theme}>
        <Menu1 color="white" />
      </ThemeProvider>}
      <ToastContainer autoClose={1500} position="top-center" />

      <Routes>
            <Route path={`/`} element={<Home/>} />
            <Route path={`/about`} element={<About/>} />
            <Route path={`/contact`} element={<Contact/>} />
            <Route path={`/login`} element={isLogged ? <Pnf/> : <Login/>} />
            <Route path={`/register`} element={isLogged ? <Pnf/> : <Register/>} />
            <Route path={`/admin/dashboard`} element={
                                        <ProtectedRoute auth={isLogged} >
                                            <AdminDashboard/>
                                        </ProtectedRoute>} />
            <Route path={`/admin/allOrders`} element={
                                        <ProtectedRoute auth={isLogged} >
                                            <OrderList/>
                                        </ProtectedRoute>} />
            <Route path={`/profile`} element={
                                        <ProtectedRoute auth={isLogged} >
                                            <Profile/>
                                        </ProtectedRoute>} />
            <Route path={`/orders`} element={
                                        <ProtectedRoute auth={isLogged} >
                                            <Order/>
                                        </ProtectedRoute>} />                                       
            <Route path={`/product/details/:id`} element={<ProductDetails/>}/>
                                        
            <Route path={`/product/create`} element={
                                       <ProtectedRoute auth={isLogged} >
                                            <CreateProduct/>
                                        </ProtectedRoute>} />
            <Route path={`/product/cart`} element={
                                       <ProtectedRoute auth={isLogged} >
                                            <Cart/>
                                        </ProtectedRoute>} />
            <Route path={`/checkout`} element={
                                       <ProtectedRoute auth={isLogged} >
                                            <Checkout/>
                                        </ProtectedRoute>} />
            <Route path={`/admin/allUsers`} element={
                                       <ProtectedRoute auth={isLogged} >
                                            <AllUsers/>
                                        </ProtectedRoute>} />
            <Route path={`/product/update/:id`} element={
                                       <ProtectedRoute auth={isLogged} >
                                            <UpdateProduct/>
                                        </ProtectedRoute>} />
            <Route path={`/profile/update/:id`} element={
                                       <ProtectedRoute auth={isLogged} >
                                            <ProfileUpdate/>
                                        </ProtectedRoute>} />
            <Route path={`/*`} element={<Pnf/>} />
        </Routes>

      <Footer /> 
    </Router>
  )
}

export default Main