import { useEffect } from 'react';
import { useGameContext } from '../contexts/GameContext';
import Button from '../library/button';
import { useModal } from '../library/modal/ModalContext';
import CopyButton from '../library/copyButton';
import Chatbox from '../library/chatbox/Chatbox';
import { GameEventTypes } from '../../../backend/src/types';
import * as channel from '../channel';

function Game() {
    const { gameState } = useGameContext();
    const modal = useModal();
    useEffect(() => {
        if (gameState) {
            modal.show(<GamePropertiesModal />, 'large', [], false);
        }
        // eslint-disable-next-line
    }, [gameState]);
    const drawCard = () => {
        channel.triggerEvent({
            type: GameEventTypes.DRAW_CARD,
        });
    };

    function GamePropertiesModal() {
        return (
            <>
                <div className="flex flex-col items-center justify-center p-4 space-y-6">
                    <div className="flex justify-center items-center w-full pl-6">
                        <h1 className="font-normal font-[Kavoon] text-[30px] leading-[30px] text-[#333] text-center inline-block ml-auto">
                            Start Game
                        </h1>
                        <i
                            className="fa-solid fa-circle-xmark cursor-pointer text-3xl ml-auto mr-3"
                            onClick={modal.hide}
                        ></i>
                    </div>
                    <div className="flex justify-center px-5">
                        <h2 className="text-bold font-bold  font-[Kavoon]  text-[#333] text-[20px]">
                            Game Id :{' '}
                            <span className="text-[#555] ">
                                {' '}
                                {gameState.id}
                            </span>
                            &nbsp; <CopyButton copyText={gameState.id} />
                        </h2>
                    </div>
                    <div className="flex justify-center px-5">
                        <h2 className="text-bold font-bold  text-[#333]  font-[Kavoon] text-[20px]">
                            Players Joined :{' '}
                            <span className="text-[#555] font-[Roboto]">
                                {gameState.players.length}
                            </span>
                        </h2>
                    </div>
                    <div className="flex justify-center px-5">
                        <h2 className="text-bold font-bold  text-[#333]  font-[Kavoon] text-[20px]">
                            Invite More Players : &nbsp;
                            <CopyButton
                                priorText="Copy Invite Link"
                                copyText={`${window.location.origin}/game?type=join&code=${gameState.id}`}
                                postText="Copied"
                            />
                        </h2>
                    </div>
                    <Button type={'submit'} onClick={() => modal.hide()}>
                        Join Game
                    </Button>
                </div>
            </>
        );
    }

    const playerPositions = [
        { top: '12%', left: '29%', transform: 'translate(-50%, -50%)' },
        { top: '12%', left: '71%', transform: 'translate(-50%, -50%)' },
        { top: '40%', left: '10%', transform: 'translate(-50%, -50%)' },
        { top: '40%', left: '90%', transform: 'translate(-50%, -50%)' },
        { top: '75%', left: '15%', transform: 'translate(-50%, -50%)' },
        { top: '75%', left: '85%', transform: 'translate(-50%, -50%)' },
    ];
    if (!gameState) {
        return (
            <div className="bg-gray-800 h-screen text-white text-5xl font-kavoon text-center">
                Loading...
            </div>
        );
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-700">
            <div className="relative w-full max-w-6xl h-[85vh] bg-cover bg-center bg-table-bg">
                {/* Players */}
                {gameState.players.slice(0, 6).map((player, index) => (
                    <div
                        key={index}
                        className="absolute flex flex-col items-center justify-center bg-player-icon-bg"
                        style={{
                            ...playerPositions[index],
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            width: '70px',
                            height: '80px',
                            zIndex: 2,
                        }}
                    >
                        <div className="player-cards text-black mt-[61px]">
                            {player.cards.length}
                        </div>
                    </div>
                ))}

                {/* Center Deck and UNO Button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10">
                    <div className="relative flex">
                        <img
                            src="/cardPool.png"
                            alt="Card Pool"
                            className="w-56 h-36"
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4 z-20">
                            <img
                                src="/card_faces/back.jpeg"
                                alt="Card 1"
                                className="w-15 h-20 cursor-pointer"
                                onClick={drawCard}
                            />
                            <img
                                src={
                                    gameState.lastThrownCard
                                        ? `/card_faces/${gameState.lastThrownCard}.svg`
                                        : '/card_faces/back.jpeg'
                                }
                                alt="Last Thrown Card"
                                className="w-15 h-20"
                            />
                        </div>
                    </div>
                    <Button
                        variant="accept"
                        size="small"
                        className="border-2 active:bg-red-600 mt-4 hover:bg-purple-900"
                        backgroundColor="bg-purple-800"
                        buttonSize="w-18 h-10"
                    >
                        UNO
                    </Button>
                </div>

                {/* Player Mat */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
                    <img
                        src="/deckMat.png"
                        alt="Deck Mat"
                        className="w-[calc(7*2.5rem)] h-20 relative z-10"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex z-30">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <img
                                key={index}
                                src="/card_faces/g8.svg"
                                alt={`Card ${index}`}
                                className="w-12 h-16"
                                style={{
                                    marginLeft: index === 0 ? 0 : '-1.2rem',
                                    zIndex: 11 + index,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Chatbox />
        </div>
    );
}

export default Game;
