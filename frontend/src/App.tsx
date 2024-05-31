import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import AppLayout from './pages/AppLayout';
import Error from './pages/Error';
import Game from './pages/Game';
import About from './pages/About';
import PlayOptions from './pages/PlayOptions';

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
                path: '/play',
                element: <PlayOptions />,
            },
            {
                path: '/game',
                element: <Game />,
            },
            { path: '/about', element: <About /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
