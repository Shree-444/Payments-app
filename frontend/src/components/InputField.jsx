export function InputField({text, field, onChange}){
    return(
        <div className="pb-5">
            <div className="pb-1 font-medium">
                {text}
            </div>
            <input type="text" placeholder={field} onChange={onChange} required className="border-1 rounded-sm border-gray-300 text-center px-3"></input>
        </div>
    )
}

