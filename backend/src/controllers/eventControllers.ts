import { addClient, enqueueForSend } from '../eventRecipients';
import { retrieveGame } from '../gameStore';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Response } from 'express';
import {
    AppEvent,
    ClientId,
    GameEvent,
    GameEventTypes,
    isGameEvent,
} from '../types';
import { GameEngine } from '../uno-game-engine/engine';

export function addEventClient(req: AuthRequest, res: Response) {
    const clientId = req.user.id as string;
    // note: we might need to use a different client id if the user is allowed to have multiple clients
    // ie, the user is allowed to play multiple games on multiple devices at the same time
    addClient(clientId, res);
}

export async function handleAppEvent(req: AuthRequest, res: Response) {
    console.log('handling app event');
    const event = req.body;
    //todo: validate event
    event.playerId = req.user.id;
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
    if (isGameEvent(event)) {
        //todo: When game data is retrieved from database, it is not an instance of GameEngine
        // so we would need to convert it to an instance of GameEngine
        const result = game.dispatchEvent(event);
        if (result.type === 'ERROR') {
            res.status(400).send({ message: result.message });
            return;
        } else {
            propagateEventToClients(
                event,
                game.players.map((player) => player.id)
            );
        }
    } else {
        // it is a message event etc
        // directly propagate it for now (we might need to do some validation/preprocessing
        // on message events later)
        propagateEventToClients(
            event,
            game.players.map((player) => player.id)
        );
    }
    res.status(200).send({ message: 'Event propagated to clients.' });
}

// temporarily here
export function makeStateSyncEvent(game: GameEngine): GameEvent {
    return {
        type: GameEventTypes.STATE_SYNC,
        data: {
            players: game.players,
            cards: game.cardDeck,
            currentTurn: game.currentPlayerIndex,
            lastThrownCard: game.lastThrownCard?.id || '',
        },
    };
}

export function propagateEventToClients(event: AppEvent, targets: ClientId[]) {
    for (const target of targets) {
        enqueueForSend(target, event);
    }
}
