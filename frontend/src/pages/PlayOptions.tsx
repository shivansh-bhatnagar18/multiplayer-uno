import { useNavigate } from 'react-router-dom';
import Input from '../library/input';
import Button from '../library/button';

function PlayOptions() {
    const navigate = useNavigate();
    function handleCreateGame() {
        console.log('Creating a new game');
        navigate('/game');
    }

    return (
        <>
            <div>
                <h1>Create a new game</h1>
                <Button onClick={handleCreateGame}>Create game</Button>
            </div>
            <div>
                <h1>Join a game</h1>
                <Input placeholder="Enter game code" />
            </div>
        </>
    );
}

export default PlayOptions;
