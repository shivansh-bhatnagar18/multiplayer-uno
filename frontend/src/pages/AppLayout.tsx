import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import uno_csoc from '../assets/uno_csoc.png';

function AppLayout() {
    const logoSrc = uno_csoc; // give path of the logo you want
    const navLinks = [
        { title: 'Home', link: '/' },
        { title: 'Play Options', link: '/play' },
        { title: 'Game', link: '/game' },
        { title: 'About', link: '/about' },
    ];
    const bgColorFrom = '#999999';
    const bgColorTo = '#333333'; // Example background colors

    return (
        <div>
            <Navbar
                logoSrc={logoSrc}
                navLinks={navLinks}
                bgColorFrom={bgColorFrom}
                bgColorTo={bgColorTo}
            />
            <Outlet />
            {/* todo: Add a footer component */}
        </div>
    );
}

export default AppLayout;
