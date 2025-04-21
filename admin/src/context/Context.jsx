import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ContextData=createContext()

const ContextProvider=({children})=> {
    const navigate=useNavigate(null)
    const api=import.meta.env.VITE_API_URI

    const [loggedUser,setLoggedUser]=useState({})

    useEffect(()=>{
        axios.get(`${api}/admin/verify-details`,{withCredentials:true}).then(res=>{
            setLoggedUser(res.data.user)
            toast.success(res.data.msg)
            navigate('/dashboard')
        }).catch(err=>toast.warning('Please login'))
    },[])

    return <ContextData.Provider value={{loggedUser,setLoggedUser}}>
        {children}
    </ContextData.Provider>
}

const useContextData=()=>{
    return useContext(ContextData)
}

export {ContextProvider,useContextData}