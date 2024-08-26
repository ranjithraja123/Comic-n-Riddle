import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Login/login.css'; // Assuming you want to use the same CSS file
// import { signupUser } from '../../reduxSlice/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../reduxSlice/authSlice';
const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser({username,email,password}))
    }
    
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900'>
            <div className='w-full max-w-md p-8 rounded-lg shadow-md bg-gray-800 bg-opacity-75 backdrop-blur-lg'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up
                    <span className='text-green-500'> CZAPP</span>
                </h1>
                <form className='mt-6' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-sm text-gray-300'>
                            Username
                        </label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='w-full px-3 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-green-600'
                            id='username'
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm text-gray-300'>
                            Email
                        </label>
                        <input
                            type='email'
                            placeholder='Enter email'
                            className='w-full px-3 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-green-600'
                            id='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm text-gray-300'>
                            Password
                        </label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            className='w-full px-3 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-green-600'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        
                        />
                    </div>
                    {error && <p className='text-red-500 text-sm'>{error}</p>}

                    {/* <div className='mb-4'>
                        <label className='block text-sm text-gray-300'>
                            Confirm Password
                        </label>
                        <input
                            type='password'
                            placeholder='Confirm password'
                            className='w-full px-3 py-2 mt-2 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-green-600'
                        />
                    </div> */}
                    <Link
                        to='/login'
                        className='text-sm text-green-500 hover:underline hover:text-green-400'
                    >
                        Already have an account?
                    </Link>
                    <div className='mt-6'>
                        <button
                            type='submit'
                            className='w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400'
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
