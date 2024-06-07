import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../library/button';
import Heading from '../library/heading';
import '../index.css';

const PlayOptions = () => {
    const [gameCode, setGameCode] = useState('');
    const navigate = useNavigate();
    const CreateGame = () => {
        // Logic to create a game
        console.log('Create Game');
        navigate('/game');
    };

    const JoinGame = () => {
        // Logic to join a game
        console.log('Join Game with code:', gameCode);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-neutral-950 via-red-950 to-neutral-950">
            <div className="max-h-screen w-screen max-w-screen-md p-1 md:items-center md:justify-center">
                <div className="flex items-center justify-center p-3 mb-10 ">
                    <img
                        src="/UNO_Logo.svg"
                        alt="UNO Logo"
                        className="h-12 w-auto mr-2"
                    />
                    <Heading
                        text="Ready for Action?"
                        fontSize="text-4xl"
                        fontWeight="font-bold"
                        textColor="text-white"
                        fontStyle="font-serif"
                    />
                </div>
                <div className="flex flex-col md:flex-row w-full md:max-w-screen-md space-y-10 md:space-y-0 md:space-x-10 p-10">
                    <div className="bg-gradient-to-r from-red-900 via-blue-900 to-red-900 flex-1 w-full p-5 border-2 border-spacing-2 border-opacity-80 border-red-950 rounded-xl shadow-md flex flex-col items-center">
                        <div className="pb-12 pt-3">
                            <Heading
                                text="Create a new game"
                                fontSize="text-3xl"
                                fontWeight="font-bold"
                                textColor="text-white"
                                fontStyle="font-serif"
                            />
                        </div>
                        <Button onClick={CreateGame}>New Game</Button>
                    </div>
                    <div className="bg-gradient-to-r from-red-900 via-green-900 to-red-900 flex-1 w-full p-3 border-2 border-spacing-2 border-opacity-80 border-red-950 rounded-xl shadow-md flex flex-col items-center">
                        <div className="pt-2 pb-2">
                            <Heading
                                text="Join an existing Game"
                                fontSize="text-3xl"
                                fontWeight="font-bold"
                                textColor="text-white"
                                fontStyle="font-serif"
                            />
                        </div>
                        <div className="p-2 pb-2 w-full justify-self-center">
                            <input
                                placeholder="Enter the Game Code"
                                value={gameCode}
                                onChange={(e) => setGameCode(e.target.value)}
                                className="border-2 border-red-600 rounded-lg p-1 mb-4 text-md w-full bg-black text-white"
                            />
                        </div>
                        <Button onClick={JoinGame}>Join Game</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayOptions;
