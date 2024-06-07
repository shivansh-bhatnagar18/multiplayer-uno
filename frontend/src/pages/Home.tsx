import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <div className="font-kavoon">Home Page</div>
            <Link to="/play">Play</Link>
        </>
    );
}

export default Home;
