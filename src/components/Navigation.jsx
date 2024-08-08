import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';
import Icon from '@mdi/react';
import { mdiExitRun } from '@mdi/js'
import axios from '../utils/axios';

const Navigation = () => {
    const nav = useNavigate()
    const handleLogout = async () => {
        const res = await axios.post('/auth/admin/logout')
        if (res.status == 200) {
            localStorage.removeItem("token")
            nav('/login')
        } else {
            alert(res.data["message"])
        }
    }
    return (
        <div className="navbar bg-MyColor">
            <div className="flex-1 ml-5">
                <Link to={'/home'}>
                    <img src={logo} alt="Logo" className="h-16" />
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 flex space-x-4 font-bold text-white mr-5">
                    <li>
                        <Link to="/home">Beranda</Link>
                    </li>
                    <li>
                        <Link to="/pinjaman">Pinjaman</Link>
                    </li>
                    <li className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className='hover:text-white focus:text-white'>Reports</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li className='text-MyColor'><Link to={'/report/user'}>Users</Link></li>
                            <li className='text-MyColor'><Link to={'/report/loan'}>Pinjaman</Link></li>
                            <li className='text-MyColor'><Link to={'/report/payment'}>Pembayaran</Link></li>
                            <li className='text-MyColor'><Link to={'/report/cicilan'}>Cicilan</Link></li>
                        </ul>
                    </li>
                </ul>
                <p onClick={() => handleLogout()} className='bg-red-500 rounded-lg p-3 cursor-pointer'><Icon path={mdiExitRun} size={1} style={{ color: 'white' }} /></p>

            </div>
        </div>
    );
};

export default Navigation;
