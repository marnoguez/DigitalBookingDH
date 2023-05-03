import React, {useContext} from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup'
import styles from ".//formBooking.module.css"

const FormBooking = () => {
    
    const { userData} =  useContext(AuthContext);
    
    const onSubmitBooking = values => {
        bookingFunction(values.ciudad)
    }

    const validationBooking = Yup.object().shape({
        ciudad: Yup.string()
            .min(4, 'Ciudad demasiado corta')
            .matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'Ciudad inválida')
            .max(30, 'Ciudad demasiado larga')
            .required('Este campo es Obligatorio')
    })

    return (
        <div className={styles.container}>
            <Formik 
                validationSchema={validationBooking}
                initialValues={{ciudad: ""}}
                onSubmit={(values) => {
                    onSubmitBooking(values)
                }}
            >
            {({
                values,
                errors,
                touched,
                setFieldTouched,
                handleChange,
                handleSubmit
            }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nombre">Nombre:</label>
                        <input className={styles.inputBooking} type="text" id="nombre" name="nombre" value={userData?.name} disabled />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="apellido">Apellido:</label>
                        <input className={styles.inputBooking} type="text" id="apellido" name="apellido" value={userData?.lastName} disabled />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input className={styles.inputBooking} type="email" id="email" name="email"  value={userData?.email} disabled/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="ciudad">Ciudad:</label>
                        <input className={styles.inputBookingComplete} type="text" id="ciudad" name="ciudad" placeholder="Ingrese su ciudad"
                            required
                            onChange={handleChange('ciudad')}
                            onBlur={() => setFieldTouched('ciudad')}
                            value={values.ciudad}
                        />
                        <p className={styles.errorCiudad}>{errors.ciudad && touched.ciudad && errors.ciudad}</p>
                    </div>
                </form>
                )}
            </Formik>
        </div>
    )
}

export default FormBooking