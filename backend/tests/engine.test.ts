import { EventResult, GamePlayer } from '../src/types';
import {
    GameEngine,
    NUM_CARDS_PER_PLAYER,
} from '../src/uno-game-engine/engine';

export function generateMockPlayers(numPlayers: number) {
    const players: GamePlayer[] = [];
    for (let i = 0; i < numPlayers; i++) {
        players.push({ id: i.toString(), cards: [] });
    }
    return players;
}

describe('GameEngine', () => {
    let game: GameEngine;

    beforeEach(() => {
        game = new GameEngine('dummygame');
    });

    test('draws a card when deck is empty but thrownCards is not', () => {
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

    test('allotCards() throws an error when there are not enough cards to distribute', () => {
        const MAX_CARDS = 108;
        const MAXIMUM_PLAYERS = Math.ceil(MAX_CARDS / NUM_CARDS_PER_PLAYER) + 1;
        game.players = generateMockPlayers(MAXIMUM_PLAYERS);
        expect(() => game.allotCards()).toThrow(
            'Not enough cards to distribute'
        );
    });

    test('addPlayer() adds a player to the game', () => {
        game.addPlayer({ id: '1', cards: [] });
        expect(game.players.length).toBe(1);
    });

    test('startGame() throws an error when there are not enough players', () => {
        expect(() => game.startGame()).toThrow(
            'Not enough players to start the game'
        );
    });

    test('startGame() changes the status to STARTED when there are enough players', () => {
        game.players = generateMockPlayers(2);
        game.startGame();
        expect(game.status).toBe('STARTED');
    });

    test('nextPlayer() changes the current player index', () => {
        game.players = generateMockPlayers(2);

        // Initial player index is 0, so next player should be 1
        game.nextPlayer();
        expect(game.currentPlayerIndex).toBe(1);

        // As only 2 players are there, next player should loop back to 0
        game.nextPlayer();
        expect(game.currentPlayerIndex).toBe(0);
    });

    test('drawCardFromDeck() draws a card from the deck', () => {
        game.players = generateMockPlayers(2);
        const player = game.players[0];
        const status = game.drawCardFromDeck(player);
        expect(game.cardDeck.length).toBe(107);
        expect(player.cards.length).toBe(1);
        expect(status.type).toBe('SUCCESS');

        expect(game.cardDeck).not.toContain(player.cards[0]);
    });

    test('drawCardFromDeck() returns an error when the player is not found', () => {
        const status = game.drawCardFromDeck({
            id: '1',
            cards: [],
        });
        expect(status.type).toBe('ERROR');
        expect(status.message).toBe('Player not found or cardDeck is empty');
    });
});
