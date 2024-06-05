import { createContext, useContext } from 'react';

type Options = {
    message?: string;
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
