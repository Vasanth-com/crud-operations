import { createContext, useState,useEffect } from "react";
import axios from 'axios'
export const StoreContext = createContext(null);

const StoreContextProvider = ({children}) =>{
    const [employeeData,setEmployeeData] = useState([])
    const url = 'http://localhost:4000'
   
    const [admin,setAdmin] = useState(JSON.parse(localStorage.getItem('admin')))
    console.log(admin);
    useEffect(()=>{
        localStorage.setItem('admin',JSON.stringify(admin))
    },[admin])
    
    
    const fetchEmployee = async() =>{
        try {
            const res = await axios.get(url+"/api/employee/")
        setEmployeeData(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchEmployee()
    },[])
    
    const contextValue = {
        employeeData,
        admin,
        setAdmin
    }

 return(
    <StoreContext.Provider  value={contextValue}>
        {children}
    </StoreContext.Provider>
 )

}

export default StoreContextProvider

