import { useContext, useEffect, useState } from "react";
import { OneUser } from "./OneUser";
import axios from "axios";
import { UserContext } from "./context";

export function User(){
    
    const {users, setUsers} = useContext(UserContext)
    const [filter, setFilter] = useState('')
    const [balance, setBalance] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const thisUser = localStorage.getItem('thisUser')
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async(response) => {
                const check = Array.isArray(response.data.user)
                if(check){
                    const finalUsers = response.data.user.filter(item => item.username !== thisUser)
                    setUsers(finalUsers)
                }
                else{
                    setUsers([])
                }
                
            })
    }, [filter])

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(async(res) => {
            setBalance(res.data.balance)
        })
    }, [])

    
    return(
        
            <div>

                <div style={{color: "#0E4A27"}} className="text-2xl px-5 py-7 mt-23 ml-2 font-bold">
                    Your Balance: Rs {balance}
                </div>


                <div style={{color: "#0E4A27"}} className="text-2xl mr-3 pb-2 font-bold flex justify-center">
                    Users
                </div>

                <input placeholder="Search Users" className="ml-108 px-60 p-1.5 border-1 rounded-md border-gray-400 text-center" onChange={(e)=> {
                    setFilter(e.target.value)
                }}></input>

                <div className="mt-7">
                {users.length > 0 ? (
                    <ol>
                    {users.map(user => (
                        <OneUser user={user} />
                    ))}
                    </ol>
                ) : (
                    <p className="ml-110 text-xl font-semibold">No users found</p>
                )}
                </div>
            </div>
    )
}