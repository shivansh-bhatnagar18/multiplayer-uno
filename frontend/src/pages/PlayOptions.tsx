import { useNavigate } from 'react-router-dom';
import Input from '../library/input';
import Button from '../library/button';
import Heading from '../library/heading';
function PlayOptions() {
    const navigate = useNavigate();
    function handleCreateGame() {
        console.log('Creating a new game');
        navigate('/game');
    }
    function joinGame() {}

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex space-x-10 p-10">
                <div className="flex-1 p-6 border rounded-lg shadow-md max-w-md">
                    <div className="pb-12 pt-2">
                        <Heading title="Create A Game" />
                    </div>
                    <Button onClick={handleCreateGame}>Create game</Button>
                </div>
                <div className="flex-1 p-6 border rounded-lg shadow-md max-w-md">
                    <div className="p-2">
                        <Heading title="Join A Game" />
                    </div>
                    <div className="p-2">
                        <Input placeholder="Enter Game Code" />
                    </div>
                    <Button onClick={joinGame}>Join Game</Button>
                </div>
            </div>
        </div>
    );
}

export default PlayOptions;
