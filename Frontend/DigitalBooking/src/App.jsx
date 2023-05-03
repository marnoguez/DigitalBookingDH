import React, { useEffect } from 'react'
import Header from './components/commons/Header/Header'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/commons/Footer/Footer'



function App() {

  const location = useLocation;
  const navigate = useNavigate(); 

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/Home')
    }
  })

  return (
    <div className="App">
        <Header/>        
        <Outlet/>
        <Footer />      
    </div>
  )
}

export default App
