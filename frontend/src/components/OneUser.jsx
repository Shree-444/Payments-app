import { useNavigate } from "react-router"

export function OneUser({user}){
    
    const navigate = useNavigate()
    
    return(
        <div className="flex justify-between mx-90 ml-108 mb-1 pl-[calc(100vw-100%)]">
            <div className=" text-2xl ">
                    {user.firstName} {user.lastName}
            </div>
            <div className="bg-green-400 py-2 mr-19 rounded-md text-white font-medium shadow-lg cursor-pointer hover:bg-green-500">
                <button onClick={()=> {
                    navigate('/transfer?id=' + user._id + '&firstName=' + user.firstName + '&lastName=' + user.lastName)
                }} className="cursor-pointer focus:outline-none px-2 text-sm mx-1">Send Money</button>
            </div>
        </div>
    )
}