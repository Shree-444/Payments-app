export function Button({label, onClick}){
    return(
        <div className="bg-blue-400 py-2 mx-34 rounded-md text-white font-medium shadow-lg cursor-pointer transition delay-70 duration-300 ease-in-out hover:scale-110 hover:bg-indigo-500">
            <button onClick={onClick} className="cursor-pointer focus:outline-none">{label}</button>
        </div>
    )
}