import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/ApiContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [user,setUser] = useState({
        email:'',
        password:''
    })
    const[error,setError] = useState('')
    const navigate = useNavigate()
    const {setAdmin} = useContext(StoreContext)

    const handleOnChange = (e)=>{
        const{name,value} = e.target
        setUser((prev)=>{
            return {...prev,[name]:value}
        })
        console.log(user);
    }
    const loginAdmin = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/employee/login',user)
            console.log(response);
            console.log(response.data);
            setAdmin(response.data);
            navigate('/')
        } catch (error) {
            setError(error.response.data.message)
        }
    } 

  return (
    <div className='login'>
        <form className='loginForm' onSubmit={loginAdmin}>
        <h3>Sign In</h3>
        {error && <p style={{color:"red",marginBottom:"15px"}}>{error}</p>}
            <div className='form__inputs'>
                <input type="email" name='email' placeholder='Email' onChange={handleOnChange} value={user.email} />
                <input type="password" name='password' placeholder='Password' onChange={handleOnChange} value={user.password} />
            </div>
            <button type='submit' className='login___btn'>Login</button>
        </form>
    </div>
  )
}

export default Login
