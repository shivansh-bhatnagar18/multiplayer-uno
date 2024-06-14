import { useRef } from 'react';

interface ModalProps {
    onClose: () => void;
}

const RulesModal: React.FC<ModalProps> = ({ onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    return (
        <div
            ref={modalRef}
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
        >
            <div className="bg-[rgb(222,209,209)] p-5 rounded-xl border-4 border-black shadow-md flex flex-col gap-10 w-1/2 h-1/2 items-center justify-center">
                <div className="relative flex flex-col h-full overflow-y-auto">
                    <h1 className="font-normal font-[Kavoon] text-[30px] leading-[30px] text-black text-center">
                        Rules
                    </h1>
                    <div className="text-left font-[Kavoon] px-4">
                        <h2 className="font-bold text-lg">Objective:</h2>
                        <ul className="list-disc list-inside">
                            <li>Be the first to get rid of all your cards</li>
                        </ul>

                        <h2 className="font-bold text-lg mt-4">Setup:</h2>
                        <ul className="list-disc list-inside">
                            <li>
                                <b>Players:</b> 2-10.
                            </li>
                            <li>
                                <b>Deck:</b> 108 cards.
                            </li>
                            <li>
                                <b>Dealing:</b> 7 cards each, remaining cards
                                form draw pile. Top card starts discard pile.
                            </li>
                        </ul>

                        <h2 className="font-bold text-lg mt-4">Gameplay:</h2>
                        <ul className="list-disc list-inside">
                            <li>
                                <b>Turns:</b> Match a card from your hand to the
                                top card of the discard pile by color or number,
                                or play a Wild card.
                            </li>
                            <li>
                                <b>Draw:</b> If you can't play, draw one card.
                                Play it if possible; if not, turn passes.
                            </li>
                            <li>
                                <b>UNO:</b>If at any point in play you are left
                                with a single card you have to say uno.
                            </li>
                        </ul>

                        <h2 className="font-bold text-lg mt-4">
                            Action Cards:
                        </h2>
                        <ul className="list-disc list-inside">
                            <li>
                                <b>Skip:</b> Next player misses a turn.
                            </li>
                            <li>
                                <b>Reverse:</b> Reverses play direction.
                            </li>
                            <li>
                                <b>Draw Two:</b> Next player draws 2 cards and
                                misses a turn.
                            </li>
                            <li>
                                <b>Wild:</b> Choose the color to continue play.
                            </li>
                            <li>
                                <b>Wild Draw Four:</b> Choose color and next
                                player draws 4 cards.
                            </li>
                        </ul>
                        <p className="text-lg mt-4">
                            If you would like to learn more about the Rules of
                            UNO click{' '}
                            <a
                                href="https://www.unorules.com"
                                target="_blank"
                                className="underline"
                            >
                                here
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RulesModal;
