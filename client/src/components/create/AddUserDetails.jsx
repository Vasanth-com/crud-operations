import React, { useContext, useEffect, useState } from 'react'
import cross from '../../assets/cross_icon.png'
import { useNavigate } from 'react-router-dom'
// import { StoreContext } from '../../context/StoreContext'
import { StoreContext } from '../../context/ApiContext'
import axios from 'axios'
const AddUserDetails = ({setShowLogin}) => {
  const {employeeData,setEmployeeData} = useContext(StoreContext)
  const{admin} = useContext(StoreContext)
const [name,setName] = useState('')
const [email,setEmail] = useState('')
const [city,setCity] = useState('')
const [salary,setSalary] = useState('')
const [jobId,setJobId] = useState(Math.floor(Math.random()*10000+1))
const [error,setError] = useState('')
const navigate = useNavigate()
const token = admin?.token;

useEffect(()=>{
  if(!token){
    navigate('/login')
  }
},[])

const handleSubmit = async(e)=>{
    e.preventDefault()
  const details ={
    jobId,
    name,
    email,
    city,
    salary
  }
  console.log(details);
  try {
      const response = await axios.post('http://localhost:4000/api/employee/create',details,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}});
      console.log(response.data);
      if(response.status == 201){
        setShowLogin(false)
        return navigate('/view')
      }
  } catch (error) {
    setError(error.response.data.message)
  }
}
  return (
    <div>
        <div className='login__popUp'>
        <form className='form__container' onSubmit={handleSubmit}>
            <div className='form_title'>
                <h3>Add Employee Details</h3>
                <img onClick={()=>setShowLogin(false)} src={cross} alt="" />
            </div>
            <div className='form__inputs'>
              {error && <p style={{color:"red"}}>{error}</p>}
                <input type="text"  name='jobId'
                  placeholder='Job id' onChange={(e)=>setJobId(e.target.value)} value={jobId} /> 
                <input type="text"  name='name'
                  placeholder='User name' onChange={(e)=>setName(e.target.value)} value={name} />
                <input type="email" name='email'
                  placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <input type="text"  name='city'
                 placeholder='City' onChange={(e)=>setCity(e.target.value)} value={city}/>
                <input type="text"  name='salary'
                 placeholder='Salary' onChange={(e)=>setSalary(e.target.value)} value={salary} />
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
    </div>
  )
}

export default AddUserDetails
