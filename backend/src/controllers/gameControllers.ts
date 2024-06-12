import { Response } from 'express';
import { enqueueForSend } from '../eventRecipients';
import { AuthRequest } from '../middlewares/authMiddleware';
import { retrieveGame } from '../gameStore';

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
    //todo: When game data is retrieved from database, it is not an instance of GameEngine
    // so we would need to convert it to an instance of GameEngine
    const result = game.dispatchEvent(event);
    if (result.type === 'ERROR') {
        res.status(400).send({ message: result.message });
        return;
    } else {
        // the game state after a successful event is propagated to all clients
        // we can choose to relay the event received, so that the clients apply the event
        // to their local game state, but that would be an extra implementation burden.
        // Instead, we can just send the new game state to the clients.
        // todo: send updated game state rather than event
        for (const player of game.players) {
            enqueueForSend(player.id, event);
        }
        res.status(200).send({ message: 'Event propagated to clients.' });
    }
}
