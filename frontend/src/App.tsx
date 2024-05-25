import { useState } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const a = 5;
    console.log(a);
    function handleClick() {
        setCount(count + 1);
    }
    return (
        <>
           <h1>UNO!!!</h1>
            <p>Lets play a game of UNO! Click the button to draw a card.</p>
        </>
    );
}

export default App;
