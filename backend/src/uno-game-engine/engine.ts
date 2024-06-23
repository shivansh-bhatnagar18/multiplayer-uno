import type {
    EventResult,
    GameEvent,
    GamePlayer,
    GameStatus,
    RunningEvents,
    UNOCard,
} from '../types';
import { getShuffledCardDeck, shuffle } from './deck';
import { handleEvent } from './gameEvents';

export const NUM_CARDS_PER_PLAYER = 7;

export class GameEngine {
    id: string;
    cardDeck: UNOCard[];
    thrownCards: UNOCard[];
    players: GamePlayer[];
    currentPlayerIndex: number;
    lastThrownCard: UNOCard | null;
    direction: number;
    status: GameStatus;
    runningEvents: RunningEvents;

    constructor(id: string) {
        this.id = id;
        this.cardDeck = getShuffledCardDeck();
        this.thrownCards = [];
        this.players = [];
        this.currentPlayerIndex = 0;
        this.lastThrownCard = null;
        this.direction = 1;
        this.runningEvents = {
            vulnerableToUNO: null,
            hasAnnouncedUNO: null,
        };

        this.status = 'READY';
    }
    allotCards() {
        if (this.cardDeck.length < this.players.length * NUM_CARDS_PER_PLAYER) {
            throw new Error('Not enough cards to distribute');
        }

        this.players = this.players.map((player: GamePlayer) => {
            player.cards = this.cardDeck.splice(0, NUM_CARDS_PER_PLAYER);
            return player;
        });
    }
    addPlayer(player: GamePlayer) {
        this.players.push(player);
    }
    startGame() {
        if (this.players.length < 2) {
            throw new Error('Not enough players to start the game');
        }
        this.status = 'STARTED';
    }
    nextPlayer() {
        this.currentPlayerIndex =
            (this.players.length + this.currentPlayerIndex + this.direction) %
            this.players.length;
    }
    removePlayer(player: GamePlayer) {
        this.cardDeck.push(...player.cards);
        shuffle(this.cardDeck);
        const index = this.players.indexOf(player);
        this.players.splice(index, 1);
    }

    drawCardFromDeck(player: GamePlayer, numCards = 1): EventResult {
        try {
            if (this.cardDeck.length < numCards) {
                this.cardDeck = [...this.thrownCards];
                this.thrownCards = [];
                shuffle(this.cardDeck);
            }
            const currentPlayer = this.players.find(
                (p: GamePlayer) => p.id === player.id
            );
            if (currentPlayer && this.cardDeck) {
                const cards = this.cardDeck.splice(-numCards, numCards);
                if (cards.length > 0) {
                    currentPlayer.cards.push(...cards);

                    // make the last player no longer vulnerable to UNO
                    this.runningEvents.vulnerableToUNO = null;
                    return {
                        type: 'SUCCESS',
                        message: `${numCards} card(s) drawn successfully`,
                    };
                } else
                    return {
                        type: 'ERROR',
                        message: `Unable to draw ${numCards} card(s)`,
                    };
            } else {
                return {
                    type: 'ERROR',
                    message: 'Player not found or cardDeck is empty',
                };
            }
        } catch (error) {
            return { type: 'ERROR', message: (error as Error).message };
        }
    }
    dispatchEvent(event: GameEvent): EventResult {
        // handle different types of events based on event.type
        return handleEvent(this, event);
    }
}
