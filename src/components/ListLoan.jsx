import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'

const ListLoan = () => {
    const nav = useNavigate()
    const [loans, setLoans] = useState([])
    const [payments, setPayments] = useState([])

    const getLoans = async () => {
        const res = await axios.get('/admin/loans')
        setLoans(res.data['data'])
    }
    const getPyaments = async () => {
        const res = await axios.get('/admin/payments')
        setPayments(res.data['data'])
    }
    useEffect(() => {
        getLoans()
        getPyaments()
    }, [])

    const Goto = (e) => {
        nav(`/loan/${e}`)
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
    return (
        <div className='m-5'>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div className='shadow rounded'>
                    <h1 className='text-center font-bold text-MyColor text-xl mb-10'>DAFTAR PINJAMAN</h1>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className='text-MyColor text-lg'>
                                    <th>No</th>
                                    <th>Pinjaman</th>
                                    <th>Bulan</th>
                                    <th>Batas Pinjaman</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.map((e, index) => {
                                    return (
                                        <tr key={e.loan_id}>
                                            <th>{index + 1}</th>
                                            <td>Rp.{e.loan_slug}</td>
                                            <td>{e.loan_term} Bulan</td>
                                            <td>{e.approval_date} s/d {e.disbursement_date}</td>
                                            <td>
                                                <div onClick={() => Goto(e.loan_id)} className={getStatusClass(e.status)}>
                                                    <p className='text-white font-semibold cursor-pointer'>{e.status}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='rounded shadow'>
                    <h1 className='text-center font-bold text-MyColor text-xl mb-10'>DAFTAR PEMBAYARAN</h1>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className='text-MyColor text-lg'>
                                    <th>No</th>
                                    <th>Amount</th>
                                    <th>Tanggal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((e, index) => {
                                    return (
                                        <tr key={e.payment_id}>
                                            <th>{index + 1}</th>
                                            <td>Rp.{e.payment_amount}</td>
                                            <td>{e.payment_date}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListLoan