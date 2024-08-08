import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home.page'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile.page'
import LoanPage from './pages/loan.page'
import ReportUser from './components/ReportUser'
import LoansPage from './pages/Loans.page'
import ReportLoan from './components/ReportLoan'
import ReportPayment from './components/ReportPayment'
import ReportCicilan from './components/ReportCicilan'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile/:id' element={<UserProfile />} />
        <Route path='/loan/:id' element={<LoanPage />} />
        <Route path='/pinjaman' element={<LoansPage />} />
        <Route path='/report/user' element={<ReportUser />} />
        <Route path='/report/loan' element={<ReportLoan />} />
        <Route path='/report/payment' element={<ReportPayment />} />
        <Route path='/report/cicilan' element={<ReportCicilan />} />
      </Routes>
    </Router>
  )
}

export default App
