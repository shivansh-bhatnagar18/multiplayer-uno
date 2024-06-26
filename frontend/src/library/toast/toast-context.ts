import { createContext, useContext } from 'react';

type Message = {
    heading: string;
    content: string;
};

type Options = {
    message?: Message;
    duration?: number;
    position?: string;
    color?: 'info' | 'warning' | 'error' | 'success';
};

type ToastContextValue = {
    open: (options?: Options) => void;
    close: (id: number) => void;
};

export const ToastContext = createContext<ToastContextValue>({
    open: () => {},
    close: () => {},
});

export const useToast = () => useContext(ToastContext);
