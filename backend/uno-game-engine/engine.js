import getShuffledCardDeck from "./deck";
import shuffle from "./desk";
const NUM_CARDS_PER_PLAYER = 7;
export class GameEngine{
    constructor(){
        this.cardDeck = getShuffledCardDeck();
        this.thrownCards = [];
        this.players= [];
        this.currentPlayerIndex = 0;
        this.lastThrownCard = null;
        this.currentColor = 0;
        this.direction = 1;

        this.status = "READY"

    }
    allotCards(){
        //todo: Implement the card allotment logic: Remove `NUM_CARDS_PER_PLAYER` cards from the deck
        // and add them to the player's hand - Do this for each player
        // example:
        this.players[0].cards = this.cardDeck.splice(0, NUM_CARDS_PER_PLAYER);
    }
    addPlayer(player){
        this.players.push(player);
    }
    startGame(){
        if(this.players.length < 2){
            throw new Error("Not enough players to start the game")
        }
        this.status = "STARTED"
    }
    nextPlayer(){
        this.currentPlayerIndex = (this.currentPlayerIndex + this.direction) % this.players.length;
    }
    drawCardFromDeck(player) {
        if (this.cardDeck.length === 0) {
            const thrown = this.thrownCards.pop();
            this.cardDeck = this.thrownCards;
            this.thrownCards = [thrown];
            shuffle(this.cardDeck);
        }
        this.players.find(p => p.id === player.id).cards.push(this.cardDeck.pop());
    }
}