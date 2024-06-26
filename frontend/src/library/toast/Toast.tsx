import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
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

type Message = {
    heading: string;
    content: string;
};

type ToastProperties = {
    message: Message;
    close: () => void;
    duration: number;
    position: string;
    color: 'info' | 'warning' | 'error' | 'success';
};

const getIconClass = (
    color: 'info' | 'warning' | 'error' | 'success'
): string => {
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
            <div className="toast-content">
                <div className="toast-icon">
                    <i className={`${iconClass} large-icon`}></i>
                </div>
                <div className="toast-message">
                    <b>{message.heading}</b>
                    <p>{message.content}</p>
                </div>
                <button className="close-button small-close" onClick={close}>
                    <i className="fa-regular fa-circle-xmark"></i>
                </button>
            </div>
        </div>
    );
}

type ToastProviderProperties = {
    children: React.ReactElement;
};

type ToastType = {
    message: Message;
    id: number;
    duration: number;
    position: string;
    color: 'info' | 'warning' | 'error' | 'success';
};

export function ToastProvider({ children }: ToastProviderProperties) {
    const [toasts, setToasts] = useState<ToastType[]>([]);
    const [position, setPosition] = useState('top-left');

    type Options = {
        message?: Message;
        duration?: number;
        position?: string;
        color?: 'info' | 'warning' | 'error' | 'success';
    };

    const openToast = useCallback(
        ({
            message = { heading: '', content: '' },
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
        setToasts((prevToasts) =>
            prevToasts.map((toast) => {
                if (toast.id === id) {
                    if (toast.position === 'top-left')
                        toast.position = 'fade-out-left';
                    else if (toast.position === 'top-right')
                        toast.position = 'fade-out-right';
                    else if (toast.position === 'top-center')
                        toast.position = 'fade-out-center';
                }
                return toast;
            })
        );

        setTimeout(() => {
            setToasts((prevToasts) =>
                prevToasts.filter((toast) => toast.id !== id)
            );
        }, 300);
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
                {toasts.map((toast) => (
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
