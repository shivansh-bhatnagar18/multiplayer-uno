import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../library/button';
import Navbar from '../Navbar';
import Modal from '../library/modal';
import '../index.css';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const CreateGame = () => {
        // Logic to create a game
        console.log('Create Game');
        navigate('/error');
    };

    const JoinGame = () => {
        // Logic to join a game
        setShowModal(true);
        console.log('Join Game with code');
    };
    const auth = useAuth();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        auth.logout();
    };

    return (
        <div className="min-h-screen bg-uno-bg bg-cover bg-center flex flex-col relative">
            <Navbar
                isLoggedIn={auth.isLoggedIn()}
                username={auth.getUser()?.name || ''}
                onLogin={handleLogin}
                onLogout={handleLogout}
            />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="w-[520px] h-[180px] sm:w-[600px] sm:h-[200px] md:w-[720px] md:h-[235px] lg:w-[900px] lg:h-[300px] overflow-hidden mt-4 mb-5">
                    <img
                        src="/unologo.png"
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
            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Home;
