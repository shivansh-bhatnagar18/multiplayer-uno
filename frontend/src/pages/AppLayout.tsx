import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import { ModalProvider } from '../library/modal/ModalContext';
import { ToastProvider } from '../library/toast/Toast';
import { AuthProvider } from '../contexts/AuthContext';

function AppLayout() {
    return (
        <ModalProvider>
            <ToastProvider>
                <AuthProvider>
                    <div>
                        <Navbar />
                        <Outlet />
                        {/* todo: Add a footer component */}
                    </div>
                </AuthProvider>
            </ToastProvider>
        </ModalProvider>
    );
}

export default AppLayout;
