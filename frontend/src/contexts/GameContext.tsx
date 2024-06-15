/* eslint-disable */
import React, { createContext, useContext, useState, useEffect } from 'react';
import Game from '../pages/Game';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

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
    const navigate = useNavigate();
    const auth = useAuth();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const gameType = queryParams.get('type');
        try {
            if (gameType === 'join') {
                const gameCode = queryParams.get('code');
                fetch(`${backendUrl}/game/join`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: gameCode, token: auth.jwt }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setGameState(data.gameState);
                    });
            } else if (gameType === 'create') {
                fetch(`${backendUrl}/game/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: auth.jwt }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setGameState(data.gameState);
                    });
            }
        } catch (e) {
            navigate('/');
        }
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
