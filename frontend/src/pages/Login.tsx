import React, { useState } from 'react';
import Button from '../library/button';
import Input from '../library/input';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted');
        await auth.authenticate(username, password);
        //Check query params for a join game link
        const navigateTo = location.search;
        navigateTo ? navigate(navigateTo) : navigate('/');
    };

    return (
        <>
            <div className="min-h-screen bg-uno-bg bg-cover bg-center flex flex-col relative">
                <div className=" w-full flex justify-center items-center grow">
                    <div className="flex flex-col justify-center items-center">
                        {/* <div className='flex justify-center'>
                            <Button
                                buttonSize="w-96 h-12"
                                py="py-0"
                                textColor="text-white"
                                text="Login using Google"
                                backgroundColor="bg-gray-300"            //Login with google to be handeled later
                                hoverColor="hover:bg-gray-500"
                                className='border-4 m-2 rounded-full'
                                fontSize=' text-2xl'
                            />
                        </div>
                        <div className='w-96 h-1 bg-neutral-300 my-3'></div> */}
                        <div>
                            <form onSubmit={handleSubmit} className="">
                                <div className="">
                                    <div className=" my-3">
                                        <Input
                                            id="email"
                                            type="text"
                                            onChange={handleUsernameChange}
                                            placeholder="Enter Username"
                                            width="96"
                                            height="12"
                                        />
                                    </div>
                                    <div className="my-3">
                                        <Input
                                            id="pass"
                                            type="password"
                                            onChange={handlePasswordChange}
                                            placeholder="Password"
                                            width="96"
                                            height="12"
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <Button
                                            variant="accept"
                                            size="medium"
                                            buttonSize="w-36 h-12"
                                            type="submit"
                                            fontSize="text-2xl"
                                        >
                                            Login
                                        </Button>
                                    </div>
                                </div>
                            </form>
                            <div>
                                <div className="font-kavoon flex justify-center items-center my-3">
                                    Don't have an account?{' '}
                                    <Link
                                        // todo: also send the query params to the register page
                                        to="/register"
                                        className=" text-blue-700 "
                                    >
                                        {' '}
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
