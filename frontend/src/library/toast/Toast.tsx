import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ToastContext } from './toast-context';
import './toast.css';

function useTimeout(callback: () => void, duration: number) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const functionId = setTimeout(() => savedCallback.current(), duration);

        return () => {
            clearTimeout(functionId);
        };
    }, [duration]);
}

type ToastProperties = {
    message: string;
    close: () => void;
    duration: number;
    position: string;
    color: 'info' | 'warning' | 'error' | 'success';
};

const getIconClass = (color: 'info' | 'warning' | 'error' | 'success'): string => {
    switch (color) {
        case 'info':
            return 'fa-solid fa-circle-info';
        case 'warning':
            return 'fa-solid fa-triangle-exclamation';
        case 'error':
            return 'fa-solid fa-times-circle';
        case 'success':
            return 'fa-solid fa-check-circle';
        default:
            return '';
    }
};

export function Toast({
    message,
    close,
    duration,
    position,
    color,
}: ToastProperties) {
    useTimeout(() => {
        close();
    }, duration);

    const iconClass = getIconClass(color);

    return (
        <div className={`toast ${position}-animation ${color}`}>
            <p>
                <i className={iconClass} style={{ marginRight: '8px' }}></i>
                {message}
            </p>
            <button className="close-button" onClick={close}>
                <i className="fa-regular fa-circle-xmark"></i>
            </button>
        </div>
    );
}

type ToastProviderProperties = {
    children: React.ReactElement;
};

type ToastType = {
    message: string;
    id: number;
    duration: number;
    position: string;
    color: 'info' | 'warning' | 'error' | 'success';
};

export function ToastProvider({ children }: ToastProviderProperties) {
    const [toasts, setToasts] = useState<ToastType[]>([]);
    const [position, setPosition] = useState('top-left');

    type Options = {
        message?: string;
        duration?: number;
        position?: string;
        color?: 'info' | 'warning' | 'error' | 'success';
    };

    const openToast = useCallback(
        ({
            message = '',
            duration = 5000,
            position = 'top-center',
            color = 'info',
        }: Options = {}) => {
            const newToast: ToastType = {
                message,
                id: Date.now(),
                duration,
                position,
                color,
            };
            setToasts((prevToast) => [...prevToast, newToast]);
            setPosition(position);
        },
        []
    );

    const closeToast = useCallback((id: number) => {
        setTimeout(() => {
            setToasts((prevToasts) =>
                prevToasts.filter((toast) => toast.id !== id)
            );
        }, 300);

        setToasts((toasts) => {
            return toasts.map((toast) => {
                if (toast.id === id) {
                    if (toast.position === 'top-left')
                        toast.position = 'fade-out-left';
                    else if (toast.position === 'top-right')
                        toast.position = 'fade-out-right';
                    else if (toast.position === 'top-center')
                        toast.position = 'fade-out-center';
                }
                return toast;
            });
        });
    }, []);

    const contextValue = useMemo(
        () => ({
            open: openToast,
            close: closeToast,
        }),
        [openToast, closeToast]
    );

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <div className={`toasts ${position}`}>
                {toasts &&
                    toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            message={toast.message}
                            close={() => closeToast(toast.id)}
                            duration={toast.duration}
                            position={toast.position}
                            color={toast.color}
                        />
                    ))}
            </div>
        </ToastContext.Provider>
    );
}
