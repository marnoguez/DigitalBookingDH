import {useContext,useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './/header.module.css'
import Avatar from '../Avatar/Avatar';
import { AuthContext } from '../../../context/AuthContext';
import MenuMobile from '../MenuMobile/MenuMobile';



const Header = () => {

  const {isLogged , setIsLogged, userData} =  useContext(AuthContext);



  useEffect(() => {   
    if(JSON.parse(localStorage.getItem("JWT"))){
      setIsLogged(true)}  
          
  },[isLogged, userData])
  

 
 

  //Contexto Global de Auth
  const location = useLocation();
 

  return (
    <div className={styles.container}>
    
        <section className={styles.left} >
          <a href='/'><img className={styles.logo} src="https://productosc3g5.s3.us-east-2.amazonaws.com/imagenes/logo.jpg" width='80px' height='60px' alt='logo' /></a> 
          <a href='/'> <span className={styles.title}>Sentite como en casa</span></a>
        </section>
        {isLogged  ? 
        ( 
          <section  className={styles.avatarContainer}>
            <Avatar 
              name={"nameHeader"} 
              profile={"profileHeader"} 
              text={"pHeader"}
              logOut={"logOutHeader"}
              />
              
              { userData.roleId == 1 ? 
              <div className={styles.adminContainer}>
                <p style={{fontSize: "1.5rem"}}>|</p>
                <Link to="/list-products" className={styles.admin}>Administrador</Link>               
              </div>
               : 
              <div className={styles.adminContainer}>               
                <p style={{fontSize: "1.5rem"}}>|</p>
                <Link to="/my-reservations" className={styles.admin}>Mis Reservas</Link>
              </div>
               }
              
          </section>
        )  : 
        (
          <section className={styles.right} >  
           {location.pathname !== "/Login" ? 
            <Link to="Login"><button className={styles.btn}>Iniciar sesión</button></Link> : "" }     
          {location.pathname !== "/Register" ? (
            <Link to="Register"><button className={styles.btn}>Crear cuenta</button></Link>) : ""}                 
          </section>
        )
      }
      <div className={styles.menuMobile}>
        <MenuMobile />
      </div>
    </div>
  )
}

export default Header 