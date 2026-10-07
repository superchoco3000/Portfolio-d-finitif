import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const profileImages = [
  '/assets/img/profile/yo2.jpg',
  '/assets/img/profile/moi.jpg',
  '/assets/img/profile/yo.png',
  '/assets/img/profile/yo3.jpg'
]

export default function AnimatedProfile({ style }: { style?: React.CSSProperties }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % profileImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ position: 'relative', ...style }}>
      <AnimatePresence>
        <motion.img
          key={index}
          src={profileImages[index]}
          alt="Profile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="rounded-circle border border-3 border-primary"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </AnimatePresence>
    </div>
  )
}
