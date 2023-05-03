import {useContext,useEffect, useState} from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from './/login.module.css'
import { AuthContext } from '../../../../context/AuthContext';
import Swal from 'sweetalert2'

function Login() {
    

    //Contexto Global de Auth
    const { loginFunction, isLogged, userRol } =  useContext(AuthContext);
    const navigator = useNavigate();

    const [ok, setOk] = useState(false)
    
    //Desde el login 
    const { state } = useLocation();
    const prevPath = state && state?.previousPath;
    let isInBooking = prevPath  ? true : false;
    console.log( prevPath);


    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Formato del email inválido')
            .required('Requerido'),
        password: Yup.string()
            .required('Requerido')
            .min(6, "La contraseña tiene que ser mayor a 6 caracteres")
    })

    const onSubmitLogin = values => {    
    
        loginFunction(values.email, values.password, isInBooking, prevPath)
    }

    const MySwal = () =>{

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Para realizar una reserva necesitas estar logueado',         
        })
    } 

    useEffect(() => {
        prevPath ? MySwal() : ""
        }, []);

    return (
        <main>       
            <Formik
            validationSchema={validationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
                onSubmitLogin(values)
            }}>
            {({
                values,
                errors,
                touched,
                handleChange,
                setFieldTouched,
                handleSubmit,
                isValid
            }) => (
            <div className={styles.divForm}>
                <h2 className={styles.titleLogin}>Iniciar sesión</h2>
                <form className={styles.formLogin} noValidate onSubmit={handleSubmit}>
                    <label className={styles.labelMail} htmlFor="email">Correo electrónico</label>
                    <input className={styles.inputMail} type="email" placeholder='Ingrese su email' id='email' 
                        name='email' 
                        required
                        onChange={handleChange}
                        onBlur={() => setFieldTouched('email')}
                        value={values.email}
                    />
                    <p className={styles.errorEmail}>{errors.email && touched.email && errors.email}</p>
                    <label className={styles.labelPass} htmlFor="password">Contraseña</label>
                    <input className={styles.inputPass} type="password" placeholder='********' id='password' 
                        name='password'
                        required
                        onChange={handleChange}
                        onBlur={() => setFieldTouched('password')}
                        value={values.password}
                    />
                    <p className={styles.errorPass}>{errors.password && touched.password && errors.password}</p>
                    <button onSubmit={onSubmitLogin} type="submit" className={styles.btnForm} disabled={!isValid}>Ingresar</button>                    
                </form>
                <p className={styles.pLogin}>¿Aún no tienes cuenta?<Link to="/Register"> Registrate</Link></p>
            </div>            
            )}
            </Formik>
        </main>
    )
}

export default Login