// some utility functions shared by event handlers

import { Player, EventResult } from '../../types';
import { GameEngine } from '../engine';

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
