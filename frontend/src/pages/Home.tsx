import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../library/button';
import Navbar from '../Navbar';
import Modal from '../library/modal';
import '../index.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const CreateGame = () => {
        // Logic to create a game
        console.log('Create Game');
        navigate('/game?type=create');
    };

    const JoinGame = () => {
        // Logic to join a game
        setShowModal(true);
        console.log('Join Game with code');
    };

    return (
        <div className="min-h-screen bg-uno-bg bg-cover bg-center flex flex-col relative">
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="w-[520px] h-[180px] sm:w-[600px] sm:h-[200px] md:w-[720px] md:h-[235px] lg:w-[900px] lg:h-[300px] overflow-hidden mt-4 mb-5">
                    <img
                        src="/unologo.png"
                        alt="UNO Logo"
                        className="w-full h-full object-cover"
                    />
                </div>
                <Button
                    variant="accept"
                    className="mb-5"
                    size="large"
                    onClick={CreateGame}
                >
                    Start Game
                </Button>

                <Button variant="accept" size="large" onClick={JoinGame}>
                    Join Game
                </Button>
            </div>
            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Home;
