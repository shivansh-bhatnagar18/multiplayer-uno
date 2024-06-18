import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToastProvider } from './library/toast/Toast.tsx';
import { ModalProvider } from './library/modal/ModalContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ModalProvider>
        <ToastProvider>
            <App />
        </ToastProvider>
    </ModalProvider>
    //         <React.StrictMode>
    // </React.StrictMode>
);
