import React, { useEffect, useRef } from 'react';
import { useModal } from './ModalContext';
import Button from '../button';

type ModalContainerProps = {
    content: React.ReactNode;
    buttons: button[];
    size: 'small' | 'large';
};

type button = {
    text: string;
    onClick: () => void;
    type: 'submit' | 'reset' | 'button';
};

const Modal: React.FC<ModalContainerProps> = ({ content, buttons, size }) => {
    const { hide } = useModal();
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current === e.target) {
            hide();
        }
    };

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                hide();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [hide]);
    let modalClass =
        'bg-[rgb(222,209,209)] p-5 rounded-xl border-4 border-black shadow-md flex flex-col gap-10 w-1/2 h-1/2 items-center justify-center';
    if (size === 'small') {
        modalClass =
            'bg-[rgb(222,209,209)] p-5 rounded-xl border-4 border-black shadow-md flex flex-col gap-10 w-1/3 h-1/3 items-center justify-center';
    }

    return (
        <>
            <div
                ref={modalRef}
                onClick={closeModal}
                className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
            >
                <div className={modalClass}>
                    {content}
                    {buttons.map((button) => {
                        return (
                            <Button key={button.text} type={button.type}>
                                {button.text}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Modal;
