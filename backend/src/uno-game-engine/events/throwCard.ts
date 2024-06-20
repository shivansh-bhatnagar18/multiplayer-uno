import { GameEngine } from '../engine';
import assert from 'assert';
import { EventResult, GameEvent, Player, UNOCard } from '../../types';
import {
    checkCurrentPlayer,
    getPlayer,
    getPlayerCard,
    getThrowableCards,
} from './eventHandlerUtils';

export function canThrowCard(
    game: GameEngine,
    player: Player,
    card: UNOCard
): EventResult {
    // check if the player is the current player
    const canThrow = checkCurrentPlayer(game, player);
    if (canThrow.type === 'ERROR') {
        return canThrow;
    }

    const throwableCards = getThrowableCards(game, player);
    if (!throwableCards.find((c) => c.id === card.id)) {
        return { type: 'ERROR', message: 'Cannot throw this card' };
    }

    return { type: 'SUCCESS', message: 'Can throw card' };
}

export function throwCard(game: GameEngine, event: GameEvent): EventResult {
    // validate the event so that typescript knows that event is of type 'THROW_CARD'
    assert(event.type === 'THROW_CARD', 'Invalid event type');
    const player = getPlayer(game, event.playerId);
    if (!player) {
        return { type: 'ERROR', message: 'Player not found' };
    }

    const card = getPlayerCard(player, event.data.cardId);
    if (!card) {
        return { type: 'ERROR', message: 'Card not found' };
    }

    const canThrow = canThrowCard(game, player, card);
    if (canThrow.type === 'ERROR') {
        return canThrow;
    }

    // make the last player no longer vulnerable to UNO
    game.runningEvents.vulnerableToUNO = null;

    player.cards = player.cards.filter((c) => c.id !== card.id);

    // After throwing a card, check if the player has one card and forgot to announce UNO
    if (
        player.cards.length === 1 &&
        game.runningEvents.hasAnnouncedUNO !== player
    ) {
        game.runningEvents.vulnerableToUNO = player;
    }

    game.runningEvents.hasAnnouncedUNO = null;
    game.thrownCards.push(card);
    game.lastThrownCard = card;

    // handle special cards
    if (card.type === 'special') {
        handleSpecialCard(game, card);
    }

    game.nextPlayer();

    return { type: 'SUCCESS', message: 'Card thrown successfully' };
}

function handleSpecialCard(game: GameEngine, card: UNOCard) {
    const nextPlayerIndex =
        (game.currentPlayerIndex + game.direction) % game.players.length;
    switch (card.value) {
        case 'skip':
            game.nextPlayer();
            break;
        case 'reverse':
            game.direction *= -1;
            break;
        case 'draw2':
            {
                const nextPlayer = game.players[nextPlayerIndex];
                game.drawCardFromDeck(nextPlayer, 2);
            }
            break;
        case 'draw4':
            {
                const currentPlayer = game.players[nextPlayerIndex];
                game.drawCardFromDeck(currentPlayer, 4);
            }
            break;
        default:
            break;
    }
}
