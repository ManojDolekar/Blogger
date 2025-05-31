import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({authentication=true ,children}) {

    const authStatus= useSelector(state=>state.auth.status) // change by me
    const navigate = useNavigate();
    const [loader,setLoader]=useState(true)

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate,loader])

    return loader ? <h1> Loading...</h1> : <>{children}</> 
}

export default AuthLayout