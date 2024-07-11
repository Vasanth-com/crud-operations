import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { StoreContext } from '../../context/StoreContext'
import { StoreContext } from '../../context/ApiContext'
import axios from 'axios'

const EditUser = () => {
  const {id} = useParams()
  console.log(id);
  const{admin} = useContext(StoreContext)
  const [name,setName] = useState('')
  const [city,setCity] = useState('')
  const [salary,setSalary] = useState('')
  const [error,setError] = useState('')
const token = admin?.token

  useEffect(()=>{
      const getEmp = async()=>{
        try {
          const response = await axios.get(`http://localhost:4000/api/employee/${id}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}});
          console.log(response.data);
          setSalary(response.data.salary)
          setCity(response.data.city)
          setName(response.data.name)
        } catch (error) {
          console.log(error);
        }
    }
    getEmp()
  },[])  

  const handleSubmit = async(e)=>{
    e.preventDefault()
    let details = {
      name,
      city,
      salary,
    }
    try {
      const response = await axios.patch(`http://localhost:4000/api/employee/edit/${id}`,details,{withCredentials:true,headers:{Authorization: `Bearer ${token}`}})

      console.log(response.data);
    } catch (error) {
        setError(error.response.data.message)
    }
  }
  return (
    <div className='form_data'>
    <div className="containers">
    <div className="title">Edit Details</div>
    <div className="content">
      <form onSubmit={handleSubmit}>
        {error && <p style={{color:"red"}}>{error}</p>}
        <div className="user-details">
          <div className="input-box">
            <span className="details">Name</span>
            <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} value={name} name='name' required/>
          </div>
          <div className="input-box">
            <span className="details">City</span>
            <input type="text" placeholder="city" onChange={(e)=>setCity(e.target.value)} value={city} name='city' required/>
          </div>
          <div className="input-box">
            <span className="details">Salary</span>
            <input type="text" placeholder="Salary" onChange={(e)=>setSalary(e.target.value)} value={salary} name='salary' required/>
        </div>
        </div>
        <div className="button">
          <input type="submit" value="Update"/>
        </div>
      </form>
        </div>
    </div>
   
   </div>
  )
}

export default EditUser
