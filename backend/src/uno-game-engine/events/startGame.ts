import assert from 'assert';
import { GameEngine } from '../engine';
import { EventResult, GameEvent } from '../../types';

export function startGame(game: GameEngine, event: GameEvent): EventResult {
    assert(event.type === 'START_GAME', 'Invalid event type');
    if (event.playerId === game.players[0].id) {
        game.status = 'STARTED';
        game.allotCards();
        return { type: 'SUCCESS', message: 'Game started successfully' };
    } else {
        return {
            type: 'ERROR',
            message: 'Only the Host can start the game',
        };
    }
}
