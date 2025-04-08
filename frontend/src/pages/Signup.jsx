import { useState } from "react";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { SignHeading } from "../components/signheading";
import { Warning } from "../components/Warning";
import axios from 'axios'
import { useNavigate } from "react-router";

export function Signup(){
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    return(
        <div className="bg-[url(https://i.ibb.co/z94g9Kx/login-background-1-1.png)] h-screen bg-center bg-cover overflow-hidden">
            <div className="bg-white shadow-[0_5px_15px_rgba(0,0,0,0.25)] w-95 h-145 text-center mx-143 mt-25 rounded-lg pt-10 justify-center">
                    <div><SignHeading label={"Get Started!"}></SignHeading></div>
                    <div className="text-md text-gray-500 pb-4">
                        Enter your information to create an account on PayZee
                    </div>
                    <div>
                        <hr className="w-70 text-blue-500 ml-12 pt-4"></hr>
                    </div>
                    <InputField field={"Pick a username"}  text={"Username"} onChange={(e => {
                        setUsername(e.target.value)
                    })}></InputField>
                    <InputField field={"Enter your first name"}  text={"First name"} onChange={(e => {
                        setFirstName(e.target.value)
                    })} ></InputField>
                    <InputField field={"Enter your last name"}  text={"Last name"} onChange={(e => {
                        setLastName(e.target.value)
                    })} ></InputField>
                    <InputField field={"Create a password"}  text={"Password"} onChange={(e => {
                        setPassword(e.target.value)
                    })}></InputField>
                    <Button onClick={async() => {
                        try{    
                            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                                username,
                                firstName,
                                lastName,
                                password
                            })
                            
                            localStorage.setItem('token', response.data.token)
                            localStorage.setItem('thisUser', username)
                            alert(response.data.msg)
                            navigate('/dashboard')
                        }
                        catch(error){
                            if(error.response){
                                console.error(error.response.data)
                                alert(error.response.data.error)
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
                    }} label={"Submit"}></Button>
                    <Warning text={"Already have an account?"} buttonText={" Log in"} linkTo={"/signin"}></Warning>
            </div>
        </div>
    )
}