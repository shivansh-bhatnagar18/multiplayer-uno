import assert from 'assert';
import { GameEngine } from '../engine';
import { EventResult, GameEvent, Player } from '../../types';

export function joinGame(game: GameEngine, event: GameEvent): EventResult {
    assert(event.type === 'JOIN_GAME', 'Invalid event type');
    const player: Player = {
        id: event.playerId,
        cards: [],
    };
    game.addPlayer(player);
    return { type: 'SUCCESS', message: 'player joined successfully' };
}
