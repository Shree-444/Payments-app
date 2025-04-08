import { TopBar } from "../components/TopBar";
import { User } from "../components/User";
import {replace, useNavigate} from 'react-router'
import { useContext, useEffect, useState } from "react";


export function Dashboard(){
    
    const navigate = useNavigate()
    
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/', {replace: true})
        }
    },[])

    return(
        <div>
            <TopBar></TopBar>
            <User></User>
        </div>
    )
}
