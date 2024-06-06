import { Outlet } from 'react-router-dom';
import Navbar from '../library/Navbar';

export type NavbarLink = {
    path: string;
    label: string;
};

function AppLayout() {
    const links: NavbarLink[] = [
        { path: '/about', label: 'About' },
        { path: '/play', label: 'Play' },
    ];
    return (
        <div>
            <Navbar links={links} />
            <Outlet />
            {/* todo: Add a footer component */}
        </div>
    );
}

export default AppLayout;
