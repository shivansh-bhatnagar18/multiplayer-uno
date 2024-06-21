import { GameEngine } from '../engine';
import assert from 'assert';
import { canThrowCard, throwCard } from './throwCard';
import { EventResult, GameEvent, GameEventTypes } from '../../types';
import { checkCurrentPlayer, getPlayer } from './eventHandlerUtils';

export function drawCard(game: GameEngine, event: GameEvent): EventResult {
    // validate the event so that typescript knows that event is of type 'DRAW_CARD'
    assert(event.type === 'DRAW_CARD', 'Invalid event type');
    const player = getPlayer(game, event.playerId);
    if (!player) {
        return { type: 'ERROR', message: 'Player not found' };
    }

    const canDraw = checkCurrentPlayer(game, player);
    if (canDraw.type === 'ERROR') {
        return canDraw;
    }

    const drawResult = game.drawCardFromDeck(player, 1);
    if (drawResult.type === 'ERROR') {
        return drawResult;
    }

    const drawnCard = player.cards[player.cards.length - 1]; // Last drawn card

    // Check if the drawn card can be thrown
    const canThrow = canThrowCard(game, player, drawnCard);
    if (canThrow.type === 'SUCCESS') {
        throwCard(game, {
            type: GameEventTypes.THROW_CARD,
            playerId: player.id,
            data: {
                cardId: drawnCard.id,
            },
        });
        return {
            type: 'SUCCESS',
            message: 'Card drawn and thrown successfully',
        };
    } else {
        // Move to the next player if the card cannot be thrown
        game.nextPlayer();
        return {
            type: 'SUCCESS',
            message: 'Card drawn successfully, but cannot be thrown',
        };
    }
}
