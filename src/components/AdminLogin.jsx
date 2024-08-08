import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const nav = useNavigate()
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const adminLogin = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await axios.post('/auth/admin/login', formData);
            var data = response.data.token
            localStorage.setItem('token', data);
            nav('/')
        } catch (error) {
            console.error('Login error:', error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full md:w-1/3">
                <h2 className="text-3xl text-blue-500 font-bold mb-6 text-center">LOGIN</h2>
                <form onSubmit={adminLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-blue-500">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-blue-500">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 font-bold text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
