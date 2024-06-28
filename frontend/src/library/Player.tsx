import React from 'react';

interface Player {
    name: string;
    cards: { length: number };
}

interface PlayerProps {
    player: Player;
    highlighted: boolean;
    positionStyle: React.CSSProperties;
}

const Player: React.FC<PlayerProps> = ({
    player,
    highlighted,
    positionStyle,
}) => {
    return (
        <div
            className="absolute flex flex-col items-center justify-center bg-player-icon-bg"
            style={{
                ...positionStyle,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                width: '70px',
                height: '80px',
                zIndex: 2,
                filter: highlighted ? 'brightness(1.5)' : 'none',
            }}
        >
            <div
                className="player-cards font-[Kavoon] text-gray-900 mt-[96px] text-[12px]"
                style={{ marginLeft: '-8px' }}
            >
                {player.cards.length}
            </div>
            <div
                className="player-name font-[Kavoon] mb-2 text-[14px] text-black bg-gray-400 rounded-lg shadow-md"
                style={{ marginLeft: '-8px' }}
            >
                {player.name}
            </div>
        </div>
    );
};

export default Player;
