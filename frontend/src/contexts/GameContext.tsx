/* eslint-disable */
import React, { createContext, useContext, useState, useEffect } from 'react';
import Game from '../pages/Game';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useToast } from '../library/toast/toast-context';
import * as channel from '../channel';
import { clientDispatch } from '../clientDispatch';
import {
    APIPlayer,
    GameStatus,
    UNOCard,
    AppEvent,
    GameEvent,
    GameEventTypes,
} from '../../../backend/src/types';

export interface GameState {
    id: string;
    cardDeck: UNOCard[];
    thrownCards: UNOCard[];
    players: APIPlayer[];
    currentPlayerIndex: number;
    lastThrownCard: UNOCard | null;
    direction: number;
    status: GameStatus | '';
    runningEvents: {
        vulnerableToUNO: string | null;
        hasAnnouncedUNO: string | null;
    };
}

interface GameContextProps {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const defaultGameState: GameState = {
    players: [],
    cardDeck: [],
    currentPlayerIndex: 0,
    lastThrownCard: null,
    thrownCards: [],
    direction: 1,
    id: '',
    status: '',
    runningEvents: {
        vulnerableToUNO: null,
        hasAnnouncedUNO: null,
    },
};

const GameContext = createContext<GameContextProps>({
    gameState: defaultGameState,
    setGameState: () => {},
});

export const GameProvider = () => {
    const [gameState, setGameState] = useState<GameState>(defaultGameState);
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const auth = useAuth();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const dispatchGameEvent = (event: AppEvent) => {
        if (event.type in GameEventTypes) {
            setGameState((prevState) =>
                clientDispatch(prevState, event as GameEvent)
            );
        }
        // Handle ChatEvents
    };
    useEffect(() => {
        if (!auth.isLoggedIn()) {
            // we gatekeep being able to join a game behind being logged in
            // but if this component is mounted without being logged in, it means it is
            // through an join link, so we silently redirect to login(no toasts etc)
            navigate('/login' + location.search);
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
                    // setGameState(data.gameState);
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
                    // setGameState(data.gameState);
                    // extract card and player data from the game state and store in maps
                    // console.log(data.gameState.id);
                }
            } catch (e) {
                toast.open({
                    message: {
                        heading: 'Error',
                        content: (e as Error).message,
                    },
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
            dispatchGameEvent(event);
        });
    }, [gameState]);

    return (
        <GameContext.Provider value={{ gameState, setGameState }}>
            {gameState !== defaultGameState ? (
                <Game />
            ) : (
                <div className="flex justify-center items-center h-screen bg-gray-800 text-white text-5xl font-kavoon">
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
