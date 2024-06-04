import { GameEngine } from '../src/uno-game-engine/engine';

describe('testing drawCardFromDeck()', () => {
    test('draws a card when deck is empty but thrownCards is not', () => {
        const game = new GameEngine();
        game.addPlayer({ id: '1', cards: [] });
        game.cardDeck = [];
        game.thrownCards = [
            {
                type: 'number',
                color: 'yellow',
                value: '1',
                id: 'card-number-yellow-1-1',
            },
        ];
        const player = game.players[0];
        const status: EventResult = game.drawCardFromDeck(player);
        expect(player.cards.length).toBe(1);
        expect(status.type).toBe('SUCCESS');
    });
});
