import React, { useEffect } from 'react'
import AdminLogin from '../components/AdminLogin'
import { useNavigate } from 'react-router-dom'

function Login() {
    const nav = useNavigate()
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            nav('/home')
        } else {
            nav('/login')
        }
    }, [nav]);
    return (
        <div>
            <AdminLogin />
        </div>
    )
}

export default Login