// this module houses the handlers for various game events.

import { type GameEngine } from './engine';

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

// some utility functions shared by event handlers

export function getPlayer(game: GameEngine, playerId: string) {
    return game.players.find((p) => p.id === playerId);
}

export function getPlayerCard(player: Player, cardId: string) {
    return player.cards.find((c) => c.id === cardId);
}

export function checkCurrentPlayer(
    game: GameEngine,
    player: Player
): EventResult {
    const { currentPlayerIndex, players } = game;
    const currentPlayer = players[currentPlayerIndex];

    // check if the player is the current player
    if (currentPlayer.id !== player.id) {
        return { type: 'ERROR', message: 'It is not your turn' };
    }

    return { type: 'SUCCESS', message: 'Can draw/throw card' };
}
