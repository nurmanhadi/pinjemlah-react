import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../utils/axios'

const CardLoan = () => {
    const { id } = useParams()
    const nav = useNavigate()
    const [loan, setLoan] = useState({})
    const [payment, setPayment] = useState([])

    const getLoan = async () => {
        const res = await axios.get(`/admin/loan/${id}`)
        setLoan(res.data['data'])
        setPayment(res.data['data']['payments'])
    }

    useEffect(() => {
        getLoan()
    }, [id])

    const updateStatus = async () => {
        const formData = new FormData();
        formData.append('status', 'cicilan');
        await axios.put(`/admin/loan/status/${id}`, formData)
        nav(`/pinjaman`)
    }

    const getStatusClass = (status) => {
        switch (status) {
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

    return (
        <div className='m-5'>
            <div className="card bg-white border ">
                <div className="card-body items-center">
                    <div className="card-title text-MyColor font-bold">DETAIL LOAN</div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th className='text-MyColor font-bold'>Tipe</th>
                                    <td>{loan.loan_type}</td>
                                </tr>
                                <tr>
                                    <th className='text-MyColor font-bold'>Pinjaman</th>
                                    <td>Rp.{loan.loan_slug}</td>
                                </tr>
                                <tr>
                                    <th className='text-MyColor font-bold'>Waktu Pinjaman</th>
                                    <td>{loan.loan_term} Bulan</td>
                                </tr>
                                <tr>
                                    <th className='text-MyColor font-bold'>Rate</th>
                                    <td>{loan.interest_rate}</td>
                                </tr>
                                <tr>
                                    <th className='text-MyColor font-bold'>Tanggal Pinjaman</th>
                                    <td>{loan.application_date}</td>
                                </tr>
                                <tr>
                                    <th className='text-MyColor font-bold'>Batas Pinjaman</th>
                                    <td>{loan.approval_date} s/d {loan.disbursement_date}</td>
                                </tr>
                                <tr>
                                    <th className='text-MyColor font-bold'>Sisa Pinjaman</th>
                                    <td>Rp.{loan.loan_amount}</td>
                                </tr>
                                <tr>
                                    <th className='text-MyColor font-bold'>Status</th>
                                    <td >
                                        <div className={getStatusClass(loan.status)}>
                                            <p className='text-white font-bold'>{loan.status}</p>
                                        </div>
                                    </td>
                                </tr>
                                {loan.status === 'pending' && (
                                    <tr>
                                        <th></th>
                                        <td className="text-center">
                                            <p onClick={() => updateStatus()} className='bg-green-500 p-1 font-bold text-white rounded-lg cursor-pointer hover:text-MyColor'>Terima</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {loan.status === 'cicilan' || loan.status === 'lunas' && (
                <>
                    <div className="my-10 text-center font-bold text-xl text-MyColor">DAFTAR PEMBAYARAN</div>
                    <div className='m-5'>
                        {payment.map((e) => {
                            return (
                                <div key={e.payment_id} className='mb-2'>
                                    <div className="card border rounded-md shadow-md">
                                        <div className="card-body">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="card-title font-bold">Rp.{e.payment_amount}</div>
                                                    <div>{e.payment_date}</div>
                                                </div>
                                                <div className={getStatusClass(e.payment_status)}>
                                                    <p className='font-bold text-white'>{e.payment_status}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

export default CardLoan
