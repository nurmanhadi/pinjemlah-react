import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/logo1.png'
import { useNavigate } from 'react-router-dom';

const ReportLoan = () => {
    const nav = useNavigate()
    const [loans, setLoans] = useState([])

    const getLoans = async () => {
        const res = await axios.get('/admin/loan/lunas')
        setLoans(res.data['data'])
    }
    useEffect(() => {
        getLoans()
    }, [])

    useEffect(() => {
        if (loans.length > 0) {
            generatePdf();
        }
    }, [loans]);

    const generatePdf = () => {
        const doc = new jsPDF({
            orientation: 'P',
            unit: 'mm',
            format: 'a4',
        });

        const imgData = logo;
        doc.addImage(imgData, 'PNG', 10, 10, 30, 30);

        doc.setFont('times', 'bold');
        doc.setFontSize(16);
        doc.text('PINJEMLAH', 105, 20, { align: 'center' });

        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        doc.text('Jl. Sahid, No. 8, Rt. 02/01, Kec. Ps. Minggu,', 105, 30, { align: 'center' });
        doc.text('Kota Jakarta Selatan Daerah Khusus, 12510', 105, 35, { align: 'center' });

        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(10, 40, 200, 40);

        doc.setFontSize(14);
        doc.setFont('times', 'bold')
        doc.text('Laporan Pinjaman', 105, 60, { align: 'center' });

        const tableColumn = ['No', 'Pinjaman', 'Bulan', 'Batas Pinjaman', 'Status'];
        const tableRows = loans.map((loan, index) => [
            index + 1,
            `Rp.${loan.loan_slug}`,
            `${loan.loan_term} Bulan`,
            `${loan.approval_date} s/d ${loan.disbursement_date}`,
            loan.status,
        ]);

        doc.autoTable(tableColumn, tableRows, { startY: 70 });

        doc.setFontSize(12);
        doc.setFont('times', 'bold')
        doc.text(`Total Pinjaman: ${loans.length}`, 10, doc.lastAutoTable.finalY + 10);

        doc.setFontSize(12);
        doc.setFont('times', 'norman')
        const date = new Date();
        const indonesianDays = [
            'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
        ];
        const indonesianMonths = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
            'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const formattedDate = `Jakarta, ${indonesianDays[date.getDay()]}, ${date.getDate()} ${indonesianMonths[date.getMonth()]} ${date.getFullYear()}`;
        const yPos = doc.internal.pageSize.height - 60;

        doc.text(formattedDate, 190, yPos, { align: 'right' });
        doc.text('Manager', 190, yPos + 10, { align: 'right' });
        doc.text('Muhammad Nurman Hadi', 190, yPos + 40, { align: 'right' });

        doc.save('Pinjaman_report.pdf');
        nav('/home')
    };

    return (
        <div className='flex justify-center'>
            Loading...
        </div>
    )
}

export default ReportLoan