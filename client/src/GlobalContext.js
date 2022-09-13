import React, { createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from './API/AuthApi';
import ProductApi from './API/ProductApi';
import CategoryApi from './API/CategoryApi';

export const GlobalContext = createContext();

function DataProvider(props) {
    const [token, setToken] = useState(false)
    const [loading, setLoading] = useState(true)

    //to read access token after login
    const initToken = useCallback(() => {
    }, [])


    useEffect(() => {
        if (localStorage.getItem('loginToken')) {
            const getToken = async () => {
                axios.get(`/api/v1/auth/refreshToken`)
                    .then(res => {
                        setToken(res.data.accessToken)
                        setLoading(true);
                        // console.log(res)
                    }).catch(err => toast.error(err.response.data.msg))
            }
            getToken()
        }
    }, [token])

    const data = {
        token: [token, setToken],
        authApi: useAuth(token),
        productApi: ProductApi(),
        categoryApi: CategoryApi(token)
    }

    return (
        <>
            {loading ?
                <GlobalContext.Provider value={data}>
                    {props.children}
                </GlobalContext.Provider>
                : <div>Loading</div>}
        </>
    )
}

export default DataProvider