/* eslint-disable */
import React, { createContext, useContext, useState, useEffect } from 'react';
import Game from '../pages/Game';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useToast } from '../library/toast/toast-context';

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
    const toast = useToast();
    const auth = useAuth();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        if (!auth.isLoggedIn()) {
            navigate('/');
            toast.open({
                message: 'Please login to continue',
                color: 'error',
            });
            return;
        }
        const queryParams = new URLSearchParams(location.search);
        const gameType = queryParams.get('type');
        async function setupGame() {
            try {
                if (gameType === 'join') {
                    const gameCode = queryParams.get('code');
                    const res = await fetch(`${backendUrl}/game/join`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            code: gameCode,
                            token: auth.jwt,
                        }),
                    });
                    if (!res.ok) {
                        //todo: more systematic error sending from backend
                        throw new Error((await res.json()).error);
                    }
                    const data = await res.json();
                    if (!data.gameState) {
                        throw new Error('Game state not received');
                    }
                    setGameState(data.gameState);
                } else if (gameType === 'create') {
                    const res = await fetch(`${backendUrl}/game/create`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token: auth.jwt }),
                    });
                    if (!res.ok) {
                        throw new Error((await res.json()).error);
                    }
                    const data = await res.json();
                    if (!data.gameState) {
                        throw new Error('Game state not received');
                    }
                    setGameState(data.gameState);
                    console.log(data.gameState.id);
                }
            } catch (e) {
                toast.open({
                    message: (e as Error).message,
                    color: 'error',
                });
                navigate('/');
            }
        }
        setupGame();
    }, [location.search]);

    // polling
    useEffect(() => {
        async function poll() {
            const res = await fetch(`${backendUrl}/game/events`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: auth.jwt,
                },
            });
            if (!res.ok) {
                throw new Error((await res.json()).error);
            }
            const data = await res.json();
            // to be changed later to have a more sensible structure
            setGameState(data.events[0]);
        }
        poll();
    }, [gameState]);

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
