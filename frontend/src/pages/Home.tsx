import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../library/button';
import Navbar from '../Navbar';
import '../index.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const CreateGame = () => {
        // Logic to create a game
        console.log('Create Game');
        navigate('/game');
    };

    const JoinGame = () => {
        // Logic to join a game
        console.log('Join Game with code');
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        setUsername('Username_7');
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setUsername('');
        setIsLoggedIn(false);
    };

    return (
        <div className="min-h-screen bg-uno-bg bg-cover bg-center flex flex-col relative">
            <Navbar
                isLoggedIn={isLoggedIn}
                username={username}
                onLogin={handleLogin}
                onLogout={handleLogout}
            />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="w-[520px] h-[180px] sm:w-[600px] sm:h-[200px] md:w-[720px] md:h-[235px] lg:w-[900px] lg:h-[300px] overflow-hidden mt-4 mb-5">
                    <img
                        src="src/assets/Uno-Logo.png"
                        alt="UNO Logo"
                        className="w-full h-full object-cover"
                    />
                </div>
                <Button
                    text="Start Game"
                    className="mb-6 w-48 border-4"
                    buttonSize="w-[220px] h-16"
                    fontSize="text-3xl"
                    px="px-3"
                    py="py-1"
                    onClick={CreateGame}
                />
                <Button
                    text="Join Game"
                    className="mb-4 w-48 border-4"
                    buttonSize="w-[220px] h-16"
                    fontSize="text-3xl"
                    px="px-3"
                    py="py-1"
                    onClick={JoinGame}
                />
            </div>
        </div>
    );
};

export default Home;
