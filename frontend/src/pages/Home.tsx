import { useNavigate } from 'react-router-dom';
import Button from '../library/button';
import '../index.css';
import { useModal } from '../library/modal/ModalContext';
import { useState } from 'react';
import { useToast } from '../library/toast/toast-context';
import { useAuth } from '../contexts/AuthContext';

function JoinGameModalContent() {
    const [gameCode, setGameCode] = useState<string>('');
    const { open } = useToast();
    const navigate = useNavigate();
    const modal = useModal();

    function joinHandler() {
        if (gameCode.trim()) {
            modal.hide();
            navigate('/game?type=join&code=' + gameCode);
        } else {
            open({
                message: {
                    heading: 'Warning',
                    content: 'Please Enter The Game Code',
                },
                duration: 3000,
                position: 'top-center',
                color: 'warning',
            });
        }
    }

    return (
        <>
            <h1 className="font-normal font-[Kavoon] text-[30px] leading-[30px] text-black text-center">
                Join an Existing Game
            </h1>
            <div className="flex justify-center w-2/3">
                <input
                    className="font-normal font-[Kavoon] text-[20px] py-2 px-6 border-4 border-black rounded-3xl w-full h-12"
                    placeholder="Enter the game code"
                    style={{
                        backgroundColor: 'rgb(222, 209, 209)',
                        color: 'black',
                    }}
                    value={gameCode}
                    onChange={(e) => {
                        setGameCode(e.target.value.trim());
                    }}
                />
            </div>
            <Button type={'submit'} onClick={joinHandler}>
                Join Game
            </Button>
        </>
    );
}

function Home() {
    const modal = useModal();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { open } = useToast();

    const CreateGame = () => {
        if (isLoggedIn()) {
            // Logic to create a game
            console.log('Create Game');
            navigate('/game?type=create');
        } else {
            open({
                message: {
                    heading: 'Warning',
                    content: 'Please login to create a game',
                },
                duration: 3000,
                position: 'top-center',
                color: 'warning',
            });
            navigate('/login');
        }
    };

    const JoinGame = () => {
        // Logic to join a game
        modal.show(<JoinGameModalContent />, 'small');
        console.log('Join Game with code');
    };

    return (
        <div className="min-h-screen bg-uno-bg bg-cover bg-center flex flex-col relative">
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="w-11/12 sm:w-[520px] sm:h-[180px] md:w-[600px] md:h-[200px] lg:w-[720px] lg:h-[235px] xl:w-[900px] xl:h-[300px] overflow-hidden mt-4 mb-5">
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
        </div>
    );
}

export default Home;
