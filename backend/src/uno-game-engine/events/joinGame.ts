import { assert } from 'console';
import { GameEngine } from '../engine';
import { registerEventHandler } from '../gameEvents';

export function joinGame(game: GameEngine, event: GameEvent): EventResult {
    assert(event.type === 'JOIN_GAME', 'Invalid event type');
    const player: Player = { id: event.playerId, cards: [] };
    game.addPlayer(player);
    return { type: 'SUCCESS', message: 'player joined successfully' };
}

registerEventHandler('JOIN_GAME', joinGame);
