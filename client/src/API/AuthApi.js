import axios from "axios";
import {useState, useEffect} from "react";
import { toast } from "react-toastify";

function useAuth(token){
const [user, setUser] = useState(null)
const [isLogged, setIsLogged] = useState(false)
const [isUser, setIsUser] = useState(false)
const [isAdmin, setIsAdmin] = useState(false)
const [allUsers, setAllUsers] = useState([])

//cart state
const [cart, setCart] = useState([null])
const [order,setOrder] = useState({})
const [finalTotal, setFinalTotal] = useState(0);
const [callback, setCallback] = useState(false);


useEffect(()=>{
    if(token){
        const getData = async ()=>{
            const res = await axios.get(`/api/v1/auth/userinfo`,{
                headers: {Authorization: token}
            });
            setUser(res.data.user)
            // setCart(res.data.user.cart)
            setCart(res.data.user.cart)
            setOrder(res.data.user.orders)
            
            setIsLogged(true)
            if(res.data.user.role==="superadmin"){
                setIsAdmin(true)
                readAllUsers(token)
            } 
            if(res.data.user.role==="user"){
                setIsUser(true)
            }
        }
        getData()
    }
},[token])



const readAllUsers = async(token)=>{
    const userList = await axios.get(`/api/v1/auth/allUsers` ,{
        headers :{
            Authorization: token
        }
    })
    setAllUsers(userList.data.users)
}


const addToCart = async(product) => {   

    if(!isLogged) return toast.warning("Please login to continue buying")
    const check = cart.every(item => {
        return item._id !== product._id;
        });
    if(check) {
        toast.success('Product added to the cart');
        setCart([...cart, {...product, quantity: 1}])

        // store cart info in db
        await axios.patch(`/api/v1/auth/addToCart`, {cart: [ ...cart, {...product, quantity : 1}]},{
            headers: { Authorization: token }
        })
    } else {
        toast.warning("Product is already in cart")
    }
}

const orderUpdate = async (cart,finalTotal) => {
    toast.success('order is ready to check out');
    setOrder({cart: cart, finalTotal: finalTotal})

    // updating the ordres into individual user orders property in mongodb users colleciton
    await axios.patch(`/api/v1/auth/saveOrder`, { orders: {cart,finalTotal } }, {
        headers: { Authorization: token}
    })
}


return {
    userData: [user, setUser],
    isLogged: [isLogged, setIsLogged],
    isUser: [isUser, setIsUser],
    isAdmin: [isAdmin,setIsAdmin],
    cart: [cart, setCart],
    order: [order,setOrder],
    finalTotal: [finalTotal,setFinalTotal],
    addToCart: addToCart,
    orderUpdate: orderUpdate,
    callback: [callback,setCallback],
    allUsers : [allUsers, setAllUsers]
       }
}

export default useAuth