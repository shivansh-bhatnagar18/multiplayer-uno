import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../library/button';
import Navbar from '../Navbar';
import Modal from '../library/modal';
import '../index.css';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const auth = useAuth();

    const handleLogin = () => {
        auth.login();
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleLogout = () => {
        auth.logout();
    };

    const CreateGame = () => {
        console.log('Create Game');
        navigate('/error');
    };

    const JoinGame = () => {
        setShowModal(true);
        console.log('Join Game with code');
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
                <div className="w-full max-w-[900px] h-[300px] md:h-[270px] lg:h-[240px] overflow-hidden mt-4 mb-5">
                    <img
                        src="/unologo.png"
                        alt="UNO Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <Button
                        text="Start Game"
                        className="mb-4 w-[220px] h-16 md:w-[250px] md:h-18 border-4"
                        fontSize="text-3xl"
                        px="px-3"
                        py="py-1"
                        onClick={CreateGame}
                    />
                    <Button
                        text="Join Game"
                        className="mb-4 w-[220px] h-16 md:w-[250px] md:h-18 border-4"
                        fontSize="text-3xl"
                        px="px-3"
                        py="py-1"
                        onClick={JoinGame}
                    />
                </div>
            </div>
            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Home;
