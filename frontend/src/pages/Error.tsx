import { Link } from 'react-router-dom';

function Error() {
    return (
        <body className="bg-[#1b1929] min-h-screen flex flex-col justify-center items-center p-4">

            <div className="text-6xl md:text-4xl lg:text-6xl font-semibold text-[#b77fef]">Error 404!</div>
            <div className="text-8xl md:text-6xl lg:text-8xl font-semibold text-[#b77fef]">Lost in the shuffle</div>
            <div className="text-2xl md:text-xl lg:text-2xl font-medium text-[#d4c3e4] text-center">This page seems to be missing from the deck</div>
            <Link to="/" className="mt-4"><button className="bg-[#6d4c8d] text-[#d4c3e4] font-medium py-2 px-4 rounded">Click here for Homepage</button></Link>
        </body>
    );
}

export default Error;
