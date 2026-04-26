import React, { useContext } from 'react'
import { dataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import EmployeeQuery from '../components/EmployeeQuery.jsx'
import bgImage from '../assets/Bg-start.jpg'

const Employee = () => {
  let { userData, setUserData, serverUrl } = useContext(dataContext)
  let navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(serverUrl + "/api/logout",{}, { withCredentials: true })
      setUserData(null)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="w-full min-h-screen relative overflow-hidden flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Profile image and name in top-left */}
      <div className="absolute top-6 left-6 flex flex-col items-center gap-2 z-10">
        <div className="w-[60px] h-[60px] rounded-full bg-[#1e3a24] border-2 border-white overflow-hidden shadow-lg">
          <img
            src={userData.profileImage}
            alt={userData.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <span className="text-[#d1fae5] text-xl font-semibold drop-shadow">
          {userData.name
            ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1)
            : ""}
        </span>
        <span className="text-[#a7f3d0] text-sm font-semibold tracking-wide">employee</span>
      </div>

      {/* Logout button in top-right */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 inline-flex items-center justify-center rounded-full bg-slate-400 text-[#14532d] border border-[#22c55e] px-4 py-1.5 text-sm font-semibold shadow transition-colors duration-150 hover:bg-[#1b2e23]/60 hover:text-white hover:border-[#14532d] focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-2 z-10"
      >
        Log Out
      </button>

      {/* Main content area (centered if you want to add more later) */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <EmployeeQuery />
      </div>
    </div>
  )
}

export default Employee
