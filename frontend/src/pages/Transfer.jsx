import axios from "axios";
import { SignHeading } from "../components/signheading";
import { useState } from "react";
import { useNavigate, useSearchParams } from 'react-router'

export function Transfer(){
    
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    const firstName = searchParams.get('firstName')
    const lastName = searchParams.get('lastName')
    const [amount, setAmount] = useState('')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    
    return(
        <div>
        <nav className="fixed top-0 left-0 right-0 z-50">
                <div className="shadow-lg h-20 bg-fixed flex justify-between bg-green-50">
                    <img className="w-50 h-40 relative -top-10 ml-5" src="https://i.ibb.co/rKz95CCK/payzee-logo-removebg-preview-2.png"></img>
                </div>
        </nav>
        <div className="shadow-[0_5px_15px_rgba(0,0,0,0.25)] rounded-md w-100 h-84 mx-140 my-50 bg-green-50">
            <div className="flex justify-center text-black pt-5">
                <SignHeading label={"Send Money"}></SignHeading>
            </div>
            <hr className="w-71 text-green-500 ml-14 pt-4"></hr>
            <div className="flex p-5">
                <svg width="12%" height="12%" viewBox="0 0 24 24" fill="none"   xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="darkgreen" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div className="font-medium text-2xl pl-2 pt-1">
                    {firstName} {lastName}
                </div>
            </div>
            <div className="ml-7 text-lg font-semibold">
                Amount
            </div>
            <input onChange={(e)=> {
                setAmount(e.target.value)
            }} type="number" placeholder='Enter amount in Rs' className="border-1 rounded-sm border-gray-300 px-3 mt-1 ml-6.5 p-1"></input>
            <div className="flex justify-evenly mt-7">
                <div className=" bg-green-500 py-2 px-3 text-md rounded-md text-white font-medium shadow-lg cursor-pointer transition delay-70 duration-300 ease-in-out hover:scale-103 hover:bg-green-600">
                    <button onClick={()=>{
                        navigate('/dashboard')
                    }} className="cursor-pointer focus:outline-none">Go Back</button>
                </div>
                <div className=" bg-green-500 py-2 px-3 text-md rounded-md text-white font-medium text-center shadow-lg cursor-pointer transition delay-70 duration-300 ease-in-out hover:scale-103 hover:bg-green-600">
                    <button onClick={async()=>{
                        try{    
                            const response = await axios.post('http://localhost:3000/api/v1/account/transfer', {
                                to: id,
                                amount: amount
                            }, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                            alert(response.data.msg)
                            navigate('/dashboard')
                        }
                        catch(error){
                            if(error.response){
                                console.error(error.response.data)
                                alert(error.response.data.msg)
                            }
                            else if(error.request){
                                console.error("No response:", error.request);
                                alert("No response from server");
                            }
                            else{
                                console.error("Error:", error.message);
                                alert("Something went wrong");
                            }
                        }
                    }} className="cursor-pointer focus:outline-none">Initiate Transfer</button>
                </div>
            </div>
        </div>
        </div>
    )
}