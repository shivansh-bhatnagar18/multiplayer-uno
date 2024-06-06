"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameEngine = void 0;
const deck_1 = require("./deck");
const gameEvents_1 = require("./gameEvents");
const NUM_CARDS_PER_PLAYER = 7;
class GameEngine {
    constructor() {
        this.cardDeck = (0, deck_1.getShuffledCardDeck)();
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
        this.players = this.players.map((player) => {
            player.cards = this.cardDeck.splice(0, NUM_CARDS_PER_PLAYER);
            return player;
        });
    }
    addPlayer(player) {
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
    drawCardFromDeck(player) {
        try {
            if (this.cardDeck.length === 0) {
                this.cardDeck = [...this.thrownCards];
                this.thrownCards = [];
                (0, deck_1.shuffle)(this.cardDeck);
            }
            const currentPlayer = this.players.find((p) => p.id === player.id);
            if (currentPlayer && this.cardDeck) {
                const card = this.cardDeck.pop();
                if (card) {
                    currentPlayer.cards.push(card);
                    return {
                        type: 'SUCCESS',
                        message: 'Card drawn successfully',
                    };
                }
                else
                    return { type: 'ERROR', message: 'Unable to draw a card' };
            }
            else {
                return {
                    type: 'ERROR',
                    message: 'Player not found or cardDeck is empty',
                };
            }
        }
        catch (error) {
            return { type: 'ERROR', message: error.message };
        }
    }
    dispatchEvent(event) {
        // handle different types of events based on event.type
        (0, gameEvents_1.handleEvent)(this, event);
    }
}
exports.GameEngine = GameEngine;
