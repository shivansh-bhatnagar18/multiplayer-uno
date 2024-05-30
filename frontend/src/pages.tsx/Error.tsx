import { Link } from "react-router-dom"


function Error() {
    return (
        <div>
            This page does not exist!
            <Link to="home">Go back to homepage</Link>
        </div>
    )
}

export default Error
