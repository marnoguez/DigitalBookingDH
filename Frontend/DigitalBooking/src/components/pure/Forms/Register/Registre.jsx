import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from './/registre.module.css'
import { AuthContext } from '../../../../context/AuthContext';




function Register() {

    //Contexto Global de Auth
    const { registerFunction, userData } = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Nombre demasiado corto')
            .matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'Nombre inválido')
            .max(30, 'Nombre demasiado largo')
            .required('Este campo es Obligatorio'),
        lastName: Yup.string()
            .min(4, 'Apellido demasiado corto')
            .matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'Apellido inválido')
            .max(30, 'Apellido demasiado largo')
            .required('Este campo es Obligatorio'),
        email: Yup.string()
            .email('Formato del email inválido')
            .required('Este campo es Obligatorio'),
        password: Yup.string()
            .required("Este campo es Obligatorio")
            .min(6, "La contraseña tiene que ser mayor a 6 caracteres"),
        confirmPassword: Yup.string()
            .min(6, "La contraseña tiene que ser mayor a 6 caracteres")
            .required('Este campo es Obligatorio')
            .oneOf([Yup.ref("password")], "Ambas contraseñas deben de ser iguales"),
    })

    const onSubmitRegistre = (values) => {
        registerFunction(values.email, values.password, values.name, values.lastName)
    }

    return (
        <main className={styles.container} >
            <Formik
                validationSchema={validationSchema}
                initialValues={{ name: "", lastName: "", email: "", password: "", confirmPassword: "" }}
                onSubmit={(values, { resetForm }
                ) => {
                    onSubmitRegistre(values);
                    resetForm({ values: '' })
                }}>
                {({
                    values,
                    errors,
                    touched,
                    setFieldTouched,
                    handleChange,
                    handleSubmit,
                    isValid,

                }) => (
                    <div>
                        <h2 className={styles.titleRegistre}>Crear cuenta</h2>
                        <form className={styles.formRegistre} noValidate onSubmit={handleSubmit}>                            
                            <div className={styles.containerRegistre3}>
                                <label className={styles.labelRegistre1} htmlFor="name">Nombre</label>
                                <input className={styles.inputRegistre1} type="text" id="name" placeholder="Ingrese su nombre"
                                    name="name"
                                    required
                                    onChange={handleChange('name')}
                                    onBlur={() => setFieldTouched('name')}
                                    value={values.name}
                                />
                                <p className={styles.errorName}>{errors.name && touched.name && errors.name}</p>
                                <label className={styles.labelRegistre2} htmlFor="lastName">Apellido</label>
                                <input className={styles.inputRegistre2} type="text" id="lastName" placeholder="Ingrese su apellido"
                                    name="lastName"
                                    required
                                    onChange={handleChange('lastName')}
                                    onBlur={() => setFieldTouched('lastName')}
                                    value={values.lastName}
                                />
                                <p className={styles.errorLastName}>{errors.lastName && touched.lastName && errors.lastName}</p>
                                <label className={styles.labelRegistre3} htmlFor="email">Correo electrónico</label>
                                <input className={styles.inputRegistre3} type="email" placeholder="Ingrese su correo electrónico" id="email"
                                    name="email"
                                    required
                                    onChange={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                    value={values.email}
                                />
                                <p className={styles.errorEmail}>{errors.email && touched.email && errors.email}</p>
                                                       
                                <label className={styles.labelRegistre4} htmlFor="password">Contraseña</label>
                                <input className={styles.inputRegistre4} type="password" placeholder="Ingrese su contraseña" id="password"
                                    name="password"
                                    required
                                    onChange={handleChange('password')}
                                    onBlur={() => setFieldTouched('password')}
                                    value={values.password}
                                />
                                <p className={styles.errorPass}>{errors.password && touched.password && errors.password}</p>                          
                            
                                <label className={styles.labelRegistre5} htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <input className={styles.inputRegistre5} type="password" placeholder="Repita su contraseña" id="confirmPassword" name="confirmPassword" required
                                    onChange={handleChange('confirmPassword')}
                                    onBlur={() => setFieldTouched('confirmPassword')}
                                    value={values.confirmPassword}
                                />
                                <p className={styles.errorConfirmPass}>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>
                            </div>
                            <button onSubmit={onSubmitRegistre} className={styles.btnRegistre} type="submit" disabled={!isValid}>Registrarse</button>
                        </form>
                        <p className={styles.pRegistre}>¿Ya tienes una cuenta? <Link to="/Login">Iniciar sesión</Link></p>
                    </div>
                )}
            </Formik>
            <br /><br />
        </main>
    )
}

export default Register