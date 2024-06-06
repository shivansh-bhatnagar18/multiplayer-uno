import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { NavbarLink } from '../pages/AppLayout';

function NavbarItem({ link }: { link: NavbarLink }) {
    return (
        <Link
            to={link.path}
            className="text-[#ECD407] font-bold text-xl hover:underline"
        >
            {link.label}
        </Link>
    );
}

function Navbar({ links }: { links: NavbarLink[] }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex flex-row sticky top-0 bg-[#D72600] p-3 shadow-md justify-between items-center">
            <div className="text-[#ECD407] tracking-tight font-black text-4xl drop-shadow-[-7px_0px_0px_rgba(0,0,0,1)]">
                <Link to="/">UNO</Link>
            </div>
            <div className="hidden md:flex space-x-4">
                {links.map((link, index) => (
                    <NavbarItem key={index} link={link} />
                ))}
            </div>
            <div className="md:hidden flex items-center">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? (
                        <XMarkIcon className="w-5 h-5 text-[#ECD407]" />
                    ) : (
                        <Bars3Icon className="w-6 h-6 text-[#ECD407]" />
                    )}
                </button>
            </div>
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#D72600] p-3 flex flex-col space-y-4 md:hidden">
                    {links.map((link, index) => (
                        <NavbarItem key={index} link={link} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Navbar;
