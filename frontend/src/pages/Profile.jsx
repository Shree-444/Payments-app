import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export function Profile() {

    const navigate = useNavigate()
    const [editMode, setEditMode] = useState(false)
    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastName: ''
    })

    useEffect(()=>{
        
        const token = localStorage.getItem('token')
        const thisUser = localStorage.getItem('thisUser')

        axios.get('http://localhost:3000/api/v1/user/bulk',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async(res)=>{
            const value = res.data.user
            setUser(value.find(item => item.username==thisUser))
            
        })

    },[])

    function editButtonHandler(){
        setEditMode(true)
    }

    function goBackHandler(){
        navigate('/Dashboard')
    }

    async function submitHandler(){
        
        const token = localStorage.getItem('token')
        console.log(user)

        try{
            const response = await axios.put('http://localhost:3000/api/v1/user/update', 
                user, 
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status >= 200 && response.status < 300) {
                alert("Profile updated successfully!");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update profile.");
          }
        setEditMode(false)
    }

    return (
        <div>
            <nav className="fixed top-0 left-0 right-0 z-50">
                <div className="shadow-lg h-20 bg-fixed flex justify-between bg-green-50">
                    <img className="w-50 h-40 relative -top-10 ml-5" src="https://i.ibb.co/rKz95CCK/payzee-logo-removebg-preview-2.png"></img>
                </div>
            </nav>
            <div className="bg-green-50 shadow-[0_5px_15px_rgba(0,0,0,0.25)] rounded-md w-110 h-75 ml-133 mt-60">
                <h1 className="text-center font-semibold pt-4 text-3xl font-sans">User Details</h1>
                <hr className="w-59 text-green-500 ml-25 pt-2 mt-4"></hr>
                <div>
                    {editMode ? (
                        <div className="text-lg mt-5 ml-5">
                            <div className="flex justify-left p-1">
                                <div className="mr-10 font-semibold">
                                    Username:
                                </div>
                                <div className="mr-10">
                                    <input className="outline-1 outline-emerald-400 rounded-sm focus:outline-2 focus:outline-emerald-600 focus:border-0 focus:outline-offset-2" 
                                    placeholder={user.username}
                                    name="username"
                                    value={user.username}
                                    onChange={(e)=>{
                                        setUser({...user, [e.target.name]: e.target.value})
                                    }}></input>
                                </div>
                            </div>
                            <div className="flex justify-left p-1">
                                <div className="mr-10 font-semibold">
                                    First Name:
                                </div>
                                <div className="mr-10">
                                <input className="outline-1 outline-emerald-400 rounded-sm focus:outline-2 focus:outline-emerald-600 focus:border-0 focus:outline-offset-2" 
                                placeholder={user.firstName}
                                name="firstName"
                                value={user.firstName}
                                onChange={(e)=>{
                                    setUser({...user, [e.target.name]: e.target.value})
                                }}></input>
                                </div>
                            </div>
                            <div className="flex justify-left p-1"    >
                                <div className="mr-10 font-semibold">
                                    Last Name:
                                </div>
                                <div className="mr-10">
                                <input className="outline-1 outline-emerald-400 rounded-sm focus:outline-2 focus:outline-emerald-600 focus:border-0 focus:outline-offset-2" 
                                placeholder={user.lastName}
                                name="lastName"
                                value={user.lastName}
                                onChange={(e)=>{
                                    setUser({...user, [e.target.name]: e.target.value})
                                }}></input>
                                </div>
                            </div>
                            <div className=" bg-green-500 py-1 mt-5 px-3 mx-45 text-md rounded-md text-white font-medium text-center shadow-lg cursor-pointer transition delay-70 duration-300 ease-in-out hover:scale-103 hover:bg-green-600">
                                <button className="cursor-pointer" onClick={submitHandler}>
                                    Save
                                </button>
                            </div>
                        </div>

                    ) : (
                        <div className="text-lg mt-5 ml-5">
                            <div className="flex justify-left p-1">
                                <div className="mr-10 font-semibold">
                                    Username:
                                </div>
                                <div className="mr-10">
                                    {user.username}
                                </div>
                            </div>
                            <div className="flex justify-left p-1">
                                <div className="mr-10 font-semibold">
                                    First Name:
                                </div>
                                <div className="mr-10">
                                    {user.firstName}
                                </div>
                            </div>
                            <div className="flex justify-left p-1"    >
                                <div className="mr-10 font-semibold">
                                    Last Name:
                                </div>
                                <div className="mr-10">
                                    {user.lastName}
                                </div>
                            </div>
                            <div className="flex justify-around mr-7 mt-6">
                                <div className=" bg-green-500 py-1 px-2 text-md rounded-md text-white font-medium text-center shadow-lg cursor-pointer transition delay-70 duration-300 ease-in-out hover:scale-103 hover:bg-green-600">
                                    <button className="cursor-pointer focus:outline-emerald-600 focus:outline-none" onClick={goBackHandler}>
                                        Go Back
                                    </button>
                                </div>
                                <div className=" bg-green-500 py-1 px-3 text-md rounded-md text-white font-medium text-center shadow-lg cursor-pointer transition delay-70 duration-300 ease-in-out hover:scale-103 hover:bg-green-600">
                                    <button className="cursor-pointer focus:outline-emerald-600 focus:outline-none" onClick={editButtonHandler}>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
