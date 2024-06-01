type CardType = 'number' | 'special' | 'wild';

type CardColor = 'red' | 'blue' | 'green' | 'yellow' | 'wild';

type SpecialCardNames = 'skip' | 'reverse' | 'draw2' | 'draw4' | 'colchange';
type CardNumbers = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type CardValue = SpecialCardNames | CardNumbers;

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
//todo: Add more events
