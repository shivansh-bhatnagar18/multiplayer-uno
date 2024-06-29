import React, { useState } from 'react';
import Button from './library/button';
import './index.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useModal } from './library/modal/ModalContext';

const aboutUs = (
    <>
        <div className="relative flex flex-col h-full overflow-y-auto">
            <h1 className="font-normal font-[Kavoon] text-[30px] leading-[30px] text-black text-center">
                About Us
            </h1>
            <div className="text-left font-[Kavoon] px-4">
                <br />
                Welcome to our Multiplayer UNO Game website where our aim is to
                bring the joy of UNO to the digital realm, allowing friends and
                families to connect and play this beloved card game from
                anywhere in the world. It is a passion project developed under
                the CSOC’24 (COPS Summer of Code) initiative by COPS. <br />
                CSOC is one of our flagship programs, designed to provide
                students with hands-on coding experience during the summer
                break. Participants engage in a variety of projects, ranging
                from web development to machine learning, all while being
                mentored by experienced members of the COPS community. This
                Multiplayer UNO Game is one of the exciting outcomes of CSOC,
                showcasing the talent and dedication of our participants. COPS
                is an enthusiastic community of developers and programmers
                dedicated to fostering a culture of coding and innovation. It
                provides a collaborative environment where students can enhance
                their programming skills, work on real-world projects, and
                contribute to open-source initiatives. <br /> We invite you to
                join us in this exciting journey. Whether you are here to play
                UNO, provide feedback, or become a part of our vibrant
                community, we welcome you with open arms. Let's connect, code,
                and create together! For more information about COPS and our
                initiatives, visit our{' '}
                <Link
                    className=" text-blue-700"
                    to="https://www.copsiitbhu.co.in/"
                >
                    {' '}
                    official website &nbsp;
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </Link>
                . Thank you for visiting, and we hope you enjoy your time
                playing UNO!
            </div>
        </div>
    </>
);
const rules = (
    <>
        <div className="relative flex flex-col h-full overflow-y-auto">
            <h1 className="font-normal font-[Kavoon] text-[30px] leading-[30px] text-black text-center">
                Rules
            </h1>
            <div className="text-left font-[Kavoon] px-4">
                <h2 className="font-bold text-lg">Objective:</h2>
                <ul className="list-disc list-inside">
                    <li>Be the first to get rid of all your cards</li>
                </ul>

                <h2 className="font-bold text-lg mt-4">Setup:</h2>
                <ul className="list-disc list-inside">
                    <li>
                        <b>Players:</b> 2-10.
                    </li>
                    <li>
                        <b>Deck:</b> 108 cards.
                    </li>
                    <li>
                        <b>Dealing:</b> 7 cards each, remaining cards form draw
                        pile. Top card starts discard pile.
                    </li>
                </ul>

                <h2 className="font-bold text-lg mt-4">Gameplay:</h2>
                <ul className="list-disc list-inside">
                    <li>
                        <b>Turns:</b> Match a card from your hand to the top
                        card of the discard pile by color or number, or play a
                        Wild card.
                    </li>
                    <li>
                        <b>Draw:</b> If you can't play, draw one card. Play it
                        if possible; if not, turn passes.
                    </li>
                    <li>
                        <b>UNO:</b>If at any point in play you are left with a
                        single card you have to say uno.
                    </li>
                </ul>

                <h2 className="font-bold text-lg mt-4">Action Cards:</h2>
                <ul className="list-disc list-inside">
                    <li>
                        <b>Skip:</b> Next player misses a turn.
                    </li>
                    <li>
                        <b>Reverse:</b> Reverses play direction.
                    </li>
                    <li>
                        <b>Draw Two:</b> Next player draws 2 cards and misses a
                        turn.
                    </li>
                    <li>
                        <b>Wild:</b> Choose the color to continue play.
                    </li>
                    <li>
                        <b>Wild Draw Four:</b> Choose color and next player
                        draws 4 cards.
                    </li>
                </ul>
                <p className="text-lg mt-4">
                    If you would like to learn more about the Rules of UNO click{' '}
                    <Link
                        to="https://www.unorules.com"
                        target="_blank"
                        className="underline"
                    >
                        here
                    </Link>
                    .
                </p>
            </div>
        </div>
    </>
);
const Navbar: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const auth = useAuth();
    const modal = useModal();
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
            <div className="flex justify-between items-center p-4 ml-4 mt-4 mr-2 fixed z-10 w-full">
                <div className="space-x-4 flex flex-row">
                    <button onClick={toggleMenu}>
                        <img
                            src="/hamburger.png"
                            alt="hamburger menu"
                            className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9"
                        />
                    </button>
                    <Link to="/">
                        <img
                            src="/UNO_Logo.svg"
                            alt="logo"
                            className="w-24 h-24 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                        />
                    </Link>
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
                                    modal.show(
                                        'aboutUsModal',
                                        aboutUs,
                                        'large',
                                        [
                                            {
                                                text: 'Close',
                                                type: 'submit',
                                            },
                                        ]
                                    );
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
                                    modal.show('rulesModal', rules, 'large', [
                                        {
                                            text: 'Close',
                                            type: 'submit',
                                        },
                                    ]);
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
        </div>
    );
};

export default Navbar;
