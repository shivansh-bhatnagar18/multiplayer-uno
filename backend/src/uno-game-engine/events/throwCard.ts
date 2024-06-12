import { registerEventHandler } from '../gameEvents';
import { GameEngine } from '../engine';

function findPlayer(game: GameEngine, playerId: string) {
    return game.players.find((p) => p.id === playerId);
}

function findCard(player, cardId: string) {
    return player.cards.find((c) => c.id === cardId);
}

function canThrowCard(game: GameEngine, player, card): EventResult {
    const { currentPlayerIndex, players } = game;
    const currentPlayer = players[currentPlayerIndex];

    // check if the player is the current player
    if (currentPlayer.id !== player.id) {
        return { type: 'ERROR', message: 'It is not your turn' };
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
    const player = findPlayer(game, event.playerId);
    if (!player) {
        return { type: 'ERROR', message: 'Player not found' };
    }

    const card = findCard(player, event.data.card.id);
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
