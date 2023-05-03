import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsLinkedin, BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import { FiMenu, FiX } from 'react-icons/fi'
import "./mobileMenu.css"
import Avatar from '../Avatar/Avatar';
import { AuthContext } from '../../../context/AuthContext';

const MenuMobile = () => {

  const [click, setClick] = useState(false);
  
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const {isLogged , setIsLogged, userRefresh, userData} =  useContext(AuthContext);
  const navigator = useNavigate();
  const handlerLogOut = () =>{       
    navigator("/Login")
    setIsLogged(false)
    localStorage.removeItem("JWT");
    localStorage.removeItem("userData");
    userRefresh()        
}
    
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <div className='menu-icon' onClick={handleClick}>
            <FiMenu /> 
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <div className='topMenu'>
              <i className='close' onClick={closeMobileMenu}><FiX /></i>
            </div>
              {isLogged ? (
                <div>
                  <div className='avatarMobile'>
                    <Avatar 
                      name={"nameMenu"} 
                      profile={"profileMenu"} 
                      text={"pMenu"}
                      logOut={"logOutMenu"}
                    />
                  </div>
                  {userData.roleId == 1 ? 
                    <Link to="/list-products" onClick={closeMobileMenu} className='btnMenu3'>Administrador</Link> 
                    :
                    <Link to="/my-reservations" onClick={closeMobileMenu} className='btnMenu3'>Mis reservas</Link>
                  }
                  <hr className='hrLogged2'/>
                  <div className='cerrarSesion'>
                    <p className='pCSesion'>¿Quieres <a onClick={handlerLogOut} className='aCSesion'>cerrar sesión</a>?</p>
                    <hr className='hrLogged'/>
                  </div>
                </div>
              ) : (
                <div>
                  <h5 className='h5'>MENÚ</h5>
                  <Link to="/Login" onClick={closeMobileMenu} className='btnMenu1'> Ingresar</Link>
                  <hr className='hrNoLogged'/>
                  <Link to="/Register" onClick={closeMobileMenu} className='btnMenu2'>Crear cuenta</Link>
                </div>
              )}
            <div className='redes' onClick={closeMobileMenu}>
            <li>
              <a href="https://facebook.com" className='nav-links'><BsFacebook /></a>
            </li>
            <li>
              <a href="https://linkedin.com" className='nav-links'><BsLinkedin /></a>
            </li>
            <li>
              <a href="https://twitter.com" className='nav-links'><BsTwitter /></a>
            </li>
            <li>
              <a href="https://instagram.com"className='nav-links'><BsInstagram /></a>
            </li>
            </div>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default MenuMobile