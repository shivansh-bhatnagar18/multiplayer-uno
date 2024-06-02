import { Link } from 'react-router-dom';

function Error() {
    return (
        <>
            <div className='w-screen h-screen bg-slate-800 flex items-center'>
                <div className='w-screen bg-red-500 border-solid border-y-4 border-t-white border-b-white py-2'>
                    <div className='flex justify-center items-center'>
                        <h1 className='text-9xl text-white font-mono font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>404</h1>
                    </div>
                    <div className='w-screen text-white flex justify-center text-2xl'>Oops! Looks like there's an error</div>
                    <div className='w-screen flex justify-center'>
                        <Link to="" className='text-xl text-red-500 h-max w-max bg-slate-50 p-4 border-solid border-black border-4 rounded-full hover:bg-slate-400 hover:text-purple-50 mt-3 hover:shadow-lg transform hover:scale-102 transition duration-200'>Back to Home</Link>
                    </div>
                </div>
            </div>
                   
        </> 
    );
}

export default Error;