import { shuffle, makeCard } from '../uno-game-engine/deck';
describe('testing deck.ts', () => {
    test('makeCard', () => {
        const card = makeCard('number', 'blue', '3');
        expect(card.color).toBe('blue');
    });
});
describe('shuffle function', () => {
    test('should change order of elements', () => {
        // Create a mock deck
        const deck = [
            makeCard('number', 'red', '1'),
            makeCard('number', 'blue', '2'),
            makeCard('number', 'red', '1'),
            makeCard('number', 'yellow', '1'),
        ];

        // Create a copy of the deck for comparison
        const originalDeck = [...deck];
        shuffle(deck);

        // Check that the order of elements has changed
        const orderChanged = deck.some(
            (card, index) => card !== originalDeck[index]
        );
        expect(orderChanged).toBe(true);
    });
});
