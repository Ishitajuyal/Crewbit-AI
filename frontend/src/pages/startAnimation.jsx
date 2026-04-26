import React, { useRef, useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BgStart from '../assets/Bg-start.jpg'
import '@fontsource/hammersmith-one'
import '@fontsource/playfair-display'
import { dataContext } from '../context/UserContext'

const StartAnimation = () => {
  const navigate = useNavigate()
  const { setHasStarted } = useContext(dataContext)
  const [clicked, setClicked] = useState(false)

  const hasAnimatedRef = useRef(false)

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => {
      setHasStarted(true)
      navigate('/login')
    }, 400)
  }

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${BgStart})` }}
    >
      <motion.div
        initial={!hasAnimatedRef.current ? { opacity: 0 } : false}
        animate={!hasAnimatedRef.current ? { opacity: 1 } : false}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          hasAnimatedRef.current = true
        }}
        className="flex flex-col items-center justify-center text-center"
      >
        <h1
          className="text-white text-6xl sm:text-7xl"
          style={{
            fontFamily: '"Hammersmith One", sans-serif',
            letterSpacing: '6px',
          }}
        >
          Crew
          <span className='text-[#38bdf8]'> bit</span> 
        </h1>

        <h2
          className="text-white text-2xl sm:text-3xl mt-4"
          style={{
            fontFamily: '"Playfair Display", serif',
            letterSpacing: '2px',
          }}
        >
          The-HR
        </h2>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleClick}
          className={`mt-8 px-6 py-2 text-sm sm:text-base rounded-full border border-white bg-white/10 text-white font-medium backdrop-blur-sm hover:bg-white/20 transition-all duration-300 ${
            clicked ? 'scale-95 opacity-80' : ''
          }`}
          style={{
            fontWeight: 500,
            letterSpacing: '1px',
          }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  )
}

export default StartAnimation
