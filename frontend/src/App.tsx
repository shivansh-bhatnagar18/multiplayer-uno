import { useState } from 'react';
import './App.css';
import Navbar from './Navbar';

function App() {
    const [count, setCount] = useState(0);
    const a = 5;
    console.log(a);
    return (
        <>
            <Navbar></Navbar>
            <p>Lets play a game of UNO! Click the button to draw a card.</p>
            <p>Card: {count}</p>
            <button onClick={() => setCount(count + 1)}>Draw a card</button>
        </>
    );
}

export default App;
