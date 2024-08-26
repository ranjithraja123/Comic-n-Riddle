import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../reduxSlice/authSlice.js';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900'
            style={{
                backgroundImage: "url('https://i.pinimg.com/564x/77/82/6b/77826bf2ee2f893b3efa7c70676d88ff.jpg')",
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
            <div className='w-full max-w-md p-8 rounded-lg shadow-md bg-gray-800 bg-opacity-75 backdrop-blur-lg'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-green-500'> Infin-8-Toons</span>
                </h1>
                <form className='mt-6' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-sm text-gray-300'>
                            Email                        </label>
                        <input
                            type='email'
                            placeholder='Enter username'
                            className='w-full px-3 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-green-600'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm text-gray-300'>
                            Password
                        </label>
                        <input
                            name='password'
                            type='password'
                            placeholder='Enter password'
                            className='w-full px-3 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-green-600'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                    <Link
                        to='/signup'
                        className='text-sm text-green-500 hover:underline hover:text-green-400'
                    >
                        {"Don't"} have an account?
                    </Link>
                    <div className='mt-6'>
                        
                        <button
                            type='submit'
                            className='w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400'
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
