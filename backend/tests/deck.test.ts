import {
    shuffle,
    makeCard,
    getShuffledCardDeck,
} from '../src/uno-game-engine/deck';

describe('getShuffledCardDeck', () => {
    test('should return an array of 108 cards', () => {
        const deck = getShuffledCardDeck();
        expect(deck.length).toBe(108);
        {
            // Check the number of cards of each type
            const numberCards = deck.filter((card) => card.type === 'number');
            expect(numberCards.length).toBe(76);

            const specialCards = deck.filter((card) => card.type === 'special');
            expect(specialCards.length).toBe(24);

            const wildCards = deck.filter((card) => card.type === 'wild');
            expect(wildCards.length).toBe(8);
        }
        {
            // Check the number of cards of red color
            const redCards = deck.filter((card) => card.color === 'red');
            expect(redCards.length).toBe(25); // 25 * 4 = 100 color cards
        }
        {
            // Check the number of cards of 0 and 1 values
            const zeroValueCards = deck.filter((card) => card.value === '0');
            expect(zeroValueCards.length).toBe(4);

            const oneValueCards = deck.filter((card) => card.value === '1');
            expect(oneValueCards.length).toBe(8);
        }
        {
            // Check the number of cards of special type
            const skipCards = deck.filter((card) => card.value === 'skip');
            expect(skipCards.length).toBe(8);

            const draw2Cards = deck.filter((card) => card.value === 'draw2');
            expect(draw2Cards.length).toBe(8);

            const reverseCards = deck.filter(
                (card) => card.value === 'reverse'
            );
            expect(reverseCards.length).toBe(8);
        }
        {
            // Check the number of cards of wild type
            const wildCards = deck.filter((card) => card.value === 'colchange');
            expect(wildCards.length).toBe(4);

            const draw4Cards = deck.filter((card) => card.value === 'draw4');
            expect(draw4Cards.length).toBe(4);
        }
    });
});

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
