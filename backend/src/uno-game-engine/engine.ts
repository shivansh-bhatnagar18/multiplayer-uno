import { getShuffledCardDeck, shuffle } from './deck';
import { handleEvent } from './gameEvents';

export const NUM_CARDS_PER_PLAYER = 7;

export class GameEngine {
    cardDeck: UNOCard[];
    thrownCards: UNOCard[];
    players: Player[];
    currentPlayerIndex: number;
    lastThrownCard: UNOCard | null;
    currentColor: number;
    direction: number;
    status: 'READY' | 'STARTED';

    constructor() {
        this.cardDeck = getShuffledCardDeck();
        this.thrownCards = [];
        this.players = [];
        this.currentPlayerIndex = 0;
        this.lastThrownCard = null;
        this.currentColor = 0;
        this.direction = 1;

        this.status = 'READY';
    }
    allotCards() {
        if (this.cardDeck.length < this.players.length * NUM_CARDS_PER_PLAYER) {
            throw new Error('Not enough cards to distribute');
        }

        this.players = this.players.map((player: Player) => {
            player.cards = this.cardDeck.splice(0, NUM_CARDS_PER_PLAYER);
            return player;
        });
    }
    addPlayer(player: Player) {
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
    drawCardFromDeck(player: Player, numCards = 1): EventResult {
        try {
            if (this.cardDeck.length < numCards) {
                this.cardDeck = [...this.thrownCards];
                this.thrownCards = [];
                shuffle(this.cardDeck);
            }
            const currentPlayer = this.players.find(
                (p: Player) => p.id === player.id
            );
            if (currentPlayer && this.cardDeck) {
                const cards = this.cardDeck.splice(-numCards, numCards);
                if (cards.length > 0) {
                    currentPlayer.cards.push(...cards);
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
    dispatchEvent(event: GameEvent) {
        // handle different types of events based on event.type
        handleEvent(this, event);
    }
}
