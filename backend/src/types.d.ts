// We declare those types which are used throughout the application here.
// For types that are used only in one file, we can declare them in that file itself.

type CardType = 'number' | 'special' | 'wild';

type CardColor = 'red' | 'blue' | 'green' | 'yellow' | 'wild';

type SpecialCardName = 'skip' | 'reverse' | 'draw2' | 'draw4' | 'colchange';
type CardNumber = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type CardValue = SpecialCardName | CardNumber;

type UNOCard = {
    type: CardType;
    color: CardColor;
    value: CardValue;
    id: string;
};

type Player = {
    id: string;
    cards: UNOCard[];
};

type EventResult = {
    type: 'SUCCESS' | 'ERROR';
    message: string;
};

type GameEventType = 'DRAW_CARD' | 'THROW_CARD';

type GameEvent =
    | {
          type: 'DRAW_CARD';
          playerId: string;
          data: {
              card: UNOCard;
          };
      }
    | {
          type: 'THROW_CARD';
          playerId: string;
          data: {
              card: UNOCard;
          };
      };

// Represent all the events that can be sent to the client
type AppEvent = GameEvent;
//todo: Add more events
