import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Menu } from "@mui/material"
import AccountMenu from "./Menu"

export function TopBar(){
    
    const [thisUser, setThisUser] = useState({})
    const [initial, setInitial] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('thisUser')

        axios.get('http://localhost:3000/api/v1/user/bulk', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            const THISUSER = res.data.user.find((item) => item.username === username)
            setThisUser(THISUSER)
            setInitial(thisUser.firstName[0])
        })
    },[])

    return(  
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="shadow-lg h-20 bg-fixed flex justify-between bg-green-50">
                <img className="w-50 h-40 relative -top-10 ml-5"  src="https://i.ibb.co/rKz95CCK/payzee-logo-removebg-preview-2.png"></img>
                <div className="flex">
                    <div className=" mt-5.5 text-2xl font-medium">
                        Hi there, {thisUser.firstName} 
                    </div>
                    <div className="mt-3.5 mr-4">                        
                        <AccountMenu initial={initial}></AccountMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}
