import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../pages/Footer'

function AppLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default AppLayout;
