import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const dataContext = createContext()

const UserContext = ({ children }) => {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({})
  const [hasStarted, setHasStarted] = useState(false)

  const serverUrl = "http://localhost:8000"

  const getUserData = async () => {
    try {
      let { data } = await axios.get(serverUrl + "/api/getuserData", {
        withCredentials: true
      })
      setUserData(data)
    } catch (error) {
      navigate('/login')
      console.log(error)
    }
  }

  const value = {
    serverUrl,
    setUserData,
    userData,
    getUserData,
    hasStarted,
    setHasStarted
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext

