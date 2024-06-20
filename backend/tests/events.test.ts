import { CardNumber, GameEventTypes } from '../src/types';
import { GameEngine } from '../src/uno-game-engine/engine';
import { announceUNO } from '../src/uno-game-engine/events/announceUno';
import { drawCard } from '../src/uno-game-engine/events/drawCard';
import { getPlayer } from '../src/uno-game-engine/events/eventHandlerUtils';
import { throwCard } from '../src/uno-game-engine/events/throwCard';
import { generateMockPlayers } from './engine.test';

export const initializeMockGame = (
    game: GameEngine,
    numPlayers: number,
    numCards: number,
    currentPlayerIndex: number
) => {
    generateMockPlayers(numPlayers).forEach((player, index) => {
        game.addPlayer(player);
        for (let i = 1; i <= numCards; i++) {
            player.cards.push({
                type: 'number',
                color: 'yellow',
                value: `${index}` as CardNumber,
                id: `card-number-yellow-${index}-${i}`,
            });
        }
    });
    game.currentPlayerIndex = currentPlayerIndex;
};

describe('Events', () => {
    let game: GameEngine;

    beforeEach(() => {
        game = new GameEngine('dummyGame');
    });

    test('Announce UNO when player has only two cards and at least one of them is throwable', () => {
        // when player announces UNO first, then throws a card
        initializeMockGame(game, 3, 2, 1);
        const AnnounceStatus = announceUNO(game, {
            type: GameEventTypes.ANNOUNCE_UNO,
            playerId: '1',
        });

        // after announcing UNO the player is no more vulnerable
        expect(AnnounceStatus.type).toBe('SUCCESS');
        expect(game.runningEvents.hasAnnouncedUNO).toBe(getPlayer(game, '1'));
        expect(game.runningEvents.vulnerableToUNO).toBe(null);

        const throwStatus = throwCard(game, {
            type: GameEventTypes.THROW_CARD,
            playerId: '1',
            data: { cardId: 'card-number-yellow-1-1' },
        });

        expect(throwStatus.type).toBe('SUCCESS');
        expect(game.runningEvents.hasAnnouncedUNO).toBe(null);
        expect(game.runningEvents.vulnerableToUNO).toBe(null);
    });

    test('Announce UNO when player has only two cards and at least one of them is throwable', () => {
        // when player throws a card first, then announces UNO
        initializeMockGame(game, 3, 2, 1);
        const throwStatus = throwCard(game, {
            type: GameEventTypes.THROW_CARD,
            playerId: '1',
            data: { cardId: 'card-number-yellow-1-1' },
        });

        expect(throwStatus.type).toBe('SUCCESS');
        expect(game.runningEvents.hasAnnouncedUNO).toBe(null);
        expect(game.runningEvents.vulnerableToUNO).toBe(getPlayer(game, '1'));

        const AnnounceStatus = announceUNO(game, {
            type: GameEventTypes.ANNOUNCE_UNO,
            playerId: '1',
        });

        // after announcing UNO the player is no more vulnerable
        expect(AnnounceStatus.type).toBe('SUCCESS');
        expect(game.runningEvents.hasAnnouncedUNO).toBe(getPlayer(game, '1'));
        expect(game.runningEvents.vulnerableToUNO).toBe(null);
    });

    test('Player did not announce UNO, and the next player threw a card without catching him', () => {
        initializeMockGame(game, 3, 2, 1);
        const throwStatus1 = throwCard(game, {
            type: GameEventTypes.THROW_CARD,
            playerId: '1',
            data: { cardId: 'card-number-yellow-1-1' },
        });

        expect(throwStatus1.type).toBe('SUCCESS');
        expect(game.runningEvents.hasAnnouncedUNO).toBe(null);
        expect(game.runningEvents.vulnerableToUNO).toBe(getPlayer(game, '1'));

        const throwStatus2 = throwCard(game, {
            type: GameEventTypes.THROW_CARD,
            playerId: '2',
            data: { cardId: 'card-number-yellow-2-1' },
        });
        expect(throwStatus2.type).toBe('SUCCESS');
        expect(game.runningEvents.hasAnnouncedUNO).toBe(null);
        expect(game.runningEvents.vulnerableToUNO).not.toBe(
            getPlayer(game, '1')
        );
    });

    test('Player did not announce UNO, and the next player drew a card without catching him', () => {
        initializeMockGame(game, 3, 2, 1);
        const throwStatus = throwCard(game, {
            type: GameEventTypes.THROW_CARD,
            playerId: '1',
            data: { cardId: 'card-number-yellow-1-1' },
        });

        expect(throwStatus.type).toBe('SUCCESS');
        expect(game.runningEvents.hasAnnouncedUNO).toBe(null);
        expect(game.runningEvents.vulnerableToUNO).toBe(getPlayer(game, '1'));

        const drawStatus = drawCard(game, {
            type: GameEventTypes.DRAW_CARD,
            playerId: '2',
        });
        expect(drawStatus.type).toBe('SUCCESS');
        expect(game.runningEvents.hasAnnouncedUNO).toBe(null);
        expect(game.runningEvents.vulnerableToUNO).not.toBe(
            getPlayer(game, '1')
        );
    });
});
