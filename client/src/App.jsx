import { useState } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import AddUserDetails from './components/create/AddUserDetails'
import EditUser from './components/update/EditUser'
import Header from './components/header/Header'
import DisplayUser from './components/display/DisplayUser'
import Home from './components/Home'
import Login from './components/login/Login'
import Logout from './components/login/Logout'
function App() {
  const [showLogin, setShowLogin] = useState(false)

  const handleAddClick = () =>{
    setShowLogin((showLogin)=>!showLogin)
  }

  return (
    <>
     {showLogin ? <AddUserDetails setShowLogin={setShowLogin}/>:<></>}
      <Header handleAddClick={handleAddClick}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/edit/:id' element={<EditUser/>}></Route>
        <Route path='/view' element={<DisplayUser/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
      </Routes>
    </>
  )
}

export default App
