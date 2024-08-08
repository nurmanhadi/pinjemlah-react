import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../utils/axios'

const CardUser = () => {
    const nav = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [loans, setLoans] = useState([])

    const _user = async () => {
        const res = await axios.get(`/admin/user/${id}`)
        setUser(res.data['data'])
        setLoans(res.data['data']['loans'])
    }

    useEffect(() => {
        _user()
    }, [id])

    const handleHapus = async (e) => {
        const res = await axios.delete(`/admin/delete/${e}`)
        if (res.status === 200) {
            alert("Berhasil hapus user")
            nav('/home')
        } else {
            alert(res.data['message'])
        }
    }

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'badge badge-error'
            case 'cicilan':
                return 'badge badge-warning'
            case 'lunas':
                return 'badge badge-success'
            default:
                return 'badge'
        }
    }
    const NavTo = (e) => {
        nav(`/loan/${e}`)
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 m-5">
                <div>
                    <div className="card bg-base-100 w-full shadow-xl rounded-md">
                        <div className="card-body">
                            <h2 className="card-title font-bold text-MyColor">PROFILE</h2>
                            <hr />
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th className='text-MyColor'>Nama</th>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <th className='text-MyColor'>Email</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <th className='text-MyColor'>Tanggal Lahir</th>
                                            <td>{user.birth_date}</td>
                                        </tr>
                                        <tr>
                                            <th className='text-MyColor'>Alamat</th>
                                            <td>{user.address}</td>
                                        </tr>
                                        <tr>
                                            <th className='text-MyColor'>No KTP</th>
                                            <td>{user.ktp_number}</td>
                                        </tr>
                                        <tr>
                                            <th className='text-MyColor'>Rekening</th>
                                            <td>{user.account_number}</td>
                                        </tr>
                                        <tr>
                                            <th className='text-MyColor'>Income/bln</th>
                                            <td>Rp.{user.monthly_income}</td>
                                        </tr>
                                        <tr>
                                            <th className='text-MyColor'>Telepon</th>
                                            <td>{user.phone_number}</td>
                                        </tr>
                                        <tr>
                                            <th className='text-MyColor'>Status</th>
                                            <td>{user.status}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <details className="dropdown">
                                                    <summary className="btn bg-MyColor text-white">Lainnya</summary>
                                                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                        <li><p onClick={() => handleHapus(user.user_id)}>Hapus Akun</p></li>
                                                        <li><p onClick={() => handleBlackList(user.user_id)}>BlackList</p></li>
                                                    </ul>
                                                </details>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border'>
                    <div className="card bg-base-100 w-full shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title font-bold text-MyColor">DAFTAR PINJAMAN</h2>
                            <hr className='mb-2' />
                            {loans.map((e) => {
                                return (
                                    <div key={e.loan_id} onClick={() => NavTo(e.loan_id)} className='mb-2'>
                                        <div className="card border rounded-md shadow-md cursor-pointer">
                                            <div className="card-body">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <div className="card-title font-bold">Rp.{e.loan_slug}</div>
                                                        <div>{e.loan_term} Bulan</div>
                                                    </div>
                                                    <div className={getStatusClass(e.status)}><p className='font-bold text-white'>{e.status}</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardUser
