import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
                    404
                </h1>
                <p className="text-2xl mb-8 text-white ">
                    This page does not exist!
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-500 text-white rounded-full hover:text-black hover:bg-blue-600 hover:shadow-lg transform hover:scale-105 transition duration-300"
                >
                    Go Back To Homepage
                </Link>
            </div>
        </div>
    );
}

export default Error;
