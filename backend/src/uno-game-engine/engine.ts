import { getShuffledCardDeck, shuffle } from './deck';
import { handleEvent } from './gameEvents';

const NUM_CARDS_PER_PLAYER = 7;

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
            (this.currentPlayerIndex + this.direction) % this.players.length;
    }
    drawCardFromDeck(player: Player): EventResult {
        try {
            if (this.cardDeck.length === 0) {
                this.cardDeck = [...this.thrownCards];
                this.thrownCards = [];
                shuffle(this.cardDeck);
            }
            const currentPlayer = this.players.find(
                (p: Player) => p.id === player.id
            );
            if (currentPlayer && this.cardDeck) {
                const card = this.cardDeck.pop();
                if (card) {
                    currentPlayer.cards.push(card);
                    return {
                        type: 'SUCCESS',
                        message: 'Card drawn successfully',
                    };
                } else
                    return { type: 'ERROR', message: 'Unable to draw a card' };
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
