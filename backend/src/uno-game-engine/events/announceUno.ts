// The game continues until a player has one or two card(s) left.
// Once a player has two cards, they can announce "UNO!".
// The announcement of "UNO" needs to be repeated every time the player is left with one or two cards.
import assert from 'assert';
import {
    EventResult,
    GameEvent,
    GameEventTypes,
    GamePlayer,
} from '../../types';
import { GameEngine } from '../engine';
import { getPlayer, getThrowableCards } from './eventHandlerUtils';

export function canAnnounceUNO(
    game: GameEngine,
    player: GamePlayer
): EventResult {
    const throwableCards = getThrowableCards(game, player);
    if (
        player.cards.length > 2 ||
        (player.cards.length === 2 && !throwableCards)
    ) {
        return { type: 'ERROR', message: 'Cannot announce UNO' };
    }

    return { type: 'SUCCESS', message: 'Can announce UNO' };
}

export function announceUNO(game: GameEngine, event: GameEvent): EventResult {
    assert(event.type === GameEventTypes.ANNOUNCE_UNO, 'Invalid event type');
    const player = getPlayer(game, event.playerId);
    if (!player) {
        return { type: 'ERROR', message: 'Player not found' };
    }

    const canAnnounce = canAnnounceUNO(game, player);

    if (canAnnounce.type === 'ERROR') {
        return canAnnounce;
    }

    // if the player has announced UNO, they are no longer vulnerable to UNO
    game.runningEvents.hasAnnouncedUNO = player;
    game.runningEvents.vulnerableToUNO = null;

    return { type: 'SUCCESS', message: 'UNO announced successfully' };
}
