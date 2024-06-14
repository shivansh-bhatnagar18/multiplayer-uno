import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../library/button';
import Navbar from '../Navbar';
import Modal from '../library/modal';
import '../index.css';
import RulesModal from '../library/rulesModal';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showRulesModal, setShowRulesModal] = useState(false);
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

    return (
        <div className="dimensions bg-uno-bg bg-cover bg-center flex flex-col relative">
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="UnoImage overflow-hidden mt-4 mb-5">
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
            {showRulesModal && (
                <RulesModal onClose={() => setShowRulesModal(false)} />
            )}
        </div>
    );
};

export default Home;
