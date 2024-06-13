import { assert } from 'console';
import { GameEngine } from '../engine';
import { getPlayer, registerEventHandler } from '../gameEvents';

export function leaveGame(game: GameEngine, event: GameEvent): EventResult {
    assert(event.type === 'LEAVE_GAME', 'Invalid event type');
    const player = getPlayer(game, event.playerId);
    if (!player) {
        return { type: 'ERROR', message: 'Player not found' };
    }
    game.removePlayer(player);
    return { type: 'SUCCESS', message: 'player left successfully' };
}

registerEventHandler('LEAVE_GAME', leaveGame);
