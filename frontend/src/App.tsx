import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import AppLayout from './pages/AppLayout';
import Error from './pages/Error';
import Game from './pages/Game';
import About from './pages/About';
import { AuthProvider } from './contexts/AuthContext';

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,

        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/game',
                element: <Game />,
            },
            { path: '/about', element: <About /> },
            { path: '/error', element: <Error /> },
        ],
    },
]);

function App() {
    return (
        <AuthProvider>
            <>
                <RouterProvider router={router} />;
            </>
        </AuthProvider>
    );
}

export default App;
