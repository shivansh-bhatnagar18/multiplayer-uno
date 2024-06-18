import { useNavigate } from 'react-router-dom';
import Button from '../library/button';
import '../index.css';
import { useModal } from '../library/modal/ModalContext';

const Content: React.FC = () => {
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
                />
            </div>
        </>
    );
};
const Home: React.FC = () => {
    const modal = useModal();
    const navigate = useNavigate();
    const CreateGame = () => {
        // Logic to create a game
        console.log('Create Game');
        navigate('/game?type=create');
    };

    const JoinGame = () => {
        // Logic to join a game
        modal.show(<Content />, 'small', [
            { type: 'submit', onClick: () => {}, text: 'Join Game' },
        ]);
        console.log('Join Game with code');
    };

    return (
        <div className="min-h-screen bg-uno-bg bg-cover bg-center flex flex-col relative">
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
        </div>
    );
};

export default Home;
