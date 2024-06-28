import { APIPlayer, GameEvent, GameEventTypes } from '../../backend/src/types';
import { GameState } from './contexts/GameContext';
import assert from 'assert';

export const clientDispatch = (
    gameState: GameState,
    event: GameEvent
): GameState => {
    let newGameState: GameState;

    switch (event.type) {
        case GameEventTypes.JOIN_GAME:
            newGameState = handleJoinGame(gameState, event);
            break;
        case GameEventTypes.LEAVE_GAME:
            newGameState = handleLeaveGame(gameState, event);
            break;
        case GameEventTypes.DRAW_CARD:
            newGameState = handleDrawCard(gameState, event);
            break;
        case GameEventTypes.THROW_CARD:
            newGameState = handleThrowCard(gameState, event);
            break;
        case GameEventTypes.ANNOUNCE_UNO:
            newGameState = handleAnnounceUno(gameState, event);
            break;
        case GameEventTypes.STATE_SYNC:
            newGameState = handleStateSync(gameState, event);
            break;
        case GameEventTypes.START_GAME:
            newGameState = handleStartGame(gameState, event);
            break;

        default:
            throw new Error(`Unhandled event type: ${event}`);
    }
    return newGameState;
};

const handleJoinGame = (gameState: GameState, event: GameEvent): GameState => {
    if (event.type !== GameEventTypes.JOIN_GAME) {
        throw new Error(`Invalid event type for handleJoinGame: ${event.type}`);
    }
    assert(event.data !== undefined, 'Unknown Player');
    const { playerId, data } = event;
    const playerName = data.joinedPlayer.name;

    return {
        ...gameState,
        players: [
            ...gameState.players,
            { id: playerId, name: playerName, cards: [] },
        ],
    };
};
const handleLeaveGame = (gameState: GameState, event: GameEvent): GameState => {
    if (event.type !== GameEventTypes.LEAVE_GAME) {
        throw new Error(
            `Invalid event type for handleLeaveGame: ${event.type}`
        );
    }
    const { playerId } = event;
    return {
        ...gameState,
        players: gameState.players.filter((player) => player.id !== playerId),
    };
};

const handleDrawCard = (gameState: GameState, event: GameEvent): GameState => {
    if (event.type !== GameEventTypes.DRAW_CARD) {
        throw new Error(`Invalid event type for handleDrawCard: ${event.type}`);
    }
    const { playerId } = event;

    // Find the player who drew the card
    const updatedPlayers = gameState.players.map((player) => {
        if (player.id === playerId) {
            const updatedCards = [...player.cards];
            return { ...player, cards: updatedCards };
        }
        return player;
    });

    return {
        ...gameState,
        players: updatedPlayers,
    };
};

const handleThrowCard = (gameState: GameState, event: GameEvent): GameState => {
    if (event.type !== GameEventTypes.THROW_CARD) {
        throw new Error(
            `Invalid event type for handleThrowCard: ${event.type}`
        );
    }
    const { playerId } = event;
    const { cardId } = event.data;
    return {
        ...gameState,
        players: gameState.players.map((player) =>
            player.id === playerId
                ? { ...player, cards: player.cards.filter((c) => c !== cardId) }
                : player
        ),
        lastThrownCard:
            gameState.cardDeck.find((card) => card.id === cardId) || null,
    };
};

const handleStateSync = (gameState: GameState, event: GameEvent): GameState => {
    if (event.type !== GameEventTypes.STATE_SYNC) {
        throw new Error(
            `Invalid event type for handleStateSync: ${event.type}`
        );
    }
    const { data } = event;
    const mappedPlayers = data.players.map((player) => ({
        id: player.id,
        name: player.name,
        cards: player.cards,
    }));

    return {
        ...gameState,
        id: data.id,
        players: mappedPlayers,
        cardDeck: data.cardDeck,
        thrownCards: data.thrownCards,
        currentPlayerIndex: data.currentPlayerIndex,
        lastThrownCard: data.lastThrownCard,
        direction: data.direction,
        status: data.status,
        runningEvents: data.runningEvents,
    };
};

const handleAnnounceUno = (
    gameState: GameState,
    event: GameEvent
): GameState => {
    if (event.type !== GameEventTypes.ANNOUNCE_UNO) {
        throw new Error(
            `Invalid event type for handleStateSync: ${event.type}`
        );
    }
    const { playerId } = event;
    const player: APIPlayer = gameState.players.find(
        (p) => p.id == playerId
    ) as APIPlayer;
    const gamePlayer = {
        id: player.id,
        cards: player.cards.map((cardId) => {
            const card = gameState.cardDeck.find((c) => c.id === cardId);
            if (!card)
                throw new Error(`Card with id ${cardId} not found in deck`);
            return card;
        }),
    };
    return {
        ...gameState,
        runningEvents: {
            hasAnnouncedUNO: gamePlayer,
            vulnerableToUNO: null,
        },
    };
};

const handleStartGame = (gameState: GameState, event: GameEvent): GameState => {
    if (event.type !== GameEventTypes.START_GAME) {
        throw new Error(
            `Invalid event type for handleStateSync: ${event.type}`
        );
    }
    return { ...gameState, status: 'STARTED' };
};
