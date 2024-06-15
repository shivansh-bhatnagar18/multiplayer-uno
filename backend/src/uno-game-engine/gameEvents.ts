// this module houses the handlers for various game events.

import { EventResult, GameEvent, GameEventType } from '../types';
import { type GameEngine } from './engine';
import { drawCard } from './events/drawCard';
import { joinGame } from './events/joinGame';
import { leaveGame } from './events/leaveGame';
import { throwCard } from './events/throwCard';

type GameEventHandler = (game: GameEngine, event: GameEvent) => EventResult;

const map = new Map<GameEventType, GameEventHandler>();

export function registerEventHandler(
    eventType: GameEventType,
    handler: GameEventHandler
) {
    map.set(eventType, handler);
}

export function handleEvent(game: GameEngine, event: GameEvent): EventResult {
    const handler = map.get(event.type);
    if (!handler) {
        return { type: 'ERROR', message: 'Invalid event type' };
    }
    return handler(game, event);
}

registerEventHandler('JOIN_GAME', joinGame);
registerEventHandler('LEAVE_GAME', leaveGame);
registerEventHandler('DRAW_CARD', drawCard);
registerEventHandler('THROW_CARD', throwCard);
