import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            <div>Home Page</div>
            <Link to="/play">Play</Link>
        </>
    );
}

export default Home
