import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToastProvider } from './library/toast/Toast.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ToastProvider>
        <App />
    </ToastProvider>
    //         <React.StrictMode>
    // </React.StrictMode>
);
