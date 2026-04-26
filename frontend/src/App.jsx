import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import StartAnimation from './pages/startAnimation'
import { dataContext } from './context/UserContext'
import HrPage from './pages/HrPage'
import Employee from './pages/Employee'

const App = () => {
  const { userData, hasStarted } = useContext(dataContext)

  return (
    <Routes>
      {/* Always accessible */}
      <Route path="/" element={<StartAnimation />} />

      {/* Only accessible after "Get Started" */}
      {hasStarted && (
        <>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={userData ? <Home /> : <Navigate to="/login" />} />
          <Route path="/hrPage" element={<HrPage />} />
          <Route path="/employeePage" element={<Employee />} />
        </>
      )}

      {/* All unmatched routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
