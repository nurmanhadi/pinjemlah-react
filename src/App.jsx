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
        <Route exact path='/' Component={HomePage} />
        <Route path='/login' Component={Login} />
        <Route path='/profile/:id' Component={UserProfile} />
        <Route path='/loan/:id' Component={LoanPage} />
        <Route path='/pinjaman' Component={LoansPage} />
        <Route path='/report/user' Component={ReportUser} />
        <Route path='/report/loan' Component={ReportLoan} />
        <Route path='/report/payment' Component={ReportPayment} />
        <Route path='/report/cicilan' Component={ReportCicilan} />
      </Routes>
    </Router>
  )
}

export default App
