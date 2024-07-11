import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [employeeData, setEmployeeData] = useState(()=>{
    const saveData = localStorage.getItem('employeeDetails')
    return saveData ? JSON.parse(saveData) : [];
  });

  useEffect(()=>{
    localStorage.setItem('employeeDetails',JSON.stringify(employeeData))
  },[employeeData])

  return (
    <StoreContext.Provider value={{ employeeData, setEmployeeData }}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
