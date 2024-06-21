import React, { useEffect, useRef } from 'react';
import { ModalButtonArgs, useModal } from './ModalContext';
import Button from '../button';

type ModalContainerProps = {
    content: React.ReactNode;
    buttons: ModalButtonArgs[];
    size: 'small' | 'large';
    closeOnBlurClick?: boolean; // Add close prop
};

const Modal: React.FC<ModalContainerProps> = ({
    content,
    buttons,
    size,
    closeOnBlurClick = true,
}) => {
    const { hide } = useModal();
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (closeOnBlurClick && modalRef.current === e.target) {
            hide();
        }
    };

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (closeOnBlurClick && event.key === 'Escape') {
                hide();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [hide, closeOnBlurClick]);
    let modalClass =
        'bg-[rgb(222,209,209)] p-5 rounded-xl border-4 border-black shadow-md flex flex-col gap-10 items-center justify-center';

    if (size === 'small') {
        modalClass += ' w-11/12 h-1/2 sm:w-1/2 sm:h-1/2 md:w-1/3 md:h-1/3';
    } else if (size === 'large') {
        modalClass += ' w-11/12 h-3/4 sm:w-2/3 sm:h-2/3 md:w-1/2 md:h-1/2';
    }
    return (
        <>
            <div
                ref={modalRef}
                onClick={closeModal}
                className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto z-30 "
            >
                <div className={modalClass}>
                    {content}
                    {buttons.map((button) => {
                        return (
                            <Button
                                key={button.text}
                                type={button.type}
                                onClick={() => {
                                    button.onClick?.();
                                    hide();
                                }}
                            >
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
