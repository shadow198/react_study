import React, { useEffect, useState } from 'react'

export default function useMouseTracker() {
  const [postion, setpostion] = useState({x:0, y:0})
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      console.log('inner')
      setpostion({x: e.clientX, y: e.clientY})
    }
    document.addEventListener('mousemove', updateMouse)
    return () => {
      document.removeEventListener('mousemove', updateMouse)
    }
  }, [])
  return  postion
}
