import { useState } from "react";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { SignHeading } from "../components/signheading";
import { Warning } from "../components/Warning";
import { useNavigate } from "react-router";
import axios from "axios";

export function Signin(){
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    return(
        <div className="bg-[url(https://i.ibb.co/z94g9Kx/login-background-1-1.png)] h-screen bg-center bg-cover overflow-hidden">
            <div className="bg-white shadow-[0_5px_15px_rgba(0,0,0,0.25)] w-95 h-100 text-center mx-143 mt-40 rounded-lg pt-10 justify-center">
                    <div><SignHeading label={"Welcome Back!"}></SignHeading></div>
                    <div className="text-md text-gray-500 pb-4">
                        Enter your information to log into your account
                    </div>
                    <div>
                        <hr className="w-70 text-blue-500 ml-12 pt-4"></hr>
                    </div>
                    <InputField onChange={(e => {
                        setUsername(e.target.value)
                    })} text={"Username"} field={"Enter your username"}></InputField>
                    <InputField onChange={(e => {
                        setPassword(e.target.value)
                    })} text={"Password"} field={"Enter your password"} ></InputField>
                    <Button onClick={async() => {
                        
                        try {
                            const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                                username,
                                password
                            })
                            alert(response.data.msg)
                            localStorage.setItem('token', response.data.token)
                            localStorage.setItem('thisUser', username)
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

                    }} label={"Submit"}></Button>
                    <Warning text={"New to PayZee?"} buttonText={" Create an account"} linkTo={"/signup"}></Warning>
            </div>
        </div>
    )
}