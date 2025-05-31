import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
// import './App.css'


import {useDispatch} from 'react-redux'
import { login,logout } from './storage/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading,setLoading]= useState(true)
  const dispatch= useDispatch()
  
  

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    }).catch((error)=>{
        console.log('user is not loged in :: so user data is not there',error);
        
    })
    .finally(()=>{
      setLoading(false);
    })
  },[])
  
  
  return !loading ? (
    <div className=' min-h-screen flex  flex-wrap content-between bg-gradient-to-r from-[#10e7dc] to-[#0ba0c5]  text-white '>
      <div className=' w-full block  '>
          <Header/>
          <main className=' flex-grow p-6'>
          <Outlet/>
          </main>
          <Footer/>
      </div>
    </div>
  ) : null
 
}

export default App




