import { makeCard } from '../uno-game-engine/deck';
describe('testing deck.ts', () => {
    test('makeCard', () => {
        const card = makeCard('number', 'blue', '3');
        expect(card.color).toBe('blue');
    });
});
