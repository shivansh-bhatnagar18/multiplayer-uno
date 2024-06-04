import { useNavigate } from 'react-router-dom';
import Input from '../library/input';
import Button from '../library/button';
import { useState } from 'react';
function PlayOptions() {
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    function handleCreateGame() {
        console.log('Creating a new game');
        navigate('/game');
    }
    function isJoinClicked() {
        if (!isClicked) {
            setIsClicked(true);
        }
    }
    return (
        <>
            <div className="min-h-screen min-w-[100vw] flex flex-col items-center justify-center bg-red-500 gap-y-6">
                <img
                    className="h-[100px] w-[100px]"
                    src="\logo.jpg"
                    alt="logo"
                />
                <div className="flex flex-col items-center w-[300px] h-fit mb-4">
                    <Button onClick={handleCreateGame}>Create game</Button>
                </div>
                <div className="flex flex-col items-center w-[300px] h-fit mb-4">
                    <Button onClick={isJoinClicked}>Join a game</Button>
                    {isClicked ? (
                        <div className=" p-4 flex items-center justify-center">
                            <Input placeholder="Enter game code" />
                            <i
                                onClick={() => setIsClicked(false)}
                                className="fa-solid fa-xmark pl-4 text-xl text-gray-300 cursor-pointer"
                            ></i>
                        </div>
                    ) : null}
                </div>
                <div className="flex flex-col items-center w-[300px] h-fit mb-4">
                    <Button onClick={() => navigate('/settings')}>
                        Settings
                    </Button>
                </div>
                <div className="flex flex-col items-center w-[300px] h-fit mb-4">
                    <Button onClick={() => navigate('/about')}>About us</Button>
                </div>
            </div>
        </>
    );
}

export default PlayOptions;
