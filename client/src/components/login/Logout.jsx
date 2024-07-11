import React, { useContext } from 'react'
import { StoreContext } from '../../context/ApiContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const {setAdmin} = useContext(StoreContext)
    const navigate = useNavigate()

    setAdmin(null)
    navigate('/')
  return (
    <div>
      
    </div>
  )
}

export default Logout
