import {useContext} from 'react'
import styles from "./avatar.module.css"
import { BiLogOut } from "react-icons/bi";
import {AuthContext} from "../../../context/AuthContext"
import { useNavigate } from 'react-router-dom'


const Avatar = ({ name, profile, text, logOut }) => {
    
    //Contexto Global de Auth
    const {userData, setIsLogged, userRefresh} =  useContext(AuthContext)        
    const navigator = useNavigate();
    const handlerLogOut = () =>{       
        navigator("/Login")
        setIsLogged(false)
        localStorage.removeItem("JWT");
        localStorage.removeItem("userData");
        userRefresh()        
    }
    
    return (
        <div className={styles.divProfile} >
            <p className={styles[profile]}>{userData?.name.charAt(0)+userData.lastName.charAt(0)}</p>
            <section>
                <p className={styles[text]}>Hola,</p>
                <p className={styles[name]}>{userData.name + " " + userData.lastName}</p>
            </section>
            <section>
            <i className={styles[logOut]}><BiLogOut onClick={handlerLogOut} size="30px"  /></i>
            </section>           
        </div>
    )
}

export default Avatar