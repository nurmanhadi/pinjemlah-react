import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/logo1.png'
import { useNavigate } from 'react-router-dom';

const ReportUser = () => {
    const nav = useNavigate()
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await axios.get('/admin/users');
            setUsers(response.data['data']);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            generatePdf();
        }
    }, [users]);

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
        doc.text('Laporan Users', 105, 60, { align: 'center' });

        const tableColumn = ['No', 'Nama', 'Email', 'Alamat', 'Telepon'];
        const tableRows = users.map((user, index) => [
            index + 1,
            user.name,
            user.email,
            user.address,
            user.phone_number,
        ]);

        doc.autoTable(tableColumn, tableRows, { startY: 70 });

        doc.setFontSize(12);
        doc.setFont('times', 'bold')
        doc.text(`Total Users: ${users.length}`, 10, doc.lastAutoTable.finalY + 10);

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

        doc.save('user_report.pdf');
        nav('/')
    };

    return (
        <div className='flex justify-center'>
            Loading...
        </div>
    );
};

export default ReportUser;
