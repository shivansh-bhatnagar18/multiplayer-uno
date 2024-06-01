import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';

interface NavbarProps {
    logoSrc?: string;
    bgColorFrom?: string;
    bgColorTo?: string;
    navLinks?: Array<{ title: string; link: string }>;
}

function Navbar(props: NavbarProps) {
    const {
        logoSrc = './assets/uno_csoc.png', // Default logo
        navLinks = [
            { title: 'Home', link: '/' },
            { title: 'Play', link: '/play' },
            { title: 'Game', link: '/game' },
            { title: 'About', link: '/about' },
        ], // Default navigation
        bgColorFrom = '#999999',
        bgColorTo = '#333333',
        // Default background colors
    } = props;

    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('menu-open', open);
    }, [open]);

    const handleMenu = () => {
        setOpen((prev) => !prev);
    };
    const background = `linear-gradient(to right, ${bgColorFrom}, ${bgColorTo})`;

    return (
        <header className="sticky top-0 z-50 flex flex-row">
            <nav
                className="bg-opacity-90 border-gray-200 px-4 lg:px-6 py-2.5 w-full"
                style={{ background }}
            >
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
                    <Link to="/" className="flex items-center">
                        <img src={logoSrc} className="h-12 mr-3" alt="Logo" />
                    </Link>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.link}
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-yellow-400 lg:p-0 ${isActive ? 'text-yellow-400' : 'text-gray-300'}`
                                        }
                                    >
                                        {link.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`flex md:hidden ${styles.menuButton}`}>
                        <button
                            type="button"
                            onClick={handleMenu}
                            className={`inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
                        >
                            <span className="sr-only">Toggle main menu</span>
                            {open ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </nav>
            <div
                id="sidebar"
                className={`${styles.sidebar} ${open ? styles.open : ''}`}
            >
                <ul className={styles.ul}>
                    {navLinks.map((link, index) => (
                        <li key={index} className={styles.li}>
                            <NavLink
                                to={link.link}
                                className={({ isActive }) =>
                                    `${styles.a} ${isActive ? styles.active : ''}`
                                }
                                onClick={() => setOpen(false)}
                            >
                                {link.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}

export default Navbar;
