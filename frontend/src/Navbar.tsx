import React, { useState } from 'react';
import Button from './library/button';
import './index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import RulesModal from './library/rulesModal';
import { useAuth } from './contexts/AuthContext';
import AboutUsModal from './library/aboutUsModal';

const Navbar: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showRulesModal, setShowRulesModal] = useState(false);
    const [showAboutUsModal, setShowAboutUsModal] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const showLoginBtn =
        location.pathname !== '/login' && location.pathname !== '/signup';

    const toggleMenu = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <div className="flex justify-between items-center p-4 ml-4 mt-4 mr-2 relative z-10">
                <div className="space-x-4">
                    <button onClick={toggleMenu}>
                        <img
                            src="/hamburger.png"
                            alt="hamburger menu"
                            className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9"
                        />
                    </button>
                </div>
                {auth.isLoggedIn() ? (
                    <>
                        <div className="text-xl font-bold mt-2">
                            <Button
                                variant="accept"
                                size="medium"
                                buttonSize="w-64 h-11"
                                onClick={goToLogin}
                            >
                                {auth.getUser()!.name}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        {showLoginBtn && (
                            <div className="text-xl font-bold mt-2">
                                <Button
                                    variant="accept"
                                    size="medium"
                                    buttonSize="w-56 h-11"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
            {sidebarOpen && (
                <div className="fixed inset-0 flex z-20">
                    <div className="bg-gray-300 text-black border-gray-600 w-64 p-4 shadow-lg pl-10 rounded-r-lg relative z-30">
                        <button
                            onClick={toggleMenu}
                            className="absolute top-3 right-3"
                        >
                            <img
                                src="/close.png"
                                alt="Close menu"
                                className="w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-10 lg:h-10"
                            />
                        </button>
                        {auth.isLoggedIn() ? (
                            <>
                                <div className="mb-2 mt-20 text-2xl font-kavoon align-center text-stroke-2 text-white font-bold">
                                    {auth.getUser()?.name}
                                </div>
                                <Button
                                    variant="accept"
                                    size="medium"
                                    fontSize="text-2xl"
                                    onClick={auth.logout}
                                    className="mb-2 mt-5"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="accept"
                                    size="medium"
                                    fontSize="text-2xl"
                                    onClick={() => navigate('/login')}
                                    className="mb-2 mt-20"
                                >
                                    Login
                                </Button>
                            </>
                        )}
                        <div className="mt-4">
                            <Button
                                variant="accept"
                                size="medium"
                                fontSize="text-2xl"
                                onClick={() => {
                                    setShowAboutUsModal(true);
                                    setSidebarOpen(false);
                                }}
                                className="mb-2"
                            >
                                About Us
                            </Button>
                        </div>
                        <div className="mt-4">
                            <Button
                                variant="accept"
                                size="medium"
                                fontSize="text-2xl"
                                onClick={() => {
                                    setShowRulesModal(true);
                                    setSidebarOpen(false);
                                }}
                            >
                                Rules
                            </Button>
                        </div>
                    </div>
                    <div
                        className="flex-grow bg-black bg-opacity-50"
                        onClick={toggleMenu}
                    ></div>
                </div>
            )}
            {showRulesModal && (
                <RulesModal onClose={() => setShowRulesModal(false)} />
            )}
            {showAboutUsModal && (
                <AboutUsModal onClose={() => setShowAboutUsModal(false)} />
            )}
        </div>
    );
};

export default Navbar;
