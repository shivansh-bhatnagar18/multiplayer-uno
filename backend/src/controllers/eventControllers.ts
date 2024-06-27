import { addClient, enqueueForSend } from '../eventRecipients';
import { retrieveGame } from '../gameStore';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Response } from 'express';
import {
    APIPlayer,
    AppEvent,
    ClientId,
    GameEvent,
    GameEventTypes,
    isGameEvent,
} from '../types';
import { GameEngine } from '../uno-game-engine/engine';
import { User } from '../models/userModel';

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
        // Populate joinedPlayer field if the event type is JOIN_GAME
        if (event.type === 'JOIN_GAME') {
            event.data = {
                joinedPlayer: {
                    id: req.user.id,
                    name: req.user.username,
                    cards: [],
                },
            };
        }
        const result = game.dispatchEvent(event);
        if (result.type === 'ERROR') {
            res.status(400).send({ message: result.message });
            return;
        } else {
            propagateEventToClients(
                event,
                game.players.map((player) => player.id)
            );
            // Emit state synchronization event
            if (event.type === 'DRAW_CARD' || event.type === 'START_GAME') {
                const stateSyncEvent = await makeStateSyncEvent(game);
                propagateEventToClients(
                    stateSyncEvent,
                    game.players.map((player) => player.id)
                );
            }
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
export async function makeStateSyncEvent(game: GameEngine): Promise<GameEvent> {
    console.log(game.players);
    const apiplayers = await User.find({
        _id: { $in: game.players.map((player) => player.id) },
    }).select('id username');
    console.log('apiplayers', apiplayers);
    // make a map of id vs all the additional data we send
    const apiPlayers = apiplayers.reduce((acc, player) => {
        acc[player.id] = { name: player.username };
        return acc;
    }, {});

    return {
        type: GameEventTypes.STATE_SYNC,
        data: {
            ...game,
            players: game.players.map((player) => ({
                ...player,
                ...apiPlayers[player.id],
            })) as APIPlayer[],
        },
    };
}

export function propagateEventToClients(event: AppEvent, targets: ClientId[]) {
    for (const target of targets) {
        enqueueForSend(target, event);
    }
}
