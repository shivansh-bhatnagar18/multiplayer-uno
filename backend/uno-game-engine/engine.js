import getShuffledCardDeck from './deck';

const NUM_CARDS_PER_PLAYER = 7;
export class GameEngine {
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

        this.players = this.players.map(player => {
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
        //todo: Handle the case when the deck is empty and we have to move the thrown cards back to the deck
        this.players
            .find((p) => p.id === player.id)
            .cards.push(this.cardDeck.pop());
    }
}
