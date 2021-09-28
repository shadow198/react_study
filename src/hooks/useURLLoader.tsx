

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const  useURLLoader = (url: string, deps: any[] = [], ) => {
  const [data, setdata] = useState<any>(null)
  const [loading, setloading] = useState(false)
  useEffect(() => {
    setloading(true)
    axios.get(url).then(resule => {
      setdata(resule.data)
      setloading(false)
    })
    return () => {
      
    }
  }, deps)
  return [loading, data]
}

export default useURLLoader;
