import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

const AppContext=createContext()

const AppContextProvider=({children})=> {
    const api=import.meta.env.VITE_API_URI

    const [doctors,setDoctors]=useState([])
    const [user,setUser]=useState({})


    
    const getDoctors=()=> {
        axios.get(`${api}/doctors/all-doctors`).then(res=>setDoctors(res.data.doctors)).catch(err=>console.log(err))
    }

    const getUser=()=> {
        axios.get(`${api}/user/get-user`,{withCredentials:true}).then(res=>{
            setUser(res.data.user)
        }).catch(err=>setUser({}))
    }

    useEffect(()=>{
        getDoctors()
        getUser()
    },[])

    return (
        <AppContext.Provider value={{doctors,user,setUser,getDoctors}}>
            {children}
        </AppContext.Provider>
    )
}

const useContextData=()=>{
    return useContext(AppContext)
}

export {AppContextProvider,useContextData}
