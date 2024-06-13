import {
    checkCurrentPlayer,
    getPlayer,
    getPlayerCard,
    registerEventHandler,
} from '../gameEvents';
import { GameEngine } from '../engine';
import assert from 'assert';

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
    // check if the player actually possesses the card
    if (!player.cards.some((c) => c.id === card.id)) {
        return { type: 'ERROR', message: 'Player does not possess the card' };
    }

    // check if the card can be thrown
    if (
        game.lastThrownCard &&
        !(
            game.lastThrownCard.color === card.color ||
            game.lastThrownCard.value === card.value ||
            card.color === 'wild'
        )
    ) {
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

    player.cards = player.cards.filter((c) => c.id !== card.id);

    game.thrownCards.push(card);
    game.lastThrownCard = card;

    game.nextPlayer();

    // handle special cards
    if (card.type === 'special') {
        handleSpecialCard(game, card);
    }

    return { type: 'SUCCESS', message: 'Card thrown successfully' };
}

function handleSpecialCard(game: GameEngine, card: UNOCard) {
    switch (card.value) {
        case 'skip':
            game.nextPlayer();
            break;
        case 'reverse':
            game.direction *= -1;
            break;
        case 'draw2':
            {
                const nextPlayer = game.players[game.currentPlayerIndex];
                game.drawCardFromDeck(nextPlayer, 2);
            }
            break;
        case 'draw4':
            {
                const currentPlayer = game.players[game.currentPlayerIndex];
                game.drawCardFromDeck(currentPlayer, 4);
            }
            break;
        default:
            break;
    }
}

registerEventHandler('THROW_CARD', throwCard);
