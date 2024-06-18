/* eslint-disable */
import React, { createContext, useContext, useState, useEffect } from 'react';
import Game from '../pages/Game';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useToast } from '../library/toast/toast-context';
import * as channel from '../channel';

interface GameState {
    players: { id: string; cards: string[] }[];
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
                    // extract card and player data from the game state and store in maps
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
        // add event listener to listen for the game state changes
        channel.setGameEventsDispatcher((event) => {
            console.log('Received event:', event);
            if (event.type === 'STATE_SYNC') {
                setGameState({
                    players: event.data.players.map((player) => {
                        return {
                            id: player.id,
                            cards: player.cards.map((card) => card.id),
                        };
                    }),
                    cards: event.data.cards.map((card) => card.id),
                    currentTurn: event.data.currentTurn,
                    lastThrownCard: event.data.lastThrownCard,
                });
            }
        });
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
