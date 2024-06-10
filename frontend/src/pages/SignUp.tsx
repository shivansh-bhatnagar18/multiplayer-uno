import React, { useState, useEffect } from 'react';
import Button from '../library/button';
import Input from '../library/input';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth.getUser();

    const handleLogin = () => {
        setUsername('Username_7');
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setUsername('');
        setIsLoggedIn(false);
    };

    const handelConfirmPassChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPass(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted');
        if (password === confirmPass) {
            auth.login(name, password);
            console.log('successfull signup');
            navigate('/');
        } else {
            console.log('failed signup');
        }
    };

    useEffect(() => {
        const user = auth.getUser();
        console.log(user);
        setIsLoggedIn(auth.isLoggedIn());
        console.log(isLoggedIn);
    }, [auth, user, isLoggedIn]);

    return (
        <>
            <div className="min-h-screen bg-uno-bg bg-cover bg-center flex flex-col relative">
                <Navbar
                    isLoggedIn={true} //true here so that navbar does not render signin/login button
                    username={username}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                />
                <div className=" w-full flex justify-center items-center grow">
                    <div className="flex flex-col justify-center items-center">
                        {/* <div className='flex justify-center'>
                        <Button
                            buttonSize="w-96 h-12"
                            py="py-0"
                            textColor="text-white"
                            text="Login using Google"                          //Sign up with google to be handeled later
                            backgroundColor="bg-gray-300"
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
                                            onChange={handleNameChange}
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
                                    <div className="my-3">
                                        <Input
                                            id="confirmPass"
                                            type="password"
                                            onChange={handelConfirmPassChange}
                                            placeholder="Confirm Password"
                                            width="96"
                                            height="12"
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <Button
                                            text="Sign Up"
                                            textColor="text-white"
                                            py="0"
                                            buttonSize="w-32 h-10"
                                            className="border-4 rounded-full"
                                            fontSize="text-2xl"
                                            type="submit"
                                        />
                                    </div>
                                </div>
                            </form>
                            <div>
                                <div className="font-kavoon flex justify-center items-center my-3">
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        className=" text-blue-700 "
                                    >
                                        {' '}
                                        Login
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

export default SignUp;
