/* eslint-disable */
import React, { createContext, useContext, useState, useEffect } from 'react';
import Game from '../pages/Game';
import { useLocation } from 'react-router-dom';

interface GameState {
    players: { id: number; name: string; cards: string[] }[];
    cards: string[];
    currentTurn: number;
    lastThrownCard: string;
}

interface GameContextProps {
    gameState: GameState | null;
    setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
}

const defaultGameState: GameState = {
    players: [],
    cards: [],
    currentTurn: 0,
    lastThrownCard: '',
};

const GameContext = createContext<GameContextProps>({
    gameState: null,
    setGameState: () => {},
});

export const GameProvider = () => {
    const [gameState, setGameState] = useState<GameState | null>(
        defaultGameState
    );

    const location = useLocation();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const gameType = queryParams.get('type');

        fetch(`${backendUrl}/api/game?type=${gameType}`)
            .then((response) => response.json())
            .then((data) => {
                setGameState(data);
            });

        // polling
        const interval = setInterval(() => {
            fetch(`${backendUrl}/api/game/state`)
                .then((response) => response.json())
                .then((data) => {
                    setGameState(data);
                });
        }, 5000);

        return () => clearInterval(interval);
    }, [location.search]);

    return (
        <GameContext.Provider value={{ gameState, setGameState }}>
            {gameState ? (
                <Game />
            ) : (
                <div className="bg-gray-800 h-screen text-white text-5xl font-kavoon text-center">
                    Loading...
                </div>
            )}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};
