import { useNavigate } from 'react-router-dom';
import Input from '../library/input';
import Button from '../library/button';
import Heading from '../library/heading';
function PlayOptions() {
    const navigate = useNavigate();
    function CreateGame() {
        console.log('Creating a new game');
        navigate('/game');
    }
    function joinGame() {

    }

    return (
    <div className="min-h-screen flex flex-col md:flex-row md:items-center md:justify-center w-screen">
        <div className="flex flex-col md:flex-row w-full md:max-w-screen-md space-y-8 md:space-y-0 md:space-x-10 p-10">
            <div className="flex-1 w-full p-6 border-2 border-spacing-2 border-opacity-80 border-red-600 rounded-xl shadow-md flex flex-col items-center">
                <div className="pb-12 pt-2">
                    <Heading name="Create Game" />
                </div>
                <Button onClick={CreateGame}>Create game</Button>
            </div>
            <div className="flex-1 w-full p-6 border-2 border-spacing-2 border-opacity-80 border-red-600 rounded-xl shadow-md flex flex-col items-center">
                <div className="p-2">
                    <Heading name="Join Game" />
                </div>
                <div className="p-2 pb-4 w-full justify-self-center">
                    <Input placeholder="Enter the joining code" />
                </div>
                <Button onClick={joinGame}>Join Game</Button>
            </div>
        </div>
    </div>
);


}

export default PlayOptions