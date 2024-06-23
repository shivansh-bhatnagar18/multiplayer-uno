import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { createGame, retrieveGame } from '../gameStore';
import { GameEventTypes } from '../types';
import {
    makeStateSyncEvent,
    propagateEventToClients,
} from './eventControllers';

export async function handleGameJoin(req: AuthRequest, res: Response) {
    const gameCode = req.body.code;
    const activeGameId = req.user.activeGameId;
    if (activeGameId) {
        res.status(400).send({
            error: 'User is already playing a game',
        });
        return;
    }
    const game = retrieveGame(gameCode);
    if (!game) {
        res.status(404).send({ error: 'Game not found' });
        return;
    }
    //note: when retrieving game from database, it is not an instance of GameEngine
    // we'd need to add these functions to the mongodb game schema
    // this should be sent once the joining player receives the game state
    game.dispatchEvent({
        type: GameEventTypes.JOIN_GAME,
        playerId: req.user.id,
    });
    propagateEventToClients(
        await makeStateSyncEvent(game),
        game.players.map((p) => p.id)
    );
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
        res.status(500).send({ error: 'Failed to create game' });
        return;
    }
    req.user.activeGameId = game.id;
    await req.user.save();
    res.status(200).send({
        message: 'Game created successfully',
        gameState: game,
    });
}
