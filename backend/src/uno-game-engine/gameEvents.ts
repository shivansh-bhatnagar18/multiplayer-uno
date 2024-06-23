// this module houses the handlers for various game events.

import { EventResult, GameEvent, GameEventTypes } from '../types';
import { type GameEngine } from './engine';
import { announceUNO } from './events/announceUno';
import { challengeUNO } from './events/challengeUno';
import { drawCard } from './events/drawCard';
import { joinGame } from './events/joinGame';
import { leaveGame } from './events/leaveGame';
import { startGame } from './events/startGame';
import { throwCard } from './events/throwCard';

type GameEventHandler = (game: GameEngine, event: GameEvent) => EventResult;

const map = new Map<GameEventTypes, GameEventHandler>();

export function registerEventHandler(
    eventType: GameEventTypes,
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

registerEventHandler(GameEventTypes.JOIN_GAME, joinGame);
registerEventHandler(GameEventTypes.LEAVE_GAME, leaveGame);
registerEventHandler(GameEventTypes.DRAW_CARD, drawCard);
registerEventHandler(GameEventTypes.THROW_CARD, throwCard);
registerEventHandler(GameEventTypes.ANNOUNCE_UNO, announceUNO);
registerEventHandler(GameEventTypes.CHALLENGE_UNO, challengeUNO);
registerEventHandler(GameEventTypes.START_GAME, startGame);
