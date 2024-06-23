import assert from 'assert';
import { EventResult, GameEvent, GamePlayer } from '../../types';
import { GameEngine } from '../engine';
import { getPlayer } from './eventHandlerUtils';

export function canChallengeUNO(
    game: GameEngine,
    player: GamePlayer
): EventResult {
    if (game.runningEvents.vulnerableToUNO !== player) {
        return {
            type: 'ERROR',
            message: 'Cannot challenge this player',
        };
    }

    return { type: 'SUCCESS', message: 'Can challenge UNO' };
}

export function challengeUNO(game: GameEngine, event: GameEvent): EventResult {
    assert(event.type === 'CHALLENGE_UNO', 'Invalid event type');
    const player = getPlayer(game, event.data.challengedPlayerId);
    if (!player) {
        return { type: 'ERROR', message: 'Player not found' };
    }

    const canChallenge = canChallengeUNO(game, player);
    if (canChallenge.type === 'ERROR') {
        return canChallenge;
    }

    // draw two cards as penalty
    // drawCardFromDeck() will set vulnerableToUNO to null
    const drawPenaltyCards = game.drawCardFromDeck(player, 2);
    if (drawPenaltyCards.type === 'ERROR') {
        return drawPenaltyCards;
    }

    return { type: 'SUCCESS', message: 'UNO challenged successfully' };
}
