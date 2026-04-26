import React, { useContext, useState, useRef } from 'react'
import dp from '../assets/dp.webp'
import { dataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import bgImage from '../assets/Bg-start.jpg' 

const SignUp = () => {
  let { serverUrl, setUserData, getUserData , userData } = useContext(dataContext)
  const navigate = useNavigate()

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [frontendImage, setfrontendImage] = useState(dp)
  const [backendImage, setbackendImage] = useState(dp)
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("")
  const [department, setDepartment] = useState("")
  const file = useRef(null)

  function handleImage(e) {
    let file = e.target.files[0]
    if (!file) return
    setbackendImage(file)
    setfrontendImage(URL.createObjectURL(file))
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      let formdata = new FormData()
      formdata.append('name', name)
      formdata.append('email', email)
      formdata.append('password', password)
      formdata.append('role', role)
      formdata.append('department', department)
      if (backendImage) formdata.append('profileImage', backendImage)

      const { data } = await axios.post(
        serverUrl + "/api/signup",
        formdata,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      )
      await getUserData()
      setUserData(data.user)
      navigate('/login')
    } catch (error) {
      console.error("Error during signup:", error)
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <div
      className='w-full min-h-screen bg-white relative overflow-hidden'
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <h1
        className="absolute top-5 left-5 text-3xl sm:text-4xl z-10 flex gap-1"
        style={{
          fontFamily: '"Hammersmith One", sans-serif',
          letterSpacing: '3px',
        }}
      >
        <span className="text-white">Crew</span>
        <span className="text-[#38bdf8]">bit</span>
      </h1>

      <div className='flex justify-center items-center pt-20 pb-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='w-[96%] max-w-[370px] bg-[#0f172a]/90 rounded-2xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.34)] backdrop-blur-md flex flex-col items-center gap-4'
        >
          <h1 className='text-white text-[1.15rem] font-bold mb-0.5 mt-1'>Register your account here</h1>
          <form className='w-full flex flex-col items-center gap-3' onSubmit={handleSignup}>
            <input type="file" accept="image/*" className='hidden' ref={file} onChange={handleImage} />
            <div className='w-[66px] h-[66px] rounded-full bg-[#334155] mb-0.5 overflow-hidden relative border-2 border-white'>
              <img src={frontendImage} alt="" className='w-full h-full rounded-full object-cover' />
              <div
                className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-blue-700 border-2 border-white text-white text-center text-[14px] font-bold cursor-pointer flex items-center justify-center hover:bg-blue-800 transition"
                onClick={() => file.current.click()}
              >
                +
              </div>
            </div>

            <div className='w-[96%] flex flex-col gap-2'>
              <div className="flex flex-col gap-0.5">
                <label htmlFor="name" className="text-blue-100 text-[15px] font-semibold">Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  placeholder='Enter your full name'
                  className='w-full h-11 px-4 rounded-md bg-[#1e293b] text-white placeholder-blue-200 border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 text-[15px]'
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <label htmlFor="email" className="text-blue-100 text-[15px] font-semibold">Email</label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  placeholder='Enter your email'
                  className='w-full h-11 px-4 rounded-md bg-[#1e293b] text-white placeholder-blue-200 border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 text-[15px]'
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <label htmlFor="password" className="text-blue-100 text-[15px] font-semibold">Password</label>
                <div className="relative w-full">
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    className='w-full h-11 px-4 rounded-md bg-[#1e293b] text-white placeholder-blue-200 border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 pr-12 text-[15px]'
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 focus:outline-none"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.94 17.94A10.97 10.97 0 0112 19c-7 0-11-7-11-7a21.77 21.77 0 015.06-6.06M1 1l22 22" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.53 9.53A3.001 3.001 0 0012 15a3 3 0 002.47-5.47" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Role Dropdown */}
              <div className="flex flex-col gap-0.5">
                <label htmlFor="role" className="text-blue-100 text-[15px] font-semibold">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className='w-full h-11 px-4 rounded-md bg-[#1e293b] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 text-[15px]'
                >
                  <option value="">Select role</option>
                  <option value="employee">Employee</option>
                  <option value="hr">HR</option>
                </select>
              </div>

              {/* Department Input */}
              <div className="flex flex-col gap-0.5">
                <label htmlFor="department" className="text-blue-100 text-[15px] font-semibold">Department (optional)</label>
                <input
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  type="text"
                  placeholder='e.g. Sales, Tech, HR...'
                  className='w-full h-11 px-4 rounded-md bg-[#1e293b] text-white placeholder-blue-200 border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 text-[15px]'
                />
              </div>

              <button
                type="submit"
                className='w-full h-9 mt-1 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-200 text-[14px] tracking-wide'
              >
                Register
              </button>
            </div>
          </form>

          <p className='text-blue-100 text-sm'>
            Already have an account?{' '}
            <span
              className='text-blue-300 font-medium hover:underline cursor-pointer'
              onClick={() => navigate('/login')}
            >
              Login here
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default SignUp
