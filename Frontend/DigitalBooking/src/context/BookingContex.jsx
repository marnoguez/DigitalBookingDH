import axios from 'axios';
import React,{useContext,useState,createContext} from 'react'

export const BookingContex = createContext();



const BookingContexProvider = ({children }) => {

  
     
  return (
    <BookingContex.Provider value={data}>
      {children}
    </BookingContex.Provider>
  )
}

export default BookingContexProvider