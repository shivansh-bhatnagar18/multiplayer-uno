import { Response } from 'express';
import { enqueueForSend } from '../eventRecipients';
import { AuthRequest } from '../middlewares/authMiddleware';
import { createGame, retrieveGame } from '../gameStore';
import { GameEngine } from '../uno-game-engine/engine';
import { GameEventTypes } from '../types';

export async function handleGameEvent(req: AuthRequest, res: Response) {
    const event = req.body;
    const activeGameId = req.user.activeGameId;
    if (!activeGameId) {
        res.status(404).send({
            message: 'User is not actively playing any game',
        });
        return;
    }
    const game = retrieveGame(activeGameId);
    if (!game) {
        res.status(404).send({ message: 'Game not found' });
        return;
    }
    console.log('handling event ', event);
    //todo: When game data is retrieved from database, it is not an instance of GameEngine
    // so we would need to convert it to an instance of GameEngine
    const result = game.dispatchEvent(event);
    if (result.type === 'ERROR') {
        res.status(400).send({ message: result.message });
        return;
    } else {
        propagateChanges(game);
        res.status(200).send({ message: 'Event propagated to clients.' });
    }
}

export async function handleGameJoin(req: AuthRequest, res: Response) {
    const gameCode = req.body.code;
    const activeGameId = req.user.activeGameId;
    if (activeGameId) {
        res.status(400).send({
            message: 'User is already playing a game',
        });
        return;
    }
    const game = retrieveGame(gameCode);
    if (!game) {
        res.status(404).send({ message: 'Game not found' });
        return;
    }
    //note: when retrieving game from database, it is not an instance of GameEngine
    // we'd need to add these functions to the mongodb game schema
    // this should be sent once the joining player receives the game state
    game.dispatchEvent({
        type: GameEventTypes.JOIN_GAME,
        playerId: req.user.id,
    });
    propagateChanges(game);
    req.user.activeGameId = gameCode;
    await req.user.save();
    res.status(200).send({
        message: 'Game joined successfully',
        gameState: game,
    });
}

export async function handleGameCreate(req: AuthRequest, res: Response) {
    const game = createGame();
    const eventResult = game.dispatchEvent({
        type: GameEventTypes.JOIN_GAME,
        playerId: req.user.id as string,
    });
    if (eventResult.type === 'ERROR') {
        res.status(500).send({ message: 'Failed to create game' });
        return;
    }
    req.user.activeGameId = game.id;
    await req.user.save();
    res.status(200).send({
        message: 'Game created successfully',
        gameState: game,
    });
}

// temporarily here
function propagateChanges(game: GameEngine) {
    // the game state after a successful event is propagated to all clients
    // we can choose to relay the event received, so that the clients apply the event
    // to their local game state, but that would be an extra implementation burden.
    // Instead, we can just send the new game state to the clients.
    for (const player of game.players) {
        enqueueForSend(player.id, {
            type: GameEventTypes.STATE_SYNC,
            data: {
                players: game.players,
                cards: game.cardDeck,
                currentTurn: game.currentPlayerIndex,
                lastThrownCard: game.lastThrownCard?.id || '',
            },
        });
    }
}
