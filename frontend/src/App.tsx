import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages.tsx/Home';
import AppLayout from './pages.tsx/AppLayout';
import Error from './pages.tsx/Error';
import Game from './pages.tsx/Game';
import About from './pages.tsx/About';
import PlayOptions from './pages.tsx/PlayOptions';

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
                
            },{
                path: '/game',
                element: <Game/>
            },
            { path: '/about', element: <About /> },
        ],
    },
]);

function App() {
   return <RouterProvider router={router}/>
}

export default App;
