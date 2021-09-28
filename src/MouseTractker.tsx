import React, { useEffect, useState } from 'react'

export default function MouseTractker() {
  const [postion, setpostion] = useState({x:0, y:0})
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      console.log('inner')
      setpostion({x: e.clientX, y: e.clientY})
    }
    document.addEventListener('click', updateMouse)
    return () => {
      document.removeEventListener('click', updateMouse)
    }
  })
  return (
    <div>
      <p>x: {postion.x} y: {postion.y}</p>
    </div>
  )
}
