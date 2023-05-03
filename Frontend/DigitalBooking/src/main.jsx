import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Home from './components/container/Home/Home'
import Login from './components/pure/Forms/Login/Login'
import Register from './components/pure/Forms/Register/Registre'
import DescriptionContainer from './components/container/DescriptionContainer/DescriptionContainer'
import AuthContextProvider from './context/AuthContext'
import ProductContexProvider from './context/ProductContex'
import BookingContainer from './components/container/BookingContainer/BookingContainer'
import SuccesContainer from './components/container/SuccesContainer/SuccesContainer'
import AdministrationContainer from './components/container/AdministrationContainer/AdministrationContainer';
import SuccesProductContainer from './components/container/SuccesContainer/SuccesProductContainer'
import ReservationsContainer from './components/container/ReservationsContainer/ReservationsContainer';
import SuccesMailContainer from './components/container/SuccesContainer/SuccesMailContainer';
import Administration from './components/container/AdministrationContainer/Administration';

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <AuthContextProvider>
        <ProductContexProvider>
          <Routes>
            <Route element={<App />}>
                <Route index path='/' element={<Home/>} />
                <Route index path='/Home' element={<Home/>} />
                <Route path="/Login" element={<Login/>} />
                <Route path="/Register" element={<Register/>} />  
                <Route path="/description/:id" element={<DescriptionContainer />} /> 
                <Route path="/description/:id/booking" element={<BookingContainer/>} />
                <Route path='/succesfully' element={<SuccesContainer />} />
                <Route path='/succesfully' element={<SuccesContainer />} />
                <Route path='/add-product' element={<AdministrationContainer />}/>
                <Route path='/list-products' element={<Administration />}/>
                <Route path='/create-product-succes' element={<SuccesProductContainer/>}/>
                <Route path='/succes-mail' element={<SuccesMailContainer />}/>
                <Route path='/add-product' element={<AdministrationContainer />}/>
                <Route path='/my-reservations' element={<ReservationsContainer />}/>
            </Route>
          </Routes>
        </ProductContexProvider>
      </AuthContextProvider>  
    </BrowserRouter>
  
)
