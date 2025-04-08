import { Link } from "react-router";
import { TopBar } from "../components/TopBar";

export function Landing() {
    return (
        <div>
            <nav className="fixed top-0 left-0 right-0 z-50">
                <div className="shadow-lg h-20 bg-fixed flex justify-center pr-14 bg-green-50">
                    <img className="w-50 h-40 relative -top-10 ml-5" src="https://i.ibb.co/rKz95CCK/payzee-logo-removebg-preview-2.png"></img>
                </div>
            </nav>
            <div className="mt-35">
                <img className="float-right w-202 h-140 mr-10 mt-2" src="https://img.freepik.com/free-vector/people-using-mobile-bank-remittance-money_74855-6617.jpg?t=st=1741779125~exp=1741782725~hmac=e56bcd9da7e2e4a9670c24527395ffcb0085e4cceb131db04ab16e2dcf9e49b6&w=1380"></img>
                <div className="font-semibold ml-5 pt-25">
                    <div className="text-5xl flex">
                        <div>
                            Money Moves Made 
                        </div>
                        <div className="pl-3 text-green-600">
                            Easy
                        </div>
                    </div>
                    <br></br>
                    
                    <div className="text-xl text-green-950 opacity-80">
                        Secure, fast, and hassle-free money transfers anytime, anywhere. Send and recieve funds with ease and confidence on our platform - because your money should move as quickly as you do!
                    </div>
                </div>
                <div className="flex justify-around mt-25">
                    <div>
                        <div className="text-2xl font-medium">
                            New to PayZee?
                        </div>
                        <div className="bg-green-400 py-2 mx-10 text-lg mt-2 text-center rounded-md text-white font-medium shadow-lg cursor-pointer transition delay-70 duration-300 ease-in-out hover:scale-105 hover:bg-green-500">
                            <button className="cursor-pointer focus:outline-none">
                                <Link to={"/signup"}>Sign up</Link>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-medium">
                            Already been here?
                        </div>
                        <div className="bg-green-400 py-2 mx-15 text-lg mt-2 text-center rounded-md text-white font-medium shadow-lg cursor-pointer transition delay-70 duration-300 ease-in-out hover:scale-105 hover:bg-green-500">
                            <button className="cursor-pointer focus:outline-none">
                                <Link to={"/signin"}>Login</Link>
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}