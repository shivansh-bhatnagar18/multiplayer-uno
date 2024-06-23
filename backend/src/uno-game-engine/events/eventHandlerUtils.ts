// some utility functions shared by event handlers

import { GamePlayer, EventResult } from '../../types';
import { GameEngine } from '../engine';

export function getPlayer(game: GameEngine, playerId: string) {
    return game.players.find((p) => p.id === playerId);
}

export function getPlayerCard(player: GamePlayer, cardId: string) {
    return player.cards.find((c) => c.id === cardId);
}

export function getThrowableCards(game: GameEngine, player: GamePlayer) {
    // get the cards that the player can throw
    const { lastThrownCard } = game;
    const throwableCards = player.cards.filter((card) => {
        return (
            !lastThrownCard ||
            card.color === lastThrownCard.color ||
            card.value === lastThrownCard.value ||
            card.type === 'wild'
        );
    });

    return throwableCards;
}

export function checkCurrentPlayer(
    game: GameEngine,
    player: GamePlayer
): EventResult {
    const { currentPlayerIndex, players } = game;
    const currentPlayer = players[currentPlayerIndex];

    // check if the player is the current player
    if (currentPlayer.id !== player.id) {
        return { type: 'ERROR', message: 'It is not your turn' };
    }

    return {
        type: 'SUCCESS',
        message: 'Player is the current player',
    };
}
