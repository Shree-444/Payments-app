import {Link} from "react-router"

export function Warning({ text, buttonText, linkTo }) {
    return(
    <div>
        <div className="text-md text-gray-500 pt-5">
            {text }
            <Link className="cursor-pointer pointer underline text-blue-500" to={linkTo}>{buttonText}</Link>
        </div>
    </div>
)} 