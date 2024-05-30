import { Outlet } from "react-router-dom"
import Navbar from "../Navbar"


function AppLayout() {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            {/* todo: Add a footer component */}
        </div>
    )
}

export default AppLayout
