import React from 'react'

const Caracteristicas = ({description, icon }) => {
  return (
   <li> <img src={icon} alt="icono" /> {description}</li>
  )
}

export default Caracteristicas