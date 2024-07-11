import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/ApiContext'

const Header = ({handleAddClick}) => {
  const {admin} = useContext(StoreContext)
  return (
    <div>
      <div className='header'>
        <Link to='/'>
        <h2>Employee</h2>
        </Link>
        <div>
          { admin?.id && 
            <>
            <Link to='/'>{admin.name}</Link>
            <button onClick={handleAddClick} className='btn sm'>Add</button>
            <Link className='btn' to='/view'>View</Link>
            <Link className='btn' to='/logout'>Log out</Link>
            </>
          }
          {
            !admin?.id && 
            <>
              <Link className='btn' to='/view'>View</Link>
              <Link className='btn' to='/login'>Login</Link>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Header
