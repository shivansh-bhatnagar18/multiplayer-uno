import React, { useState } from 'react';
import Button from './library/button';
import './index.css';

type NavbarProps = {
    isLoggedIn?: boolean;
    username?: string;
    onLogin?: () => void;
    onLogout?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
    isLoggedIn,
    username = 'unknown',
    onLogin,
    onLogout,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="flex justify-between items-center p-4 ml-4 mt-4 mr-2 relative z-10">
                <div className="space-x-4">
                    <button onClick={toggleMenu}>
                        <img
                            src="src/assets/hamburger.png"
                            alt="hamburger menu"
                            className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9"
                        />
                    </button>
                </div>
                <div className="text-xl font-bold mt-2">
                    <Button
                        text="Sign In /Login"
                        buttonSize="w-56 h-11"
                        className="border-4"
                        rounded="rounded-2xl"
                    />
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex z-20">
                    <div className="bg-gray-300 text-black border-gray-600 w-64 p-4 shadow-lg pl-10 rounded-r-lg relative z-30">
                        <button
                            onClick={toggleMenu}
                            className="absolute top-3 right-3"
                        >
                            <img
                                src="src/assets/close.png"
                                alt="Close menu"
                                className="w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-10 lg:h-10"
                            />
                        </button>
                        {isLoggedIn ? (
                            <>
                                <div className="mb-2 mt-20 text-2xl font-kavoon align-center text-stroke-2 text-white font-bold">
                                    {username}
                                </div>
                                <Button
                                    text="Logout"
                                    onClick={onLogout}
                                    className="border-4 mb-2 mt-5"
                                    fontSize="text-2xl"
                                    buttonSize="w-[170px] h-12"
                                    px="px-0"
                                />
                            </>
                        ) : (
                            <>
                                <Button
                                    text="Login"
                                    onClick={onLogin}
                                    className="border-4 mb-2 mt-20"
                                    fontSize="text-2xl"
                                    buttonSize="w-[170px] h-12"
                                    px="px-0"
                                />
                            </>
                        )}
                        <div className="mt-4">
                            <Button
                                text="About Us"
                                className="border-4 mb-2"
                                fontSize="text-2xl"
                                buttonSize="w-[170px] h-12"
                                px="px-0"
                            />
                        </div>
                        <div className="mt-4">
                            <Button
                                text="Rules"
                                className="border-4"
                                fontSize="text-2xl"
                                buttonSize="w-[170px] h-12"
                                px="px-0"
                            />
                        </div>
                    </div>
                    <div
                        className="flex-grow bg-black bg-opacity-50"
                        onClick={toggleMenu}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
