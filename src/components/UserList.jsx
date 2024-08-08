import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { Link } from 'react-router-dom'

const UserList = () => {
    const [users, setUsers] = useState([])
    const getUsers = async () => {
        const response = await axios.get('/admin/users')
        setUsers(response.data['data'])
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <div className='m-5 p-5'>
            <div className='text-center text-MyColor font-bold text-3xl mb-16'>
                <h1>DAFTAR USER</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className='text-MyColor text-lg'>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Alamat</th>
                            <th>Telepon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((e, index) => {
                            return (
                                <tr key={e.user_id}>
                                    <th>{index + 1}</th>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.address}</td>
                                    <td>{e.phone_number}</td>
                                    <td><Link to={`/profile/${e.user_id}`}><p className=' text-center rounded-lg font-semibold bg-MyColor text-white'>Detail</p></Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div></div>
    )
}

export default UserList